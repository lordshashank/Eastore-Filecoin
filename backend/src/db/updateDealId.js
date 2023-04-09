import { db } from "./db";

export const updateDealId = async (owner, pieceCid, dealId) => {
  try {
    const connection = db.getConnection();
    const collection = await connection.collection("deals");
    const data = await collection.findOne({ owner: owner });
    const deal = data.deals.find((deal) => deal.pieceCid === pieceCid);
    if (deal) {
      deal.dealId = dealId;
      const updatedDeal = await collection.updateOne(
        { _id: data._id },
        { $set: { deals: data.deals } }
      );
      return updatedDeal.acknowledged;
    } else {
      console.log("No matching deal found");
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};
