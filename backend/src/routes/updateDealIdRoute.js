import { updateDealId } from "../db/updateDealId";
export const updateDealIdRoute = {
  method: "post",
  path: "/update-dealId",
  handler: async (req, res) => {
    const { owner, pieceCid, dealId } = req.body;
    try {
      const isUpdated = await updateDealId(owner, pieceCid, dealId);
      if (isUpdated) {
        res.status(200).json({
          message: "Deal Id updated successfully",
        });
      } else {
        res.status(400).json({
          error: "Deal Not Updated!",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    }
  },
};
