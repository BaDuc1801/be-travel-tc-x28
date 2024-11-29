import express from 'express'
import multer from 'multer';
import destiController from '../controller/destiController.js';

const destiRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
})

destiRouter.get('/', destiController.getListDesti)
destiRouter.get('/:id', destiController.getListDestiByID)
destiRouter.post('', destiController.postDesti)
destiRouter.put('/update/:name', destiController.updateDesti);
destiRouter.put('/up-img', upload.single('img'), destiController.uploadImg);
destiRouter.delete('/delete/:name', destiController.deleteDesti)

export default destiRouter;