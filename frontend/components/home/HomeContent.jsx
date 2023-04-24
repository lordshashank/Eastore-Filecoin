import { useState } from "react";
import classes from "../../styles/Home.module.css";
import styles from "../../styles/ManualHeader.module.css";
import ManualHeader from "../header/ManualHeader";
import UploadFile from "../buy/UploadFile";
const HomeContent = () => {
  const [showCart, setShowCart] = useState(false);
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
          A decentralized storage marketplace and full-sector bounty rewarder
          built over Filecoin Virtual Machine. Bringing simplified data storage
          and retrieval at your fingertips. Now you can easily choose deals
          accustomed to your preference from wide-range of Storage Providers
          available on filecoin marketplace.
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <ManualHeader buttonClassName={"button"} />
          <button
            className={styles.button}
            onClick={() => setShowCart(!showCart)}
          >
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
