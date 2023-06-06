import { useState } from "react";
import classes from "../../styles/Home.module.css";
import styles from "../../styles/ManualHeader.module.css";
import ManualHeader from "../header/ManualHeader";
import UploadFile from "../buy/UploadFile";
import { useMoralis } from "react-moralis";
const HomeContent = () => {
  const [showCart, setShowCart] = useState(false);
  const { account: userAccount } = useMoralis();
  return (
    <div className={classes["home-content"]}>
      {showCart && (
        <UploadFile
          onClose={() => setShowCart(false)}
          anotherFunction={false}
        />
      )}
      <div className={classes.content}>
        <h1 className={classes.heading}>Eastore</h1>
        <p>
          Eastore is a decentralized solution on Filecoin that stores your files
          directly to the Filecoin network using smart contracts completely
          on-chain. This is a nominal version of Eastore in hyperspace testnet.
          you can try it out by uploading a file by clicking on button below.
          <br />
          <br />
          Add calibration net to you metamask{" "}
          <a
            href="https://chainlist.org/?search=calibration&testnets=true"
            target="_blank"
          >
            here
          </a>
          <br /> Want some fil tokens?{" "}
          <a
            href="https://faucet.calibration.fildev.network/funds.html"
            target="_blank"
          >
            Click here
          </a>{" "}
          to get some.
          <br />
          <br />
          <span className={classes["highlight-text"]}>
            {" "}
            Note: This is a testnet version of the app. Please don't upload any
            important and private files here.{" "}
          </span>
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <ManualHeader buttonClassName={"button"} />
          <button
            className={styles.button}
            onClick={() => setShowCart(!showCart)}
            disabled={!userAccount}
          >
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
