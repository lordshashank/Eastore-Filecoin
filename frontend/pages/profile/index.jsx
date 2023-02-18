import Header from "../../components/header/Header";
import classes from "../../styles/Profile.module.css";
import profile from "../../public/profile1.png";
import Image from "next/image";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { useEvmNativeBalance } from "@moralisweb3/next";
import { networkConfig } from "../../helper.config";
import CompletedDeals from "../../components/deals/CompletedDeals";

function Profile({ data }) {
  const filecoinChainId = networkConfig["3141"]["id"];
  const [chainId, setChainId] = useState("5");
  const [userAccount, setUserAccount] = useState();
  const [totalStorage, setTotalStorage] = useState();

  const {
    Moralis,
    isWeb3Enabled,
    chainId: chainIdHex,
    account,
    user,
    deactivateWeb3,
  } = useMoralis();

  useEffect(() => {
    setChainId(parseInt(chainIdHex));
    setUserAccount(account);
  }, [isWeb3Enabled]);

  useEffect(() => {
    const getIds = async () => {
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
    };
    getIds();
  }, []);
  function getPrice(address, chainId) {
    const { data: nativeBalance } = useEvmNativeBalance({
      chain: `0x${chainId.toString(16)}`,
      address: address,
    });
    return nativeBalance?.balance.ether;
  }
  useEffect(() => {
    if (data.length > 0) {
      const jsonData = JSON.parse(data);
      let totalStorage1 = 0;
      jsonData.forEach((deal) => {
        totalStorage1 += deal.pieceSize;
      });
      setTotalStorage(totalStorage1 / 1024);
    }
  }, [data]);

  const accountInfo = (
    <>
      <h4>
        Account: <span className={classes.userAccount}>{userAccount}</span>
      </h4>
      <h4>
        FIL BALANCE:{" "}
        <span>
          {getPrice(userAccount, chainId)}
          {""}
          {chainId &&
            networkConfig[chainId] &&
            networkConfig[chainId]["currency"]}{" "}
        </span>
      </h4>{" "}
    </>
  );
  return (
    <div className={classes.profile_page}>
      <Header className={classes.changed_header} />
      <div className={classes.fullContainer}>
        <div className={classes.name}>
          <div className={classes.profile_image}>
            <Image src={profile} alt="" />
          </div>
          <div className={classes.name_btn}>
            <h1>Bandicoot Valor</h1>
          </div>
          <div className={classes.assets}>
            {account ? accountInfo : <h3>Connect to Wallet to See Details</h3>}
            {totalStorage && (
              <h4>
                TOTAL STORAGE BOUGHT: <span>{totalStorage} KB</span>
              </h4>
            )}
          </div>
        </div>
        <div className={classes.details}>
          <CompletedDeals data={data} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:3001/dynamicData");

    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    return { props: { data: [] } };
    console.log(error);
  }
}

export default Profile;
