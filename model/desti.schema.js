import mongoose from "mongoose";

const destiSchema = new mongoose.Schema({
    destiName: String,
    city: String,
    description: String,
    img: String,
    coordinates: {
        type: [Number]
    }
})

const destiModel = mongoose.model('destinations', destiSchema);

export default destiModel;
