// import express from "express";
// import { LotusRPC } from "@filecoin-shipyard/lotus-client-rpc";
// import { mainnet } from "@filecoin-shipyard/lotus-client-schema";
// import { NodejsProvider } from "@filecoin-shipyard/lotus-client-provider-nodejs";
const express = require("express");
const { LotusRPC } = require("@filecoin-shipyard/lotus-client-rpc");
const { mainnet } = require("@filecoin-shipyard/lotus-client-schema");
const {
  NodejsProvider,
} = require("@filecoin-shipyard/lotus-client-provider-nodejs");
// import { mainnet } from "https://unpkg.com/@filecoin-shipyard/lotus-client-schema?module";
// import { BrowserProvider } from "https://unpkg.com/@filecoin-shipyard/lotus-client-provider-browser?module";
// import { LotusRPC } from "https://unpkg.com/@filecoin-shipyard/lotus-client-rpc?module";
const endpointUrl = "http://127.0.0.1:1234/rpc/v0";
// const endpointUrl = "wss://lotus.testground.ipfs.team/api/0/node/rpc/v0";
const provider = new NodejsProvider(endpointUrl, {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.hCv2GfO_kHoLLB2CjNgcBJ0HQUCSSqU81Cj-qC1U79k",
});

// const provider = new NodejsProvider(endpointUrl);
// const provider = new BrowserProvider(endpointUrl, {
//   token:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.hCv2GfO_kHoLLB2CjNgcBJ0HQUCSSqU81Cj-qC1U79k",
// });
const client = new LotusRPC(provider, { schema: mainnet.fullNode });
async function main() {
  //   client = new LotusRPC(provider, { schema: mainnet.fullNode });
  try {
    /* REPLACE NEXT LINE WITH EXAMPLE FUNCTION CALL */
    // await chainHeadEx();
    // await minerListEx();
    // await test();
    // await getFileCID();
    // await authNew();
    // await getPieceCid();
    console.log("running");
    return await minerInfo();

    //   await sign();
    // await minerListEx();
    // await minerInfo();
  } finally {
    client.destroy();
  }
}
async function minerInfo() {
  // eslint-disable-line no-unused-vars

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
}
// minerList.forEach(async (miner, index) => {
//   const newMiner = miner.replace("f", "t");
//   const minInfo = await client.stateMinerInfo(newMiner, head.Cids);
//   // console.log(index);
//   // console.log(miner);
//   totalMinerInfo.push(minInfo);

//   // const minerInfo = await client.clientQueryAsk(minInfo.PeerId, newMiner);
//   // totalMinerInfo.push(minerInfo);
//   if (index == miners.length - 1) {
//     // writeFileSync(
//     //   "../web2/nextjs_moralis_auth/pages/api/lotus/minerInfo.json",
//     //   JSON.stringify(totalMinerInfo)
//     // );
//     writeFileSync(
//       "../web2/nextjs_moralis_auth/pages/api/lotus/minerLog.json",
//       JSON.stringify(totalMinerLog)
//     );
//   }
// });
// }
// const router = express.Router();

// router.get("/run-node-function", async (req, res) => {
//   const result = await main();
//   console.log(result);
//   res.json(result);
//   //   main().then((result) => {
//   //     console.log(result);
//   //     res.json(result);
//   //   });
// });

// module.exports = router;
const router = express.Router();

router.post("/miner-info", async (req, res, next) => {
  //   const data = req;
  // console.log(req);
  console.log(req.body);
  //   const result = await main();
  //   console.log(result);
  const result = await main();
  const jsonResult = JSON.stringify(result);
  return res.json(jsonResult);
  // return res.json("done");
  //   main().then((result) => {
  //     console.log(result);
  //     res.json(result);
  //   });
});

module.exports = router;
