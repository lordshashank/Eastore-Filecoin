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
  statSync,
} = require("fs");
const {
  NodejsProvider,
} = require("@filecoin-shipyard/lotus-client-provider-nodejs");
const { json } = require("stream/consumers");
require("dotenv").config();
const lighthouse = require("@lighthouse-web3/sdk");
const LIGHTHOUSE_API_KEY = process.env.LIGHTHOUSE_API_KEY;
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

    console.log("running");
    console.log(fileNameMiner);
    const fileName = fileNameMiner.filesName;
    console.log(fileName);
    let pieceData = await checkPrice(fileName);
    pieceData.miner = fileNameMiner.miner;
    console.log(pieceData);
    // await makeDeal(pieceData);
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
    DealStartEpoch: 108000,
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
  console.log("getCarFile=", getCarFile);
  console.log(carFile);
  const carLink = await deploy(carFile);
  // console.log("PiceCID=", getCarFile);
  const stats = statSync(carFile);
  const fileSizeInBytes = stats.size;
  console.log("fileSizeInBytes=", fileSizeInBytes);
  const getCommP = await client.clientCalcCommP(carFile);
  const pieceCid = getCommP.Root;
  console.log("PiceCID=", pieceCid);
  const pieceSize = getCommP.Size;
  let paddedSize = 1;
  do {
    paddedSize *= 2;
  } while (paddedSize < pieceSize);
  const pieceData = {
    carLink: carLink,
    carSize: fileSizeInBytes,
    root: fileCid.Root,
    pieceCid: pieceCid,

    pieceSize: paddedSize,
  };
  // unlinkSync(uploadedFile);
  // unlinkSync(carFile);
  return pieceData;
}
const deploy = async (path) => {
  return "https://gateway.lighthouse.storage/ipfs/QmakdnG1ZscfZj88pSgmZvFbzV9dmgPEkpN9fS4Z81o3bT";
  // const API_KEY = "472046ea-ddbd-48fa-85f5-dce29687d8ef";
  //Give path to the file
  const apiKey = LIGHTHOUSE_API_KEY; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)

  const response = await lighthouse.upload(path, apiKey);
  // const response = {
  //   data: {
  //     Hash: "QmZ5Y2J",
  //   },
  // };

  // Display response
  console.log(response);
  console.log(
    "Visit at: https://gateway.lighthouse.storage/ipfs/" + response.data.Hash
  );
  return "https://gateway.lighthouse.storage/ipfs/" + response.data.Hash;
};
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
  // console.log(typeof jsonRead);
  // console.log(jsonRead);
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
  // console.log(data);
  res.json(data);
});
router.get("/dynamicData", (req, res) => {
  const read = readFileSync("./uploadData.json", { encoding: "utf8" });
  res.json(read);
});

module.exports = router;
