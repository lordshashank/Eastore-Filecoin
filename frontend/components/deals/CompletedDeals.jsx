import classes from "../../styles/CompletedDeals.module.css";
import { useState, useEffect } from "react";
import DealItem from "./DealItem";

const CompletedDeals = ({ data }) => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setJsonData(JSON.parse(data));
    } else {
      setJsonData([]);
    }
  }, [data]);

  return (
    <div className={classes.deals_data}>
      <h2>COMPLETED DEALS</h2>
      <div className={classes.all_deals}>
        {jsonData.length > 0 ? (
          jsonData.map((data, index) => <DealItem deal={data} />)
        ) : (
          <h3>No Deals</h3>
        )}
      </div>
    </div>
  );
};

export default CompletedDeals;
