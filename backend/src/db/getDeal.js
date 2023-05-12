import { db } from "./db";

export const getDeal = async (owner) => {
  try {
    const dbConnection = db.getConnection();
    const collection = dbConnection.collection("deals");
    const query = { owner: owner };
    const document = await collection.findOne(query);
    if (document) {
      return document.deals;
    } else {
      return { error: "no deals found" };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
