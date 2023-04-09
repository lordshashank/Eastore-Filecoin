import { buyDeal } from "../lotus/buyDeal.js";
import { readFileSync, writeFileSync } from "fs";
export const buyDealRoute = {
  method: "post",
  path: "/buyDeal",
  handler: async (req, res) => {
    const result = await buyDeal(req.body);
    result.fileName = req.body.filesName;
    // data = result;

    const read = readFileSync("uploadData.json", { encoding: "utf8" });

    const jsonRead = JSON.parse(read);

    jsonRead.push(result);

    writeFileSync("uploadData.json", JSON.stringify(jsonRead));

    res.json(result);
  },
};
