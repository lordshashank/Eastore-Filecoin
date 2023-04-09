import { client } from "./lotus";
export const checkPrice = async (fileName) => {
  try {
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
  } finally {
    client.destroy();
  }
};
