import classes from "../../styles/Card.module.css";

const Card = (props) => {
  const { heading, percent, text } = props;
  return (
    <div className={`${classes.card} ${props.className}`}>
      <div className={classes.box}>
        <div className={classes["box-inner"]}>
          <div className={classes.size}>
            <h3>{heading}</h3>
            <h1>{percent}</h1>
            <p>{text}</p>
          </div>
          <div className={classes["box-front"]}>
            <h3>{heading}</h3>
            <h1>{percent}</h1>
          </div>
          <div className={classes["box-back"]}>
            <p>{text}</p>
            <button className={classes.buy_button} onClick={props.onOpenBuy}>
              Buy Full Sector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
