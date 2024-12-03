import express from 'express';
const router = express.Router();
import postController from '../controller/postController.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
})
// 
router.post('/', postController.createPostForUser);
router.put('/img/:id', upload.array('img'), postController.uploadImgItem);
router.get('/', postController.getAllPost);
router.delete('/delete/:id', postController.deletePostById);
router.post('/like', postController.likePost);
router.post('/bookmark', postController.bookmarkPost)

export default router;
