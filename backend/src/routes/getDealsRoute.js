import { getDeal } from "../db/getDeal";
export const getDealsRoute = {
  method: "get",
  path: "/getDeals",
  handler: async (req, res) => {
    const result = await getDeal(req.body.owner);
    const jsonResult = JSON.stringify(result);
    return res.json(jsonResult);
  },
};
