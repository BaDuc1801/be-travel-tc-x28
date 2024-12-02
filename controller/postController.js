import dotenv from 'dotenv';
import PostModel from "../model/postModel.js";
dotenv.config();

const PostController = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await PostModel.find().sort({ timestamp: -1 });
            res.status(200).send(posts);
        } catch (e) {
            res.status(500).send({
                message: e.message
            });
        }
    },

    createPost: async (req, res) => {
        try {
            const { content, img, privacy, type, author, emotion, timestamp } = req.body;

            if (!content) {
                return res.status(400).send({ message: 'Nội dung bài viết là bắt buộc.' });
            }
            if (!privacy || (privacy !== 'private' && privacy !== 'public')) {
                return res.status(400).send({ message: 'Giá trị privacy không hợp lệ.' });
            }
            if (!type || (type !== 'text' && type !== 'image')) {
                return res.status(400).send({ message: 'Giá trị type không hợp lệ.' });
            }
            if (!author || !author.name || !author.avatar) {
                return res.status(400).send({ message: 'Thông tin tác giả không đầy đủ.' });
            }
            if (!timestamp) {
                return res.status(400).send({ message: 'Timestamp không được để trống.' });
            }

            const newPost = await PostModel.create({ content, img, privacy, type, author, emotion, timestamp });
            res.status(201).send(newPost);
        } catch (e) {
            res.status(500).send({
                message: e.message
            });
        }
    },

    updatePost: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedData = req.body;

            const updatedPost = await PostModel.findByIdAndUpdate(id, updatedData, { new: true });
            if (!updatedPost) {
                return res.status(404).send({ message: 'Bài viết không tồn tại.' });
            }

            res.status(200).send(updatedPost);
        } catch (e) {
            res.status(500).send({
                message: e.message
            });
        }
    },

    deletePost: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedPost = await PostModel.findByIdAndDelete(id);
            if (!deletedPost) {
                return res.status(404).send({ message: 'Bài viết không tồn tại.' });
            }

            res.status(200).send({ message: 'Xóa bài viết thành công.' });
        } catch (e) {
            res.status(500).send({
                message: e.message
            });
        }
    },

    getPostById: async (req, res) => {
        try {
            const { id } = req.params;

            const post = await PostModel.findById(id);
            if (!post) {
                return res.status(404).send({ message: 'Bài viết không tồn tại.' });
            }

            res.status(200).send(post);
        } catch (e) {
            res.status(500).send({
                message: e.message
            });
        }
    },

    getPostsByAuthor: async (req, res) => {
        try {
            const { authorName } = req.query;

            const posts = await PostModel.find({ "author.name": authorName }).sort({ timestamp: -1 });
            if (!posts.length) {
                return res.status(404).send({ message: 'Không có bài viết nào từ tác giả này.' });
            }

            res.status(200).send(posts);
        } catch (e) {
            res.status(500).send({
                message: e.message
            });
        }
    }
};

export default PostController;
