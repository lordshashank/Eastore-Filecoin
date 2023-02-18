import classes from "../../styles/CompletedDeals.module.css";
import { useState, useEffect } from "react";
const CompletedDeals = ({ data }) => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setJsonData(JSON.parse(data));
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
        {jsonData.length > 0
          ? jsonData.map((data, index) => (
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
                      <p>{data.fileName}</p>
                      <p>{data.root["/"]}</p>
                      <p>{data.pieceCid["/"]}</p>
                      <p>{data.pieceSize}</p>
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
          : null}
        <div className={classes.deals_wraper}>
          <div className={classes.deals}>
            <div className={classes.details}>
              <div>
                <p>Filename:</p>
                <p>Root:</p>
                <p>PieceCID:</p>
                <p>Piece Size:</p>
              </div>
              <div className={classes.values}>
                <p>jfuernfefikfpaennfijdfjr</p>
                <p>helsomuyselfpuspendra</p>
                <p>heloothisisyourdata</p>
                <p>hellothisisyouranotherdad</p>
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
        <div className={classes.deals_wraper}>
          <div className={classes.deals}>
            <div className={classes.details}>
              <div>
                <p>Filename:</p>
                <p>Root:</p>
                <p>PieceCID:</p>
                <p>Piece Size:</p>
              </div>
              <div className={classes.values}>
                <p>jfuernfefikfpaennfijdfjr</p>
                <p>helsomuyselfpuspendra</p>
                <p>heloothisisyourdata</p>
                <p>hellothisisyouranotherdad</p>
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
      </div>
    </div>
  );
};

export default CompletedDeals;
