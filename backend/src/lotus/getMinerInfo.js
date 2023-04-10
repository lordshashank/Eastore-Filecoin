import { client } from "./lotus";

export const getMinerInfo = async () => {
  const head = await client.chainHead();
  const miners = await client.stateListMiners(head.Cids);
  let returnData = [];
  console.log(miners.length);
  miners.forEach(async (miner, index) => {
    const newMiner = miner.replace("f", "t");
    const minInfo = await client.stateMinerInfo(newMiner, head.Cids);
    //const minerInfo = await minersWithTimeout(minInfo.PeerId, newMiner);
    console.log(minInfo);
    returnData.push(minInfo);
    fs.appendFileSync("./minInfo.json", JSON.stringify(returnData));
    console.log(index);
  });

  return returnData;
};
