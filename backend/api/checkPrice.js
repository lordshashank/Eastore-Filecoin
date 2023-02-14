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
async function main(filename) {
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
    return await checkPrice(filename);

    //   await sign();
    // await minerListEx();
    // await minerInfo();
  } finally {
    client.destroy();
  }
}
async function checkPrice(fileName) {
  const fileCid = await client.clientImport({
    Path: `/home/lordforever/blockchain/kuch-bhi/web3.1/uploads/${fileName}`,
    IsCAR: false,
  });
  console.log("CID=", fileCid);
  console.log("CID=", fileCid);
  const getCarFile = await client.clientGenCar(
    {
      Path: `/home/lordforever/blockchain/kuch-bhi/web3.1/uploads/${fileName}`,
      IsCAR: false,
    },
    `/home/lordforever/blockchain/kuch-bhi/web3.1/uploadsCar/${fileName}.car`
  );
  // console.log("PiceCID=", getCarFile);
  const getCommP = await client.clientCalcCommP(
    `/home/lordforever/blockchain/kuch-bhi/web3.1/uploadsCar/${fileName}.car`
  );
  const pieceCid = getCommP.Root;
  console.log("PiceCID=", pieceCid);
  const pieceSize = getCommP.Size;

  return pieceSize;
}

const router = express.Router();

router.post("/check-price", async (req, res, next) => {
  //   const data = req;
  // console.log(req);
  console.log(req.body);
  //   const result = await main();
  //   console.log(result);
  const result = await main(req.body);
  const jsonResult = JSON.stringify(result);
  return res.json(jsonResult);
  // return res.json("done");
  //   main().then((result) => {
  //     console.log(result);
  //     res.json(result);
  //   });
});

module.exports = router;

// // import express from "express";
// // import { LotusRPC } from "@filecoin-shipyard/lotus-client-rpc";
// // import { mainnet } from "@filecoin-shipyard/lotus-client-schema";
// // import { NodejsProvider } from "@filecoin-shipyard/lotus-client-provider-nodejs";
// const express = require("express");
// const { LotusRPC } = require("@filecoin-shipyard/lotus-client-rpc");
// const { mainnet } = require("@filecoin-shipyard/lotus-client-schema");
// const {
//   NodejsProvider,
// } = require("@filecoin-shipyard/lotus-client-provider-nodejs");
// // import { mainnet } from "https://unpkg.com/@filecoin-shipyard/lotus-client-schema?module";
// // import { BrowserProvider } from "https://unpkg.com/@filecoin-shipyard/lotus-client-provider-browser?module";
// // import { LotusRPC } from "https://unpkg.com/@filecoin-shipyard/lotus-client-rpc?module";
// const endpointUrl = "http://127.0.0.1:1234/rpc/v0";
// // const endpointUrl = "wss://lotus.testground.ipfs.team/api/0/node/rpc/v0";
// const provider = new NodejsProvider(endpointUrl, {
//   token:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.hCv2GfO_kHoLLB2CjNgcBJ0HQUCSSqU81Cj-qC1U79k",
// });

// // const provider = new NodejsProvider(endpointUrl);
// // const provider = new BrowserProvider(endpointUrl, {
// //   token:
// //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.hCv2GfO_kHoLLB2CjNgcBJ0HQUCSSqU81Cj-qC1U79k",
// // });
// const client = new LotusRPC(provider, { schema: mainnet.fullNode });
// async function main() {
//   //   client = new LotusRPC(provider, { schema: mainnet.fullNode });
//   try {
//     /* REPLACE NEXT LINE WITH EXAMPLE FUNCTION CALL */
//     // await chainHeadEx();
//     // await minerListEx();
//     // await test();
//     // await getFileCID();
//     // await authNew();
//     // await getPieceCid();
//     console.log("running");
//     return await makeDeal();

//     //   await sign();
//     // await minerListEx();
//     // await minerInfo();
//   } finally {
//     client.destroy();
//   }
// }
// async function makeDeal() {
//   console.log("running make deal functiion");
//   const DataRef1 = {
//     TransferType: "abcd",
//     Root: { "/": "bafkqab33nbswqzl5bi" },
//     PieceCid: {
//       "/": "baga6ea4seaqi5koaue7o5chp3rrcdigeurb6gwn3ru7cpon2w7jwcdzacxomyoq",
//     },
//     PieceSize: 254,
//   };
//   const startDealParams = {
//     Data: DataRef1,
//     Wallet: "f1mpkhu2732mmxvyk2pzbq6sivg4mj3athgh2gm5y",
//     Miner: "f01129",
//     EpochPrice: "0",
//     MinBlocksDuration: 1,
//     ProviderCollateral: "0",
//     DealStartEpoch: -1,
//     FastRetrieval: false,
//     VerifiedDeal: false,
//   };
//   const head = await client.clientStartDeal(startDealParams);
//   console.log(head);
//   return JSON.stringify(head);
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
