// import express from "express";
// import { LotusRPC } from "@filecoin-shipyard/lotus-client-rpc";
// import { mainnet } from "@filecoin-shipyard/lotus-client-schema";
// import { NodejsProvider } from "@filecoin-shipyard/lotus-client-provider-nodejs";
const express = require("express");
const { LotusRPC } = require("@filecoin-shipyard/lotus-client-rpc");
const { mainnet } = require("@filecoin-shipyard/lotus-client-schema");
const fs = require("fs");
const { emptyDirSync } = require("fs-extra");

const {
  NodejsProvider,
} = require("@filecoin-shipyard/lotus-client-provider-nodejs");
require("dotenv").config();
const endpointUrl = "http://127.0.0.1:1234/rpc/v0";
const LOTUS_TOKEN = process.env.LOTUS_TOKEN;
const provider = new NodejsProvider(endpointUrl, {
  token: LOTUS_TOKEN,
});
const client = new LotusRPC(provider, { schema: mainnet.fullNode });
async function main(pieceData) {
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
    return await retrieveData(pieceData);
    // return pieceData;

    //   await sign();
    // await minerListEx();
    // await minerInfo();
  } finally {
    client.destroy();
  }
}

async function retrieveData(pieceData) {
  emptyDirSync(`/${__dirname}/../Retrievals`);
  const retrievalOrder = {
    Root: pieceData.root,
    Piece: pieceData.pieceCid,
    Size: pieceData.pieceSize,
    Total: "0",
    UnsealPrice: "0",
    PaymentInterval: 4,
    PaymentIntervalIncrease: 4,
    Client: "t04119",
    Miner: "t04119",
    MinerPeer: {
      Address: "t01129",
      ID: "12D3KooWRUeeh76B16pi54wr8RZQAZv9wVbRiJFGVfLNnzwxCbkr",
      PieceCID: pieceData.pieceCid,
    },
  };
  const fileRef = {
    Path: `/${__dirname}/../Retrievals/download`,
    IsCAR: false,
  };
  const getData = await client.clientRetrieve(retrievalOrder, fileRef);
  console.log(getData);
  return "done";
}

const router = express.Router();

router.post("/retrieveDeal", async (req, res) => {
  console.log(req.body);
  const data = req.body;
  const pieceData = {
    root: {
      "/": data.cid,
    },
    pieceCid: {
      "/": data.pieceCid,
    },
    pieceSize: data.pieceSize,
    miner: "t01129",
  };
  console.log(pieceData);
  const result = await main(pieceData);
  // const jsonResult = JSON.stringify(result);
  // res.json(result);
  // console.log(data.fileName);
  const file = `/${__dirname}/../Retrievals/download`;
  res.download(file);
  // fs.unlinkSync(file);
  //   main().then((result) => {
  //     console.log(result);
  //     res.json(result);
  //   });
});
module.exports = router;
