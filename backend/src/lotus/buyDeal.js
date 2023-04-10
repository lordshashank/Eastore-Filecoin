import { checkPrice } from "./checkPriceForBuy";

export const buyDeal = async (fileNameMiner) => {
  console.log("running");
  console.log(fileNameMiner);
  const fileName = fileNameMiner.filesName;
  console.log(fileName);
  let pieceData = await checkPrice(fileName);
  pieceData.miner = fileNameMiner.miner;
  console.log(pieceData);
  return pieceData;
};
