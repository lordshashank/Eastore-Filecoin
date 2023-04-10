import { checkPrice } from "../lotus/checkPrice";
export const checkPriceRoute = {
  method: "post",
  path: "/check-price",
  handler: async (req, res) => {
    const result = await checkPrice(req.body);
    const jsonResult = JSON.stringify(result);
    return res.json(jsonResult);
  },
};
