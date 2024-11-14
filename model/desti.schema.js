import mongoose from "mongoose";

const destiSchema = new mongoose.Schema({
  destiName: String,
  city: String,
  description: String,
  img: String,
  coordinates: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  }
});

const destiModel = mongoose.model('destinations', destiSchema);

export default destiModel;
