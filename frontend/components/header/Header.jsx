import Link from "next/link";
import logo from "../../public/logo.png";
import styles from "../../styles/Header.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import ManualHeader from "./ManualHeader";

const Header = (props) => {
  const router = useRouter();
  const activeClassName = function (path) {
    return `${styles.link} ${router.pathname == path && styles.active}`;
  };
  return (
    <header className={`${styles.header} ${props.className}`}>
      <Link href="/" className={styles.logo}>
        <Image className={styles["logo-image"]} src={logo} alt="Logo" />
      </Link>
      <nav className={styles.links}>
        <Link href="/" className={activeClassName("/")}>
          Home
        </Link>
        {/* <Link href="/deals" className={activeClassName("/deals")}>
          Deals
        </Link> */}
        {/* <Link href="/offer" className={activeClassName("/offer")}>
          Offer
        </Link> */}
        <Link href="/profile" className={activeClassName("/profile")}>
          Profile
        </Link>
      </nav>
      <div>
        <ManualHeader buttonClassName={"button"} />
      </div>
    </header>
  );
};

export default Header;
