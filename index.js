import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import destiRouter from "./routes/destiRouter.js";
import userDetailsRouter from "./routes/userDetailsRouter.js";
await mongoose.connect(process.env.MONGOCONNECT);
import cors from 'cors'
import authRouter from './routes/authRouter.js'

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', authRouter);


app.get("/", (req, res)=>{
  res.status(200).json({message: "hello"})
})

app.use('/destinations', destiRouter)
app.use('/user', userDetailsRouter)

app.listen(8080, () => {
  console.log("Server is running!");
});
