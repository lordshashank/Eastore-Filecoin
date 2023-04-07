const express = require("express");
const app = express();
const axios = require("axios");
const multer = require("multer");
const path = require("path");
const runNode = require("./api/run-node-function");
const upload = require("./api/upload");
const checkPrice = require("./api/checkPrice");
const minerInfo = require("./api/miner-info");
const buyDeal = require("./api/buyDeal");
const retrieveDeal = require("./api/retrieveDeal");
const buyPerpetualDeal = require("./api/buyPerpetualDeal");
const push = require("./api/push");
const answer = require("./api/chatgpt");
const saveInDatabase = require("./api/saveInDatabase");
const getFromDatabase = require("./api/getFromDatabase");
// const sendData = require("./api/bu");
app.get("/", (req, res) => {
  res.json("Hello, World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
  //   res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
app.use(runNode);
app.use(upload);
app.use(checkPrice);
app.use(minerInfo);
app.use(buyDeal);
app.use(retrieveDeal);
// app.use(sendData);
app.use(buyPerpetualDeal);
app.use(push);
app.use(answer);
app.use(saveInDatabase);
app.use(getFromDatabase);

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is listening on port 3001");
});
