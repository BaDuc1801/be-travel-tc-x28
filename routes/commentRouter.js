import express from 'express'
import commentController from '../controller/commentController.js';

const commentRouter = express.Router();

commentRouter.put('/up', commentController.likeComment);
commentRouter.put('/rep', commentController.replyToComment);

export default commentRouter
