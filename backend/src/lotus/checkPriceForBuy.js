import { client } from "./lotus";
// import { deploy } from "./deploy";
import { statSync, unlinkSync } from "fs";
import dotenv from "dotenv";
dotenv.config();
import lighthouse from "@lighthouse-web3/sdk";
// import { it } from "node:test";

const LIGHTHOUSE_API_KEY = process.env.LIGHTHOUSE_API_KEY;
export const checkPrice = async (fileName) => {
  try {
    // unlinkSync(uploadedFile);
    // unlinkSync(carFile);
    let uploadedFile = `${__dirname}/../uploads/${fileName}`;
    let carFile = `/${__dirname}/../uploadsCar/${fileName}.car`;
    const apiKey = LIGHTHOUSE_API_KEY; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)
    const authToken = await lighthouse.dataDepotAuth(apiKey);
    let response = await lighthouse.viewCarFiles(
      1,
      authToken.data.access_token
    );
    console.log(response);
    console.log(fileName[0]);
    let fileParams = response.data.filter((item) => {
      return item.fileName === fileName[0];
    });

    if (fileParams.length === 0 || fileParams === undefined || !fileParams) {
      const upload = await lighthouse.createCar(
        uploadedFile,
        authToken.data.access_token
      );
      console.log(upload);

      response = await lighthouse.viewCarFiles(1, authToken.data.access_token);
      console.log(response);
      fileParams = response.data.filter((item) => {
        return item.fileName === fileName[0];
      });
    }

    console.log("here");
    console.log(fileParams);
    const carLink = `https://data-depot.lighthouse.storage/api/download/download_car?fileId=${fileParams[0].id}.car`;
    const pieceData = {
      id: fileParams[0].id,
      carLink: carLink,
      carSize: fileParams[0].carSize,
      root: fileParams[0].payloadCid,
      pieceCid: fileParams[0].pieceCid,
      pieceSize: fileParams[0].pieceSize,
      mimeType: fileParams[0].mimeType,
    };
    unlinkSync(uploadedFile);
    return pieceData;
  } finally {
    client.destroy();
  }
};
// const fileCid = await client.clientImport({
//   Path: uploadedFile,
//   IsCAR: false,
// });
// console.log("CID=", fileCid);
// // console.log("CID=", fileCid);
// const getCarFile = await client.clientGenCar(
//   {
//     Path: uploadedFile,
//     IsCAR: false,
//   },
//   carFile
// );
// console.log("getCarFile=", getCarFile);
// console.log(carFile);
// const carLink = await deploy(carFile);
// // console.log("PiceCID=", getCarFile);
// const stats = statSync(carFile);
// const fileSizeInBytes = stats.size;
// console.log("fileSizeInBytes=", fileSizeInBytes);
// const getCommP = await client.clientCalcCommP(carFile);
// const pieceCid = getCommP.Root;
// console.log("PiceCID=", pieceCid);
// const pieceSize = getCommP.Size;
// let paddedSize = 1;
// do {
//   paddedSize *= 2;
// } while (paddedSize < pieceSize);
// const pieceData = {
//   carLink: carLink,
//   carSize: fileSizeInBytes,
//   root: fileCid.Root,
//   pieceCid: pieceCid,

//   pieceSize: paddedSize,
// };
