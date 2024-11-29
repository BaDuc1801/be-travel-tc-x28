import express from 'express'
import userController from '../controller/userController.js'
import authMiddleware from '../middlewares/authMiddlewares.js'

const userRouter = express.Router();

userRouter.post('/auth/register', authMiddleware.registerUser, userController.registerUser);
userRouter.post('/auth/login', authMiddleware.loginUser, userController.loginUser);
userRouter.get('/:id', userController.getUserInfo)
userRouter.get('/', userController.getAllUsers)
userRouter.post('/create', userController.createNewUser)
userRouter.put('/:id', userController.updateUserInfo)

export default userRouter
