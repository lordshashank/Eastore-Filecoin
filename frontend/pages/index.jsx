import classes from "../styles/Home.module.css";
import Image from "next/image";
import Header from "../components/header/Header";
import home from "../public/home.png";
import homeBottom from "../public/homeBottom.png";
import HomeContent from "../components/home/HomeContent";

const HomePage = () => {
  return (
    <div className={classes.home}>
      <Header />
      <HomeContent />
      <div className={classes.bg}>
        <div className={classes.decoration}>
          <Image className={classes.decoration_image} src={home} alt="" />
        </div>
        <div className={classes.bottomDecoration}>
          <Image className={classes.decoration_image} src={homeBottom} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
