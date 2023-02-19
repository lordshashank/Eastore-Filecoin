// import express from "express";
// import { LotusRPC } from "@filecoin-shipyard/lotus-client-rpc";
// import { mainnet } from "@filecoin-shipyard/lotus-client-schema";
// import { NodejsProvider } from "@filecoin-shipyard/lotus-client-provider-nodejs";
const express = require("express");
const { LotusRPC } = require("@filecoin-shipyard/lotus-client-rpc");
const { mainnet } = require("@filecoin-shipyard/lotus-client-schema");
const {
  appendFileSync,
  unlinkSync,
  readFileSync,
  writeFileSync,
} = require("fs");
require("dotenv").config();
const { emptyDirSync } = require("fs-extra");
const {
  NodejsProvider,
} = require("@filecoin-shipyard/lotus-client-provider-nodejs");
const { json } = require("stream/consumers");
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
async function main(fileNameMiner) {
  //   client = new LotusRPC(provider, { schema: mainnet.fullNode });
  try {
    /* REPLACE NEXT LINE WITH EXAMPLE FUNCTION CALL */
    // await chainHeadEx();
    // await minerListEx();
    // await test();
    // await getFileCID();
    // await authNew();
    // await getPieceCid();
    emptyDirSync(`/${__dirname}/../uploadsCar`);
    emptyDirSync(`/${__dirname}/../uploads`);
    console.log("running");
    console.log(fileNameMiner);
    const fileName = fileNameMiner.filesName;
    console.log(fileName);
    let pieceData = await checkPrice(fileName);
    pieceData.miner = fileNameMiner.miner;
    console.log(pieceData);
    await makeDeal(pieceData);
    return pieceData;

    //   await sign();
    // await minerListEx();
    // await minerInfo();
  } finally {
    client.destroy();
  }
}
async function makeDeal(pieceData) {
  const DataRef1 = {
    TransferType: "abcd",
    Root: pieceData.root,
    PieceCid: pieceData.pieceCid,
    PieceSize: pieceData.pieceSize,
  };
  const startDealParams = {
    Data: DataRef1,
    Wallet: "f1mpkhu2732mmxvyk2pzbq6sivg4mj3athgh2gm5y",
    Miner: pieceData.miner,
    EpochPrice: "0",
    MinBlocksDuration: 550000,
    ProviderCollateral: "0",
    DealStartEpoch: 100630,
    FastRetrieval: false,
    VerifiedDeal: false,
  };
  const head = await client.clientStartDeal(startDealParams);
  console.log(head);
  return JSON.stringify(head);
}
async function checkPrice(fileName) {
  uploadedFile = `/${__dirname}/../uploads/${fileName}`;
  carFile = `/${__dirname}/../uploadsCar/${fileName}.car`;
  const fileCid = await client.clientImport({
    Path: uploadedFile,
    IsCAR: false,
  });
  console.log("CID=", fileCid);
  // console.log("CID=", fileCid);
  const getCarFile = await client.clientGenCar(
    {
      Path: uploadedFile,
      IsCAR: false,
    },
    carFile
  );
  // console.log("PiceCID=", getCarFile);
  const getCommP = await client.clientCalcCommP(carFile);
  const pieceCid = getCommP.Root;
  console.log("PiceCID=", pieceCid);
  const pieceSize = getCommP.Size;
  const pieceData = {
    root: fileCid.Root,
    pieceCid: pieceCid,
    pieceSize: pieceSize,
  };
  // unlinkSync(uploadedFile);
  // unlinkSync(carFile);
  return pieceData;
}
let data;
const router = express.Router();

router.post("/buyDeal", async (req, res) => {
  console.log(req.body);
  const result = await main(req.body);
  result.fileName = req.body.filesName;
  // const jsonResult = JSON.stringify(result);
  // const result = {
  //   root: {
  //     "/": "bafykbzacedfzw6v4vnvjo672sa5tc5stlx5yab3sl5v25hoysmrkygecgsfwc",
  //   },
  //   pieceCid: {
  //     "/": "baga6ea4seaqehfzlp4hsk3nzppjkcnlcr2x3nxy76fs6nvmm7x6afjk4ur4j4py",
  //   },
  //   pieceSize: 8323072,
  //   miner: "f01129",
  // };
  data = result;
  // const dataArray = [];
  // dataArray.push(jsonResult)
  const read = readFileSync("uploadData.json", { encoding: "utf8" });

  const jsonRead = JSON.parse(read);
  console.log(typeof jsonRead);
  console.log(jsonRead);
  jsonRead.push(result);

  writeFileSync("uploadData.json", JSON.stringify(jsonRead));
  // appendFileSync("uploadData.json", ",");

  res.json(result);
  //   main().then((result) => {
  //     console.log(result);
  //     res.json(result);
  //   });
});
router.get("/sendData", (req, res) => {
  console.log(data);
  res.json(data);
});
router.get("/dynamicData", (req, res) => {
  const read = readFileSync("uploadData.json", { encoding: "utf8" });
  res.json(read);
});

module.exports = router;
