import {
  HeadChange,
  LotusRPC,
  StartDealParams,
  DataRef,
  Cid,
  RetrievalOrder,
  FileRef,
} from "@filecoin-shipyard/lotus-client-rpc";
import { mainnet } from "@filecoin-shipyard/lotus-client-schema";
import { NodejsProvider } from "@filecoin-shipyard/lotus-client-provider-nodejs";
import { writeFileSync, appendFileSync } from "fs";
import { error } from "console";
import * as fs from "fs";
// import * as minerList from "../web2/nextjs_moralis_auth/pages/api/lotus/minerLog.json";

// const endpointUrl = "  wss://wss.hyperspace.node.glif.io/apigw/lotus/rpc/v1";
const endpointUrl = "http://127.0.0.1:1234/rpc/v0";
const provider = new NodejsProvider(endpointUrl, {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.hCv2GfO_kHoLLB2CjNgcBJ0HQUCSSqU81Cj-qC1U79k",
});
// const provider = new NodejsProvider(endpointUrl);
let client: LotusRPC;

async function main() {
  client = new LotusRPC(provider, { schema: mainnet.fullNode });
  try {
    /** REPLACE NEXT LINE WITH EXAMPLE FUNCTION CALL **/
    await chainHeadEx();
    // await minerListEx();
    // await test();
    // await getFileCID();
    // await authNew();
    // await getPieceCid();
    // await makeDeal();
    // await checkPrice("666full-ashley-puzemis.jpg");
    // await sign();
    // await minerListEx();
    // await minerInfo();
    // await retrieveData();

    console.log("hi");
    // await getCar();
  } finally {
    client.destroy();
  }
}

main().catch(console.error);

// EXAMPLES ////////////////////////////////////////////////////////////////////

async function chainHeadEx() {
  // eslint-disable-line no-unused-vars
  const head = await client.chainHead();
  console.log("chainHead=", head);
  // writeFileSync("./chainHead.json", JSON.stringify(head));
}
async function lotusInfo() {
  // eslint-disable-line no-unused-vars
  const head = await client.chainHead();
  console.log("chainHead=", head);
  writeFileSync("./chainHead.json", JSON.stringify(head));
}
async function authNew() {
  // eslint-disable-line no-unused-vars
  const head = await client.authNew([
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.hCv2GfO_kHoLLB2CjNgcBJ0HQUCSSqU81Cj-qC1U79k",
  ]);
  console.log("newAuth=", head);
  // minerList;
  writeFileSync(
    "../web2/nextjs_moralis_auth/pages/api/lotus/newAuth.json",
    JSON.stringify(head)
  );
}
async function checkPrice(fileName: string) {
  const fileCid = await client.clientImport({
    Path: `/home/lordforever/blockchain/kuch-bhi/web3.1/uploads/${fileName}`,
    IsCAR: false,
  });
  console.log("CID=", fileCid);
  // console.log("CID=", fileCid);
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
  console.log(pieceSize);
  return pieceSize;
}
async function retrieveData() {
  const pieceCid = {
    "/": "baga6ea4seaqi7oru7soavdyniub2es6lmxwboenupo7bzim4ccnokusij4woogi",
  };
  const rootCid = {
    "/": "bafk2bzacecos27srzsgjgk3gyfunryvufybkvxilmuelubyt4qn3myv2m4xhk",
  };
  const retrievalOrder: RetrievalOrder = {
    Root: rootCid,
    Piece: pieceCid,
    Size: 260096,
    Total: "0",
    UnsealPrice: "0",
    PaymentInterval: 4,
    PaymentIntervalIncrease: 4,
    Client: "t04119",
    Miner: "t04119",
    MinerPeer: {
      Address: "t01129",
      ID: "12D3KooWRUeeh76B16pi54wr8RZQAZv9wVbRiJFGVfLNnzwxCbkr",
      PieceCID: pieceCid,
    },
  };
  const fileRef: FileRef = {
    Path: "/home/lordforever/blockchain/kuch-bhi/web3.1/downloads.lock",
    IsCAR: false,
  };
  const getData = await client.clientRetrieve(retrievalOrder, fileRef);
  console.log(getData);
}
// async function minerInfo() {
//   // eslint-disable-line no-unused-vars

