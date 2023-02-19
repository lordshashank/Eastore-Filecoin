import Modal from "../ui/Modal";
import classes from "../../styles/BuyNow.module.css";
import { useRef, useEffect, useState } from "react";
import ManualHeader from "../header/ManualHeader";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdCloudUpload } from "react-icons/io";
import useWeb3 from "./useWeb3";
const BuyNow = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const modalData = props.modalData;
  const fileInput = useRef();
  const [isUploaded, setIsUploaded] = useState(false);
  const [drag, setDrag] = useState(false);
  const [files, setFiles] = useState([]);
  const { chainId, userAccount, Moralis } = useWeb3();

  const Transfer = async () => {
    const options = {
      type: "native",
      amount: Moralis.Units.ETH("0.0"),
      receiver: "0x9299eac94952235Ae86b94122D2f7c77F7F6Ad30",
    };
    let result = await Moralis.transfer(options);
  };
  function onDrag(e) {
    e.preventDefault();
    setDrag(true);
  }

  function onLeave(e) {
    e.preventDefault();
    setDrag(false);
  }

  function dropFiles(e) {
    e.preventDefault();

    setDrag(false);

    let i;

    for (const file of e.dataTransfer.files) {
      for (i = 0; i < files.length; i++) {
        if (file.name === files[i].name) break;
      }

      if (i === files.length) setFiles((files) => files.concat(file));
    }
  }
  function addFiles() {
    let i;

    for (const file of fileInput.current.files) {
      for (i = 0; i < files.length; i++) {
        if (file.name === files[i].name) break;
      }
      if (i === files.length) setFiles((files) => files.concat(file));
    }
  }
  function removeFile(e) {
    setFiles((files) => {
      files.splice(e.target.getAttribute("data-key"), 1);

      return [...files];
    });
  }
  const handleSubmit = async () => {
    try {
      await Transfer();
    } catch (error) {
      console.log(error);
    }
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });
      const resData = await response.json();
      console.log(resData);
      if (response.status == 200) {
        setIsUploaded(true);
        setFiles([]);
      } else {
        setIsUploaded(false);
      }
    } catch (error) {
      console.error(error);
    }
    try {
      let filesName = [];
      for (let i = 0; i < files.length; i++) {
        filesName.push(files[i].name);
      }
      const response = await fetch("http://localhost:3001/buyDeal", {
        method: "POST",
        body: JSON.stringify({ filesName: filesName, miner: modalData.Miner }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await response.json();
      console.log(resData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isUploaded) {
      setTimeout(() => {
        setIsUploaded(false);
      }, 5000);
    } else {
      return;
    }
  }, [isUploaded]);
  const onHandleClickPrice = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });
      const resData = await response.json();
      console.log(resData);
      if (response.status == 200) {
        setIsUploaded(true);
        setFiles([]);
      } else {
        setIsUploaded(false);
      }
    } catch (error) {
      console.error(error);
    }
    try {
      let filesName = [];
      for (let i = 0; i < files.length; i++) {
        filesName.push(files[i].name);
      }
      const response = await fetch("http://localhost:3001/check-price", {
        method: "POST",
        body: JSON.stringify(filesName),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await response.json();
      console.log(resData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <ManualHeader className={classes.manual_header} />
      <div className={classes.content}>
        <div className={classes.heading}>
          {isUploaded && (
            <p className={classes.upload_msg} style={{ color: "green" }}>
              Files Uploaded Successfully!
            </p>
          )}
          <div className={classes.title}>
            <h1>MAKE DEALS</h1>
            <AiOutlineClose
              onClick={props.onClose}
              className={classes["heading-close"]}
            />
          </div>
        </div>
        <div className={classes.details}>
          <div className={classes.form}>
            <div className={classes["left-box"]}>
              <div className={classes.miner_details}>
                <h6>
                  MINER NAME: <span>{modalData.Miner}</span>
                </h6>
                <h6>
                  PEER ID: <span>{modalData.PeerId}</span>
                </h6>
                <h6>
                  SECTOR SIZE: <span>{modalData.SectorSize}</span>
                </h6>
                <h6>
                  MAX STORAGE: <span>{modalData.MaxPieceSize}</span>
                </h6>
                <h6>
                  PRICE: <span>{modalData.Price}</span>
                </h6>
              </div>
              <button
                className={classes["check-price-button"]}
                onClick={onHandleClickPrice}
              >
                CHECK PRICE
              </button>
            </div>
            <div
              className={classes.input_field}
              onDrop={dropFiles}
              onDragOver={onDrag}
              onDragLeave={onLeave}
            >
              <div className={classes.input}>
                {files.length > 0 && (
                  <ul>
                    {files.map((file, index) => (
                      <li className={classes.files} key={index}>
                        <a
                          href={URL.createObjectURL(file)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {file.name}
                        </a>
                        <button
                          key={index}
                          data-key={index}
                          className={classes.close}
                          onClick={removeFile}
                        ></button>
                      </li>
                    ))}
                  </ul>
                )}
                <IoMdCloudUpload className={classes["upload-logo"]} />
                <p>UPLOAD FILE</p>
                <p>OR</p>
                <div className={classes["file-input-container"]}>
                  <input
                    ref={fileInput}
                    type="file"
                    className={classes["file-input"]}
                    id="file-input"
                    multiple
                    onChange={addFiles}
                  />
                  <label
                    htmlFor="file-input"
                    className={classes["file-input-label"]}
                  >
                    Browse Files
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className={classes["buy-button-box"]}>
            <button
              className={classes["buy-button"]}
              onClick={async (e) => {
                if (isLoading) return;
                e.preventDefault();
                setIsLoading(true);
                await handleSubmit();
                if (props.anotherFunction == true) {
                  try {
                    await props.runReward();
                  } catch (error) {
                    console.log(error);
                  }
                }
                setIsLoading(false);
              }}
            >
              {!isLoading ? (
                <span>BUY NOW</span>
              ) : (
                <div className="spinner"></div>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BuyNow;
