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
require("dotenv").config();
const endpointUrl = "http://127.0.0.1:1234/rpc/v0";
const LOTUS_TOKEN = process.env.LOTUS_TOKEN;
const provider = new NodejsProvider(endpointUrl, {
  token: LOTUS_TOKEN,
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
    Path: `/${__dirname}/../uploads/${fileName}`,
    IsCAR: false,
  });
  console.log("CID=", fileCid);
  // console.log("CID=", fileCid);
  const getCarFile = await client.clientGenCar(
    {
      Path: `/${__dirname}/../uploads/${fileName}`,
      IsCAR: false,
    },
    `/${__dirname}/../uploadsCar/${fileName}.car`
  );
  // console.log("PiceCID=", getCarFile);
  const getCommP = await client.clientCalcCommP(
    `/${__dirname}/../uploadsCar/${fileName}.car`
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