//   const head = await client.chainHead();
//   const miners = await client.stateListMiners(head.Cids);
//   let totalMinerInfo = [];
//   let totalMinerLog = [];

//   console.log(miners.length);
//   miners.forEach(async (miner, index) => {
//     const newMiner = miner.replace("f", "t");
//     const minInfo = await client.stateMinerInfo(newMiner, head.Cids);
//     // console.log(index);
//     // console.log(miner);
//     totalMinerLog.push(minInfo);

//     if (index == miners.length - 1) {
//       writeFileSync(
//         "../web2/nextjs_moralis_auth/pages/api/lotus/minerLog.json",
//         JSON.stringify(totalMinerLog)
//       );
//     }
//     console.log(newMiner);
// const minerInfo = await client.clientQueryAsk(minInfo.PeerId, newMiner);
//     console.log(minerInfo);
//     totalMinerInfo.push(minerInfo);
//     if (index == miners.length - 1) {
//       writeFileSync(
//         "../web2/nextjs_moralis_auth/pages/api/lotus/minerInfo.json",
//         JSON.stringify(totalMinerInfo)
//       );
//     }
//   });

//   // minerList.forEach(async (miner, index) => {
//   //   const newMiner = miner.replace("f", "t");
//   //   const minInfo = await client.stateMinerInfo(newMiner, head.Cids);
//   //   // console.log(index);
//   //   // console.log(miner);
//   //   totalMinerInfo.push(minInfo);

//   //   // const minerInfo = await client.clientQueryAsk(minInfo.PeerId, newMiner);
//   //   // totalMinerInfo.push(minerInfo);
//   //   if (index == miners.length - 1) {
//   //     // writeFileSync(
//   //     //   "../web2/nextjs_moralis_auth/pages/api/lotus/minerInfo.json",
//   //     //   JSON.stringify(totalMinerInfo)
//   //     // );
//   //     writeFileSync(
//   //       "../web2/nextjs_moralis_auth/pages/api/lotus/minerLog.json",
//   //       JSON.stringify(totalMinerLog)
//   //     );
//   //   }
//   // });
// }

// function minersWithTimeout(id, miners) {
//   return new Promise(function (resolve, reject) {
//     const check = client.clientQueryAsk(id, miners);
//     console.log(check);
//     setTimeout(resolve, 5000);
//     console.log(check);
//   });
// }

async function minersWithTimeout(id, miners) {
  const check = await client.clientQueryAsk(id, miners);
  console.log(check);
}

async function minerInfo() {
  // eslint-disable-line no-unused-vars

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
    // fs.appendFileSync("./minInfo.json", JSON.stringify(minInfo));
    // fs.appendFileSync("./minInfo.json", ",");
    console.log(index);
    // return minInfo;
  });
  // fs.writeFileSync("./minInfo.json", JSON.stringify(returnData));
}

