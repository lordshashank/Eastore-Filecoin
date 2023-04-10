import classes from "../../styles/CompletedDeals.module.css";
import { useState, useEffect } from "react";
const CompletedDeals = ({ data }) => {
  const [jsonData, setJsonData] = useState([]);

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
