import express from 'express'
import userController from '../controller/userDetailsController';
import userDetailsController from '../controller/userDetailsController';

const userDetailsRouter = express.Router()

const storage = multer.memoryStorage();

userDetailsRouter.get('/:user', userDetailsController.getAllUsers)
userDetailsRouter.post('/create', userDetailsController.createNewUser)
export default userDetailsRouter;q