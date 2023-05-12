import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import Head from "next/head";
import logo from "../public/profile.png";
import Loader from "../components/ui/Loader";

const MyApp = ({ Component, pageProps }) => {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <Head>
          <title>StoreEasy</title>
          <link rel="icon" type="image/png" src={logo} />
        </Head>
        <Loader />
        <Component {...pageProps} />
      </NotificationProvider>
    </MoralisProvider>
  );
};

export default MyApp;
