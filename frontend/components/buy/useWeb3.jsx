import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

const useWeb3 = () => {
  const {
    enableWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    account,
    Moralis,
    authenticate,
    deactivateWeb3,
    user,
    isAuthenticated,
  } = useMoralis();
  const [chainId, setChainId] = useState();
  const [userAccount, setUserAccount] = useState();
  useEffect(() => {
    setUserAccount(account);
    console.log(account);
  }, [account]);
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
      });
    };

    getIds();
  }, []);
  return { chainId, userAccount, Moralis, isWeb3Enabled };
};

export default useWeb3;
