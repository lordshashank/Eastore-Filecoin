import { saveDeal } from "../db/saveDeal";
export const saveDealRoute = {
  method: "post",
  path: "/sendDeal",
  handler: async (req, res) => {
    try {
      const result = await saveDeal(req.body);
      const jsonResult = JSON.stringify(result);
      return res.json(jsonResult);
    } catch (err) {
      console.log(err);
    }
  },
};
