import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    cityName: {
        type: String,
        unique: true 
    },
    coordinates: {
        type: [Number], 
    },
    description: {
        type: String,
    },
    img: {
        type: String,
    },
    checkIns: [
        {
            userName: { type: String, required: true }, 
            checkInTime: { type: Date, default: Date.now }, 
            image: { type: String }, 
        }
    ]
});

const CityModel = mongoose.model('cities', citySchema);

export default CityModel;
