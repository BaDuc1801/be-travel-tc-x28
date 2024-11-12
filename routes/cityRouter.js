import express from 'express'
import multer from 'multer';
import CityController from '../controller/cityController.js';

const cityRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
})

cityRouter.get('/', CityController.getListCity)
cityRouter.post('', CityController.postCity)
cityRouter.put('/update/:name', CityController.updateCity);
cityRouter.put('/up-img', upload.single('img'), CityController.uploadImg);
cityRouter.delete('/delete/:name', CityController.deleteCity)

export default cityRouter;