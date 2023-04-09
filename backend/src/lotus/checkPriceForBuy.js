import { client } from "./lotus";
import { deploy } from "./deploy";
import { statSync } from "fs";
export const checkPrice = async (fileName) => {
  try {
    let uploadedFile = `/${__dirname}/../uploads/${fileName}`;
    let carFile = `/${__dirname}/../uploadsCar/${fileName}.car`;
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
  } finally {
    client.destroy();
  }
};
