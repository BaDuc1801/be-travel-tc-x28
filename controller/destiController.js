import destiModel from "../model/desti.schema.js"
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'
import CityModel from "../model/city.schema.js";
dotenv.config();

const getCloudinaryConfig = JSON.parse(process.env.CLOUD_DINARY_CONFIG);
cloudinary.config(getCloudinaryConfig);

const destiController = {
    getListDesti: async (req, res) => {
        try {
            const dest = await destiModel.find();
            res.status(200).send(dest)
        } catch (e) {
            res.status(500).send({
                message: e.message
            });
        }
    },

    getListDestiByID: async (req, res) => {
        try {
            const { id } = req.params;
            const destination = await destiModel.findById(id);
            if (!destination) {
                return res.status(404).send({
                    message: "Destination not found"
                });
            }
            res.status(200).send(destination);
        } catch (e) {
            console.error('Error in getListDestiByID:', e);
            res.status(500).send({
                message: e.message
            });
        }
    },

    postDesti: async (req, res) => {
        try {
            const newDest = req.body;
            const city = await CityModel.findOne({ cityName: newDest.city });

            if (!city) {
                return res.status(404).send({
                    message: "City not found"
                });
            }
            const dest = await destiModel.create(newDest);
            city.destinations.push(dest._id);
            await city.save();
            res.status(200).send(dest);
        } catch (e) {
            res.status(500).send({
                message: e.message
            });
        }
    },

    updateDesti: async (req, res) => {
        try {
            const { name } = req.params;
            const updatedData = req.body;
            const updatedDest = await destiModel.findOneAndUpdate({ destiName: name }, updatedData, { new: true });
            if (!updatedDest) {
                return res.status(404).send({ message: "Destination not found" });
            }
            res.status(200).send(updatedDest);
        } catch (e) {
            res.status(500).send({
                message: e.message
            });
        }
    },

    deleteDesti: async (req, res) => {
        try {
            const { name } = req.params;
            const deletedDest = await destiModel.findOneAndDelete({ destiName: name });
            
            if (!deletedDest) {
                return res.status(404).send({ message: "Destination not found" });
            }
    
            // Tìm và cập nhật city để xóa destination ID
            await CityModel.updateMany(
                { destinations: deletedDest._id },
                { $pull: { destinations: deletedDest._id } }
            );
    
            res.status(200).send({ message: "Destination deleted successfully" });
        } catch (e) {
            res.status(500).send({
                message: e.message
            });
        }
    },

    uploadImg: async (req, res) => {
        let img = req.file;
        let { name } = req.query;
        let dest = await destiModel.findOne({ destiName: name });
        if (dest) {
            if (img) {
                const dataUrl = `data:${img.mimetype};base64,${img.buffer.toString('base64')}`;
                await cloudinary.uploader.upload(dataUrl,
                    { resource_type: 'auto' },
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
                                message: 'Error when upload file: ' + err.message
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
                message: 'Destination not found'
            });
        }
    },
    
    
}

export default destiController;