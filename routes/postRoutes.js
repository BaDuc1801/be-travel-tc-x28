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
router.put('/like', postController.likePost);
router.put('/bookmark', postController.bookmarkPost);
router.put('/cmt', postController.addCommentToPost)

export default router;
