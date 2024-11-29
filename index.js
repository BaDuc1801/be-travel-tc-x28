import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import destiRouter from "./routes/destiRouter.js";
import userRouter from "./routes/userRouter.js";
import cityRouter from "./routes/cityRouter.js";
import postRouter from "./routes/postRoutes.js"; 

dotenv.config();  

await mongoose.connect(process.env.MONGOCONNECT);

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/destinations', destiRouter);
app.use('/cities', cityRouter);
app.use('/post', postRouter);   

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

app.listen(8080, () => {
  console.log(`Server is running at localhost:8080!`);
});
