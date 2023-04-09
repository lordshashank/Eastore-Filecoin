import { getMinerInfo } from "../lotus/getMinerInfo";

export const getMinerInfoRoute = {
  method: "get",
  path: "/miner-info",
  handler: async (req, res) => {
    const result = await getMinerInfo();
    const jsonResult = JSON.stringify(result);
    res.json(jsonResult);
  },
};
