import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import destiRouter from "./routes/destiRouter.js";
await mongoose.connect(process.env.MONGOCONNECT);

const app = express();
app.use(express.json());
app.use(cors());

app.use("/destinations", destiRouter);

app.get("/", (req, res)=>{
  res.status(200).json({message: "hello"})
})

app.listen(8080, () => {
  console.log("Server is running!");
});
