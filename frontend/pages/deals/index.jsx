import Header from "../../components/header/Header";
import classes from "../../styles/Filter.module.css";
import { FaFilter, FaCartPlus } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import filter from "../api/filter/filter.json";
import { useState } from "react";
import BuyNow from "../../components/buy/BuyNow";
const Deals = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [modalData, setModalData] = useState();
  const [showCart, setShowCart] = useState(false);
  const [filteredData, setFilteredData] = useState(filter);
  const [activeFilter, setActiveFilter] = useState({ filter: "none" });
  const FilterHandler = (filterParameter) => {
    const filtered = filter.sort(
      (a, b) => b[filterParameter] - a[filterParameter]
    );
    setFilteredData([...filtered]);
    setActiveFilter({
      filter: filterParameter,
    });
  };

  const handleClick = async () => {
    // try {
    //   const response = await fetch("http://localhost:3001/run-node-function");
    //   console.log(response);
    //   const result = await response.json();
    //   console.log(result);
    // } catch (error) {
    //   console.error(error);
    // }
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <>
      <div className={classes.filter_page}>
        {showCart && (
          <BuyNow
            onClose={hideCartHandler}
            modalData={modalData}
            anotherFunction={false}
          />
        )}
        <div className={classes.filter_header}>
          <Header />
          <div
            className={`${classes.filter} ${showFilters && classes.show_after}`}
          >
            <div className={classes.button_wraper}>
              <button className={classes.filter_button}>Sort by:</button>
            </div>
            <ul className={classes.filters_list}>
              <li
                className={`${classes.button_wraper} ${
                  activeFilter.filter == "Price" && classes.active
                }`}
              >
                <button
                  className={classes.filter_button}
                  onClick={() => FilterHandler("Price")}
                >
                  <span>{activeFilter.filter == "Price" && <MdDone />}</span>
                  COST
                </button>
              </li>
              <li
                className={`${classes.button_wraper} ${
                  activeFilter.filter == "MaxPieceSize" && classes.active
                }`}
              >
                <button
                  className={classes.filter_button}
                  onClick={() => FilterHandler("MaxPieceSize")}
                >
                  <span>
                    {activeFilter.filter == "MaxPieceSize" && <MdDone />}
                  </span>
                  SIZE
                </button>
              </li>
              <li
                className={`${classes.button_wraper} ${
                  activeFilter.filter == "Expiry" && classes.active
                }`}
              >
                <button
                  className={classes.filter_button}
                  onClick={() => FilterHandler("Expiry")}
                >
                  <span>{activeFilter.filter == "Expiry" && <MdDone />}</span>
                  TIME
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.table}>
          <div className={classes.row}>
            <div>Miner</div>
            <div>Max Storage(MB)</div>
            <div>Expiry</div>
            <div>Price</div>
            <div>
              <FaCartPlus className={classes.cart_icon} />
            </div>
          </div>
          {filteredData.map((arr, index) => (
            <div className={classes.row} key={index + 1}>
              <div>{arr.Miner}</div>
              <div>{arr.MaxPieceSize / (1024 * 1024)}</div>
              <div>{arr.Expiry}</div>
              <div>{arr.Price}</div>
              <div>
                <button
                  id="myButton"
                  className={classes.buy_btn}
                  onClick={() => {
                    setShowCart(true);
                    setModalData(arr);
                    handleClick();
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Deals;