async function getFileCID() {
  const head = await client.clientImport({
    Path: "/home/lordforever/blockchain/kuch-bhi-1/web3.1/my.md",
    IsCAR: false,
  });
  console.log("CID=", head);
  writeFileSync(
    "../web2/nextjs_moralis_auth/pages/api/lotus/CID.json",
    JSON.stringify(head)
  );
}
async function test() {
  const head = await client.chainHead();

  // const minerInfo = await client.stateMinerSectorCount("t01130", head.Cids);
  const minerInfo = await client.walletList();

  console.log(minerInfo);
}
async function getCar() {
  const head = await client.clientGenCar(
    {
      Path: "/home/lordforever/blockchain/kuch-bhi-1/web3.1/my.md",
      IsCAR: false,
    },
    "/home/lordforever/blockchain/kuch-bhi-1/web3.1/mmy.car"
  );
  console.log("PiceCID=", head);
}
async function getPieceCid() {
  const head = await client.clientCalcCommP(
    "/home/lordforever/blockchain/kuch-bhi-1/web3.1/my.car"
  );
  console.log("PiceCID=", head);
  writeFileSync(
    "../web2/nextjs_moralis_auth/pages/api/lotus/PieceCID.json",
    JSON.stringify(head)
  );
}
// async function makeDeal() {
//   const DataRef1: DataRef = {
//     TransferType: "abcd",
//     Root: { "/": "bafkqab33nbswqzl5bi" },
//     PieceCid: {
//       "/": "baga6ea4seaqi5koaue7o5chp3rrcdigeurb6gwn3ru7cpon2w7jwcdzacxomyoq",
//     },
//     PieceSize: 254,
//   };
//   const startDealParams: StartDealParams = {
//     Data: DataRef1,
//     Wallet: "f1mpkhu2732mmxvyk2pzbq6sivg4mj3athgh2gm5y",
//     Miner: "f01130",
//     EpochPrice: "0",
// MinBlocksDuration: 550000,
// ProviderCollateral: "0",
// DealStartEpoch: 54780,
//     FastRetrieval: false,
//     VerifiedDeal: false,
//   };
//   const head = await client.clientStartDeal(startDealParams);
//   console.log(head);
// }
async function makeDeal() {
  const fileCid = await client.clientImport({
    Path: "/home/lordforever/blockchain/kuch-bhi/web3.1/my.md",
    IsCAR: false,
  });
  console.log("CID=", fileCid);
  const getCarFile = await client.clientGenCar(
    {
      Path: "/home/lordforever/blockchain/kuch-bhi/web3.1/my.md",
      IsCAR: false,
    },
    "/home/lordforever/blockchain/kuch-bhi/web3.1/mmy.car"
  );
  // console.log("PiceCID=", getCarFile);
  const getCommP = await client.clientCalcCommP(
    "/home/lordforever/blockchain/kuch-bhi/web3.1/mmy.car"
  );
  const pieceCid = getCommP.Root;
  console.log("PiceCID=", pieceCid);
  const pieceSize = getCommP.Size;
  const DataRef1: DataRef = {
    TransferType: "abcd",
    Root: fileCid.Root,
    PieceCid: pieceCid,
    PieceSize: pieceSize,
  };
  const startDealParams: StartDealParams = {
    Data: DataRef1,
    Wallet: "f1mpkhu2732mmxvyk2pzbq6sivg4mj3athgh2gm5y",
    Miner: "f01129",
    EpochPrice: "0",
    MinBlocksDuration: 550000,
    ProviderCollateral: "0",
    DealStartEpoch: 61000,
    FastRetrieval: false,
    VerifiedDeal: false,
  };
  const head = await client.clientStartDeal(startDealParams);
  console.log(head);
}

async function sign() {
  const signature = await client.walletSign(
    "t110fskm6vskjkirvv2dlsqjc2l34o737nljqcfsu2ji",
    "me"
  );
  console.log(signature);
}
async function chainNotifyEx() {
  // eslint-disable-line no-unused-vars
  const [cancel, ready] = client.chainNotify((data: HeadChange[]) => {
    console.log(data);
  });

  await ready;
  console.log("sub ready");

  await new Promise<void>((resolve) => {
    process.on("SIGINT", resolve);
  });
  console.log("SIGINT received");
  cancel();
}

// async function minerListEx() {
//   // eslint-disable-line no-unused-vars
//   const fList = minerList.map((miner) => {
//     return miner.replace("f", "t");
//   });
//   const head = await client.chainHead();
//   const miners = await client.stateListMiners(head.Cids);
//   console.log("miners=", miners);
//   writeFileSync(
//     "../web2/nextjs_moralis_auth/pages/api/lotus/minerlist.json",
//     JSON.stringify(miners)
//   );
// }
