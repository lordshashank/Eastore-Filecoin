import { postMinerInfo } from "../lotus/postMinerInfo";

export const postMinerInfoRoute = {
  method: "post",
  path: "/miner-info",
  handler: async (req, res) => {
    const result = await postMinerInfo();
    const jsonResult = JSON.stringify(result);
    res.json(jsonResult);
  },
};
