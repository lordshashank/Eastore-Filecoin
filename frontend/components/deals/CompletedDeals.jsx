import classes from "../../styles/CompletedDeals.module.css";
// import { contractAddress } from "../../constants";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useWeb3Contract } from "react-moralis";
import contract from "../../contracts/DealClient.json";
import CID from "cids";
const contractAddress = "0x375227c52b9145ca94216d6f323bdeb3f7e6b7a3";
const CompletedDeals = ({ data }) => {
  const { account: userAccount } = useMoralis();
  const [jsonData, setJsonData] = useState([]);
  const [dealId, setDealID] = useState("");
  const [loadingDeal, setLoadingDeal] = useState(false);
  const [showDeal, setShowDeal] = useState(false);
  const { runContractFunction: pieceDeals } = useWeb3Contract({});
  useEffect(() => {
    console.log(dealId);
  }, [dealId]);
  const dealIDHandler = async (cid) => {
    // cid = new CID(
    //   "baga6ea4seaqcjwtmhku7gbmbqgab3wo74ehsutypdx6wgtm4co7xduf54d2acli"
    // );
    // event.preventDefault();
    // cid = new CID(dealCid);
    // let finalDealId;
    console.log(cid.string);
    const cidBytes = cid.bytes;
    // const cidBytes = cid.bytes;
    // console.log(cidBytes);
    // return;
    console.log(cid);
    setDealID("Waiting for acceptance by SP...");
    // cid = new CID(commP);
    var refresh = setInterval(async () => {
      console.log(cidBytes);
      setLoadingDeal(true);
      if (cid === undefined) {
        setDealID("Error: CID not found");
        clearInterval(refresh);
      }
      console.log("Checking for deal ID...");
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
      console.log(finalDealId);

      if (finalDealId !== undefined && finalDealId !== "0") {
        // If your deal has already been submitted, you can get the deal ID by going to https://hyperspace.filfox.info/en/deal/<dealID>
        // The link will show up in the frontend: once a deal has been submitted, its deal ID stays constant. It will always have the same deal ID.
        setDealID("https://hyperspace.filfox.info/en/deal/" + finalDealId);
        setShowDeal(true);
        if (userAccount && finalDealId) {
          try {
            const response = await fetch(
              "http://localhost:3001/update-dealId",
              {
                method: "POST",
                // mode: "no-cors",
                body: JSON.stringify({
                  owner: userAccount,
                  pieceCid: dealCid.string,
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
        clearInterval(refresh);
      }
    }, 5000);
  };

  useEffect(() => {
    if (data.length > 0) {
      setJsonData(JSON.parse(data));
    } else {
      setJsonData([]);
    }
  }, [data]);
  const handleDownload = async (data) => {
    const sendingData = {
      root: data.root,
      pieceCid: data.pieceCid,
      pieceSize: data.pieceSize,
      miner: data.miner,
    };
    try {
      const pieceData = data;
      const response = await fetch("http://localhost:3001/retrieveDeal", {
        method: "POST",
        body: JSON.stringify(pieceData),
        headers: {
          "Content-Type": "application/json",
        },
      });
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
  return (
    <div className={classes.deals_data}>
      <h2>COMPLETED DEALS</h2>
      <div className={classes.all_deals}>
        {jsonData.length > 0 ? (
          jsonData.map((data, index) => (
            <div className={classes.deals_wraper}>
              <div key={index} className={classes.deals}>
                <div className={classes.details}>
                  <div>
                    <p>Filename:</p>
                    <p>Root:</p>
                    <p>PieceCID:</p>
                    <p>Piece Size:</p>
                  </div>
                  <div className={classes.values}>
                    <p>{jsonData[index].fileName}</p>
                    <p>{jsonData[index].cid}</p>
                    <p>{jsonData[index].pieceCid}</p>
                    <p>{jsonData[index].pieceSize}</p>
                  </div>
                </div>
                <button
                  className={classes.button}
                  onClick={() => {
                    handleDownload(data);
                  }}
                >
                  Download
                </button>
                <button
                  className={classes.button}
                  onClick={() => {
                    console.log(jsonData[index].pieceCid);
                    const cid = new CID(jsonData[index].pieceCid);
                    dealIDHandler(cid);
                  }}
                  style={{ marginLeft: "1rem" }}
                >
                  {!loadingDeal ? (
                    <span>Get Deal Id</span>
                  ) : (
                    <div className="spinner"></div>
                  )}
                </button>
                {dealId && (
                  <a
                    style={{ display: "block", marginTop: "1rem" }}
                    href={dealId}
                    target="_blank"
                  >
                    See your deal
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <h3>No Deals</h3>
        )}
      </div>
    </div>
  );
};

export default CompletedDeals;
