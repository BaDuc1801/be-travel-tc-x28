import express from 'express';
const router = express.Router();
import postController from '../controller/postController.js';


router.post('/', postController.createPost);
router.get('/', postController.getAllPost)

export default router;
