import { db } from "./db";
export const saveDeal = async (data) => {
  try {
    const dbConnection = db.getConnection();
    const collection = dbConnection.collection("deals");
    //   const ownerResult = await ownerCollection.insertOne(owner);
    const query = { owner: data.owner };
    const document = await collection.findOne(query);
    console.log(3);
    if (document) {
      // If document exists and deal address is not already present, add deal address to existing document
      if (!document.deals.includes(data.deal)) {
        const updatedDocument = { $push: { deals: data.deal } };
        const result = await collection.updateOne(query, updatedDocument);
        console.log(`${result.modifiedCount} document(s) data written.`);
      } else {
        const updatedDocument = { $set: { deals: data.deal } };

        const result = await objectCollection.updateOne(query, updatedDocument);
        console.log(`${result.modifiedCount} document(s) data updated.`);
      }
    } else {
      console.log(4);
      // If document doesn't exist, create a new document for the owner with the deal address
      const newDocument = { owner: data.owner, deals: [data.deal] };
      const result = await collection.insertOne(newDocument);
      console.log(result);
      console.log(` document(s) inserted.`);
    }

    return "done";
  } catch (error) {
    console.log(error);
    throw error;
  }
};
