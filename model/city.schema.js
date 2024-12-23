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
    destinations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'destinations'
        }
    ]
});

const CityModel = mongoose.model('cities', citySchema);

export default CityModel;
