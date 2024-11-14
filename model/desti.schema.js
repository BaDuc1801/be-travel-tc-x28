import mongoose from "mongoose";

const destiSchema = new mongoose.Schema({
  destiName: String,
  city: String,
  description: String,
  img: String,
  coordinates: {
    type: [Number],  
    required: true
  }
});

destiSchema.index({ coordinates: "2dsphere" });

const destiModel = mongoose.model('destinations', destiSchema);

export default destiModel;
