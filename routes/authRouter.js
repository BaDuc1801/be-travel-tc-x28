import express from 'express'
import authController from '../controller/authController.js'
import authMiddleware from '../middlewares/authMiddlewares.js'

const authRouter = express.Router();

authRouter.post('/auth/register', authMiddleware.registerUser, authController.registerUser);

authRouter.post('/auth/login', authMiddleware.loginUser, authController.loginUser);

export default authRouter
