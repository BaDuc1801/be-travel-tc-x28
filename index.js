import express from 'express';
import mongoose from 'mongoose';
await mongoose.connect('mongodb+srv://minhduc180104:minhduc180104@learnmongo.zli6q.mongodb.net/travel-social-media?retryWrites=true&w=majority&appName=LearnMongo')

const app = express();

app.listen(8080, () => {
    console.log("Server is running!")
})