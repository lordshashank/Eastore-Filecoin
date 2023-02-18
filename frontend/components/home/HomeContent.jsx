import classes from "../../styles/Home.module.css";
import ManualHeader from "../header/ManualHeader";
const HomeContent = () => {
  return (
    <div className={classes["home-content"]}>
      <div className={classes.content}>
        <h1 className={classes.heading}>StorEasy</h1>
        <p>
          A decentralized storage marketplace and full-sector bounty rewarder
          built over Filecoin Virtual Machine. Bringing simplified data storage
          and retrieval at your fingertips. Now you can easily choose deals
          accustomed to your preference from wide-range of Storage Providers
          available on filecoin marketplace.
        </p>
        <ManualHeader buttonClassName={"button"} />
      </div>
    </div>
  );
};

export default HomeContent;
