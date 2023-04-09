import { emptyDirSync } from "fs-extra";
import { client } from "./lotus";

export const retrieveDeal = async (pieceData) => {
  try {
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
  } catch (err) {
    console.log(err);
  } finally {
    client.destroy();
  }
};
