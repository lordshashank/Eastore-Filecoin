const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();
const router = express.Router();
const db = require("./db.js");
const uri = process.env.MONGODB_URL;

async function getFromDatabase(owner) {
  try {
    await db.connect(uri);
    const dbConnection = db.getConnection();
    const collection = dbConnection.collection("deals");
    const query = { owner: owner };
    const document = await collection.findOne(query);
    if (document) {
      return document.deals;
    } else {
      return "no deals found";
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

router.post("/getDeals", async (req, res, next) => {
  console.log(req.body);
  const result = await getFromDatabase(req.body.owner);
  const jsonResult = JSON.stringify(result);
  return res.json(jsonResult);
});
module.exports = router;
