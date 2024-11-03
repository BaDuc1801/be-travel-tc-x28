import mongoose from "mongoose";

const destiSchema = new mongoose.Schema({
    destiName: String,
    city: String,
    description: String,
    img: String,
})

const destiModel = mongoose.model('destinations', destiSchema);

export default destiModel