import express from 'express';
const router = express.Router();
import { createPost } from '../controller/postController.js';


router.post('/', createPost);

export default router;
