import dotenv from 'dotenv';
import { v2 as cloudinary} from 'cloudinary'
import CityModel from "../model/city.schema.js";
dotenv.config();

const getCloudinaryConfig = JSON.parse(process.env.CLOUD_DINARY_CONFIG);
cloudinary.config(getCloudinaryConfig);

const CityController = {
    getListCity : async (req, res) => {
        try {
            const dest = await CityModel.find();
            res.status(200).send(dest)
        } catch(e){
            res.status(500).send({
                message: e.message
            });
        }
    },

    postCity : async (req, res) => {
        try {
            const newDest = req.body;
            const dest = await CityModel.create(newDest);
            res.status(200).send(dest)
        } catch(e){
            res.status(500).send({
                message: e.message
            });
        }
    },

    updateCity: async (req, res) => {
        try {
            const { name } = req.params; 
            const updatedData = req.body; 
            const updatedDest = await CityModel.findOneAndUpdate({ cityName: name }, updatedData, { new: true });
            if (!updatedDest) {
                return res.status(404).send({ message: "Citynation not found" });
            }
            res.status(200).send(updatedDest);
        } catch (e) {
            res.status(500).send({
                message: e.message
            });
        }
    },

    deleteCity: async (req, res) => {
        try {
            const { name } = req.params; 
            const deletedDest = await CityModel.findOneAndDelete({ cityName: name });
            if (!deletedDest) {
                return res.status(404).send({ message: "Citynation not found" });
            }
            res.status(200).send({ message: "Citynation deleted successfully" });
        } catch (e) {
            res.status(500).send({
                message: e.message
            });
        }
    },

    uploadImg: async (req, res) => {
        let img = req.file;
        let {name} = req.query;
        let dest = await CityModel.findOne({ cityName: name });
        if (dest) {
            if(img){
                const dataUrl = `data:${img.mimetype};base64,${img.buffer.toString('base64')}`;
                await cloudinary.uploader.upload(dataUrl,
                    {resource_type: 'auto'},
                    async (err, result) => {
                        if (result && result.url) {
                            dest.img = result.url;
                            await dest.save()
                            return res.status(200).json({
                                message: 'dest information updated successfully',
                                dest: result.url
                            });
                        } else {
                            return res.status(500).json({
                                message: 'Error when upload file: '  + err.message
                            });
                        }
                    }
                )
            } else {
                return res.status(404).json({
                    message: 'Image not found'
                });
            }
        } else {
            return res.status(404).json({
                message: 'Citynation not found'
            });
        }
    },

    findCity: async (req, res) => {
        let { name } = req.params;  
        try {
            let city = await CityModel.findOne({ cityName: name }); 
            if (!city) {
                return res.status(404).send({ message: "City not found" }); 
            }
            return res.status(200).send(city);  
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: "Internal Server Error" });  
        }
    }
    
}

export default CityController;