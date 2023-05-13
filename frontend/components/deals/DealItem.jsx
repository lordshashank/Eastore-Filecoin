import classes from "../../styles/CompletedDeals.module.css";
import { useMoralis } from "react-moralis";
import { use, useState, useEffect } from "react";
import contract from "../../contracts/DealClient.json";
import { useWeb3Contract } from "react-moralis";
import CID from "cids";

import { AiFillFilePdf, AiFillFileExclamation } from "react-icons/ai";
import { FcFolder, FcImageFile } from "react-icons/fc";

const fileIcon = {
  png: FcImageFile,
  pdf: AiFillFilePdf,
  folder: FcFolder,
  jpg: FcImageFile,
  jpeg: FcImageFile,
  default: AiFillFileExclamation,
};

const contractAddress = "0x375227c52b9145ca94216d6f323bdeb3f7e6b7a3";
const DealItem = ({ deal }) => {
  const { account: userAccount } = useMoralis();
  const [loadingDeal, setLoadingDeal] = useState(false);
  const [showStatus, setShowStatus] = useState(null);

  const { runContractFunction: pieceDeals } = useWeb3Contract({});
  const [dealId, setDealID] = useState("");
  const startDate = new Date(deal.startDate);
  const endDate = new Date(deal.endDate);
  const today = new Date();
  const oneMonthBeforeEnd = new Date(endDate.getTime());
  oneMonthBeforeEnd.setMonth(endDate.getMonth() - 1);
  let status;
  if (startDate > today) {
    status = "upcoming";
  } else if (today >= startDate && today <= endDate) {
    status = "active";
  } else if (today > oneMonthBeforeEnd && today <= endDate) {
    status = "expiring soon";
  } else if (today > endDate) {
    status = "expired";
  }
  const fileType = deal.mimeType.split("/")[1];
  const FileIcon = fileIcon[fileType] || fileIcon["default"];
  const handleDownload = async (data) => {
    const sendingData = {
      root: data.root,
      pieceCid: data.pieceCid,
      pieceSize: data.pieceSize,
      miner: data.miner,
    };
    try {
      const pieceData = data;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/retrieveDeal`,
        {
          method: "POST",
          body: JSON.stringify(pieceData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", data.fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };
  const dealIDHandler = async (cid) => {
    setLoadingDeal(true);
    // cid = new CID(
    //   "baga6ea4seaqcjwtmhku7gbmbqgab3wo74ehsutypdx6wgtm4co7xduf54d2acli"
    // );
    // event.preventDefault();
    // cid = new CID(dealCid);
    // let finalDealId;
    // console.log(cid.string);
    const cidBytes = cid.bytes;
    // const cidBytes = cid.bytes;
    // console.log(cidBytes);
    // return;
    // console.log(cid);
    // setDealID("Waiting for acceptance by SP...");
    // cid = new CID(commP);
    // var refresh = setInterval(async () => {
    // console.log(cidBytes);
    if (cid === undefined) {
      // setDealID("Error: CID not found");
      setShowStatus("Error: CID not found");
      // clearInterval(refresh);
      return;
    }
    // console.log("Checking for deal ID...");
    // const dealID = await dealClient.pieceDeals(cid.bytes);
    const parameters = {
      abi: contract.abi,
      contractAddress: contractAddress,
      functionName: "pieceDeals",
      params: { "": cidBytes },
    };
    const result = await pieceDeals({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    setLoadingDeal(false);
    const finalDealId = Number(result._hex);
    // const finalDealId = 0;
    console.log(finalDealId);
    if (finalDealId == undefined || finalDealId == "0") {
      //to be removed afterwards
      setDealID("Waiting for acceptance by SP...");
      setShowStatus("Waiting for acceptance by SP...");
      return;
    }

    if (finalDealId !== undefined && finalDealId !== "0") {
      // If your deal has already been submitted, you can get the deal ID by going to https://hyperspace.filfox.info/en/deal/<dealID>
      // The link will show up in the frontend: once a deal has been submitted, its deal ID stays constant. It will always have the same deal ID.
      setShowStatus("Deal ID found!");
      setDealID("https://hyperspace.filfox.info/en/deal/" + finalDealId);
      if (userAccount && finalDealId) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/update-dealId`,
            {
              method: "POST",
              // mode: "no-cors",
              body: JSON.stringify({
                owner: userAccount,
                pieceCid: cid.string,
                dealId: finalDealId,
              }),
              headers: {
                "Content-Type": "application/json",
                // Accept: "application/json",
              },
            }
          );
          const resData = await response.json();
          console.log(resData);
          return resData;
        } catch (error) {
          console.log(error);
        }
      }
      // clearInterval(refresh);
    }
    setLoadingDeal(false);
    // }, 5000);
  };
  useEffect(() => {
    if (showStatus !== null) {
      setTimeout(() => {
        setShowStatus(null);
      }, 5000);
    } else {
      return;
    }
  }, [showStatus]);
  return (
    <div className={classes.deals_wraper}>
      <div className={classes.deals}>
        {/* {showStatus && (
          <p
            className={classes.upload_msg}
            style={
              showStatus == "Deal ID found!"
                ? { color: "green" }
                : showStatus == "Waiting for acceptance by SP..."
                ? { color: "#A9A808" }
                : { color: "red" }
            }
          >
            {showStatus}
          </p>
        )} */}
        <div className={classes.details}>
          <div>
            <p>Filename:</p>
            <p>Status:</p>
            <p>File Type:</p>
            <p>Start Date:</p>
            <p>Size:</p>
          </div>
          <div className={classes.values}>
            <p>{deal.fileName}</p>
            <p
              style={
                status == "active"
                  ? { color: "green" }
                  : status == "upcoming"
                  ? { color: "#A9A808" }
                  : { color: "red" }
              }
            >
              <b>{status}</b>
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FileIcon color={"red"}></FileIcon>
              {fileType}
            </p>
            <p>{deal.startDate}</p>
            <p>{deal.pieceSize / 1024} KB</p>
          </div>
        </div>
        {/* <button
          className={classes.button}
          onClick={() => {
            handleDownload(deal);
          }}
        >
          Download
        </button> */}
        <button
          className={classes.button}
          onClick={() => {
            // console.log(deal.pieceCid);
            const cid = new CID(deal.pieceCid);
            dealIDHandler(cid);
          }}
          style={{ marginLeft: "1rem" }}
        >
          {!loadingDeal ? (
            <span>View Deal</span>
          ) : (
            <div className="spinner"></div>
          )}
        </button>
        {dealId && !loadingDeal && (
          <a
            style={{ display: "block", marginTop: "1rem" }}
            // href={dealId}
            href="https://hyperspace.filfox.info/en/deal"
            target="_blank"
          >
            View deal
          </a>
        )}
      </div>
    </div>
  );
};

export default DealItem;
