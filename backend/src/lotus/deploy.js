import dotenv from "dotenv";
dotenv.config();
import lighthouse from "@lighthouse-web3/sdk";
const LIGHTHOUSE_API_KEY = process.env.LIGHTHOUSE_API_KEY;
export const deploy = async (path) => {
  const apiKey = LIGHTHOUSE_API_KEY; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)
  const response = await lighthouse.upload(path, apiKey);
  console.log(response);
  console.log(
    "Visit at: https://gateway.lighthouse.storage/ipfs/" + response.data.Hash
  );
  return "https://gateway.lighthouse.storage/ipfs/" + response.data.Hash;
};
