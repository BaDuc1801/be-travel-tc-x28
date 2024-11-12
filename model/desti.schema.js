import mongoose from "mongoose";

const destiSchema = new mongoose.Schema({
    destiName: String,
    city: String,
    description: String,
    img: String,
    coordinates: {
        type: [Number], 
        index: '2dsphere' 
    }
})

const destiModel = mongoose.model('destinations', destiSchema);

export default destiModel;
