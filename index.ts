import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import router from "./config/router";

const app = express();
app.use(express.json());
app.use("/api", router);

const dbURI = process.env.DB_URI || "mongodb://127.0.0.1:27017/hotSauces";

async function start() {
  await mongoose.connect(dbURI);
  console.log("Connected to hotsauce database 🌶 🥵");
  app.listen(process.env.PORT, () => {
    console.log(
      `Express API is running on http://localhost:${process.env.PORT}`
    );
  });
}

start();
