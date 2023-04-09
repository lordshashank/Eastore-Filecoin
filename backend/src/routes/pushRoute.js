import { sendNotification } from "../lotus/sendNotification";

export const pushRoute = {
  method: "get",
  path: "/push",
  handler: async (req, res) => {
    const result = await sendNotification();
    const jsonResult = JSON.stringify(result);
    res.json(jsonResult);
  },
};
