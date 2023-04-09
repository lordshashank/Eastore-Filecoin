import { retrieveDeal } from "../lotus/retrieveDeal";
export const retrieveDealRoute = {
  path: "/retrieveDeal",
  method: "post",
  handler: async (req, res) => {
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
    const result = await retrieveDeal(pieceData);
    // const jsonResult = JSON.stringify(result);
    // res.json(result);
    // console.log(data.fileName);
    const file = `/${__dirname}/../Retrievals/download`;
    res.download(file);
  },
};
