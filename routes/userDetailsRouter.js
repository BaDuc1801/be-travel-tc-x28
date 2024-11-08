import express from 'express'
import userDetailsController from '../controller/userDetailsController.js';
import multer from 'multer';

const userDetailsRouter = express.Router()

const storage = multer.memoryStorage();

userDetailsRouter.get('/:user', userDetailsController.getAllUsers)
userDetailsRouter.post('/create', userDetailsController.createNewUser)

export default userDetailsRouter;