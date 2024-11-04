import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import destiRouter from "./routes/destiRouter.js";
await mongoose.connect(process.env.MONGOCONNECT);

const app = express();

app.use("/destinations", destiRouter);

app.listen(8080, () => {
  console.log("Server is running!");
});
