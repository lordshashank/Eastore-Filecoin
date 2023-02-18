import Header from "../../components/header/Header";
import classes from "../../styles/Offer.module.css";
import MiddleCard from "../../components/ui/MiddleCard";
import Card from "../../components/ui/Card";
import filters from "../api/filter/filter.json";
import { useState, useEffect } from "react";
import BuyNow from "../../components/buy/BuyNow";
import { contractAddress, abi } from "../../constants";
import { useMoralis, useWeb3Contract } from "react-moralis";

const Offer = () => {
  const [showBuy, setShowBuy] = useState(false);
  const [modalData, setModalData] = useState();
  const [chainId, setChainId] = useState("");
  const [userAccount, setUserAccount] = useState();
  const { Moralis, account, chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  useEffect(() => {
    setChainId(parseInt(chainIdHex));
    setUserAccount(account);
  }, [isWeb3Enabled]);
  useEffect(() => {
    Moralis.onChainChanged((chainIdHex) => {
      setChainId(parseInt(chainIdHex));
    });
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null Account found");
      }
      setUserAccount(account);
    });
  }, []);
  const contract =
    chainId in contractAddress ? contractAddress[chainId][0] : null;
  console.log(contract);
  const openShowBuy = () => {
    setShowBuy(true);
  };
  const hideShowBuy = () => {
    setShowBuy(false);
  };

  const {
    runContractFunction: sendReward,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract,
    functionName: "sendReward",
    params: {
      _to: userAccount,
      rebate: 2,
    },
  });
  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={classes.offer_page}>
        <Header className={classes.changed_header} />
        {showBuy && (
          <BuyNow
            modalData={modalData}
            onClose={hideShowBuy}
            runReward={async () =>
              await sendReward({
                // onComplete:
                // onError:
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              })
            }
            anotherFunction={true}
          />
        )}
        <div className={classes.center_div}>
          <h2>TODAY'S DEAL</h2>
          <h1>Full Sector Bounties</h1>
          <div className={classes.upper_list}>
            {filters.map((data, index) => {
              if (index == "1") {
                return (
                  <MiddleCard
                    key={index}
                    className={classes.middle_card}
                    heading={`${data.MaxPieceSize / (1024 * 1024)} MB`}
                    percent={"0.2 tFil"}
                    text={data.Miner}
                    onOpenBuy={() => {
                      setModalData(data);
                      openShowBuy();
                    }}
                  />
                );
              } else {
                return (
                  <Card
                    key={index}
                    className={classes.card}
                    heading={`${data.MaxPieceSize / (1024 * 1024)} MB`}
                    percent={"0.2 tFil"}
                    text={data.Miner}
                    onOpenBuy={() => {
                      setModalData(data);
                      openShowBuy();
                    }}
                  />
                );
              }
            })}
          </div>
          <div className={classes.lower_list}>
            {filters.map((data, index) => {
              if (index == "1") {
                return (
                  <MiddleCard
                    key={index}
                    className={classes.middle_card}
                    heading={`${data.MaxPieceSize / (1024 * 1024)} MB`}
                    percent={"0.2 tFil"}
                    text={data.Miner}
                    onOpenBuy={() => {
                      setModalData(data);
                      openShowBuy();
                    }}
                  />
                );
              } else {
                return (
                  <Card
                    key={index}
                    className={classes.card}
                    heading={`${data.MaxPieceSize / (1024 * 1024)} MB`}
                    percent={"0.2 tFil"}
                    text={data.Miner}
                    onOpenBuy={() => {
                      setModalData(data);
                      openShowBuy();
                    }}
                  />
                );
              }
            })}
            {filters.map((data, index) => {
              if (index == "0") {
                return (
                  <Card
                    key={index}
                    className={classes.card}
                    heading={`${data.MaxPieceSize / (1024 * 1024)} MB`}
                    percent={"0.2 tFil"}
                    text={data.Miner}
                    onOpenBuy={() => {
                      setModalData(data);
                      openShowBuy();
                    }}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
