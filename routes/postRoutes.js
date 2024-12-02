import express from 'express';
const router = express.Router();
import postController from '../controller/postController.js';


router.post('/', postController.createPost);

export default router;
