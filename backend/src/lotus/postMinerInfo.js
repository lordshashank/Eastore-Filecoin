import { client } from "./lotus";

export const postMinerInfo = async () => {
  const head = await client.chainHead();
  const miners = await client.stateListMiners(head.Cids);
  console.log(miners.length);
  miners.forEach(async (miner, index) => {
    const newMiner = miner.replace("f", "t");
    const minInfo = await client.stateMinerInfo(newMiner, head.Cids);
    function minersWithTimeout(id, miners) {
      return new Promise(async function (resolve, reject) {
        client.clientQueryAsk(id, miners).then(resolve, reject);
        setTimeout(reject, 1000);
      });
    }
    console.log(newMiner);
    const minerInfo = await minersWithTimeout(minInfo.PeerId, newMiner);
    console.log(minerInfo);
  });
};
