import express from 'express';
import PostController from '../controller/postController.js'; 

const router = express.Router();

router.get('/', PostController.getAllPosts);
router.post('/', PostController.createPost);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);
router.get('/:id', PostController.getPostById);
router.get('/by-author', PostController.getPostsByAuthor);

export default router;
