import express from "express";
import { routes } from "./routes";
import fileUpload from "express-fileupload";
import { db } from "./db/db";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.static(__dirname + "/uploads/"));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization,AuthToken"
  );
  next();
});

routes.forEach((route) => app[route.method](route.path, route.handler));

const uri = process.env.MONGODB_URL;

const start = async () => {
  await db.connect(uri);
  app.listen(3001, () => {
    console.log("Server is listening on Port 3001");
  });
};
start();
