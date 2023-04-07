const express = require("express");
const axios = require("axios");
const app = express();
const router = express.Router();

const db = require("./db.js");

require("dotenv").config();

let url = process.env.MONGODB_URL;

async function saveInDatabase(data) {
  try {
    console.log(1);
    await db.connect(url);
    console.log(2);
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
}

router.post("/sendDeals", async (req, res, next) => {
  console.log(req.body);

  const result = await saveInDatabase(req.body);
  const jsonResult = JSON.stringify(result);
  return res.json(jsonResult);
});

module.exports = router;

// saveInDatabase();

// async function getFromDatabase() {
//   await db.connect(url); // connect to the database
//   const dbConnection = db.getConnection(); // get the connection
//   const ownerCollection = dbConnection.collection("owners"); // get the owners collection
//   const objectCollection = dbConnection.collection("objects"); // get the objects collection
//   const owner = await ownerCollection.findOne({ name: "John" }); // get the owner with name John
//   const object1 = await objectCollection.findOne({ name: "object1" }); // get the object1
//   const object2 = await objectCollection.findOne({ name: "object2" }); // get the object2
//   console.log(owner);
//   console.log(object1);
//   console.log(object2);
// }

// getFromDatabase();

// async function updateInDatabase() {
//   await db.connect(url); // connect to the database

//   const dbConnection = db.getConnection(); // get the connection

//   const ownerCollection = dbConnection.collection("owners"); // get the owners collection

//   const objectCollection = dbConnection.collection("objects"); // get the objects collection

//   const owner = await ownerCollection.findOne({ name: "John" }); // get the owner with name John

//   const object1 = await objectCollection.findOne({ name: "object1" }); // get the object1

//   const object2 = await objectCollection.findOne({ name: "object2" }); // get the object2

//   const ownerResult = await ownerCollection.updateOne(
//     { _id: owner._id },
//     { $set: { object1: object1._id, object2: object2._id } }
//   );

//   const object1Result = await objectCollection.updateOne(
//     { _id: object1._id },
//     { $set: { owner: owner._id } }
//   );

//   const object2Result = await objectCollection.updateOne(
//     { _id: object2._id },
//     { $set: { owner: owner._id } }
//   );

//   console.log(ownerResult);
//   console.log(object1Result);
//   console.log(object2Result);
// }
