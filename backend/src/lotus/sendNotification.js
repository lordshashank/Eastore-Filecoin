import PushAPI from "@pushprotocol/restapi";
import { ethers } from "ethers";
const PK = "154b7eace3e20bad41c3e7c192ce1f548bbdbfa07e3cdeb80efd5084f4945d73"; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

export const sendNotification = async () => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `[SDK-TEST] notification TITLE:`,
        body: `[sdk-test] notification BODY`,
      },
      payload: {
        title: `Deal Status:`,
        body: `Deal Successful`,
        cta: "",
        img: "",
      },
      recipients: `eip155:5:${address}`, // recipient address
      channel: "eip155:5:0x147b09Ae2F40Fed5B8AF2777f99E58cA5eEeBD26", // your channel address
      env: "staging",
    });

    // apiResponse?.status === 204, if sent successfully!
    console.log("API repsonse: ", apiResponse);
    return apiResponse;
  } catch (err) {
    console.error("Error: ", err);
  }
};
