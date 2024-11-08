import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import destiRouter from "./routes/destiRouter.js";
await mongoose.connect(process.env.MONGOCONNECT);
import cors from 'cors'
import authRouter from './routes/authRouter.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', authRouter);

app.use("/destinations", destiRouter);

app.get("/", (req, res)=>{
  res.status(200).json({message: "hello"})
})

app.listen(8080, () => {
  console.log("Server is running!");
});
