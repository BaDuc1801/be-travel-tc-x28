import mongoose from "mongoose";

const destiSchema = new mongoose.Schema({
  destiName: String,
  city: String,
  description: String,
  img: String,
  coordinates: {
    type: [Number],  // Mảng [longitude, latitude]
    required: true
  }
});

// Thêm chỉ mục 2dsphere cho trường coordinates
destiSchema.index({ coordinates: "2dsphere" });

const destiModel = mongoose.model('destinations', destiSchema);

export default destiModel;
