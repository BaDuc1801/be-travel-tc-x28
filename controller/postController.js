import PostModel from '../model/postmodel.js';
import Post from '../model/postmodel.js';

const postController = {
  createPost : async (req, res) => {
    try {
      const { content, img, privacy, type, author, emotion, timestamp } = req.body;

      if (!content) {
        return res.status(400).json({ message: 'Nội dung bài viết là bắt buộc.' });
      }
      if (!privacy || (privacy !== 'private' && privacy !== 'public')) {
        return res.status(400).json({ message: 'Giá trị privacy không hợp lệ.' });
      }
      if (!type || (type !== 'text' && type !== 'image')) {
        return res.status(400).json({ message: 'Giá trị type không hợp lệ.' });
      }
      if (!author || !author.name || !author.avatar) {
        return res.status(400).json({ message: 'Thông tin tác giả không đầy đủ.' });
      }
      if (!timestamp) {
        return res.status(400).json({ message: 'Timestamp không được để trống.' });
      }

      const newPost = new Post({
        content,
        img,
        privacy,
        type,
        author,
        emotion,
        timestamp,
      });

      await newPost.save();

      res.status(201).json({
        message: 'Tạo bài viết thành công!',
        post: newPost,
      });

    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Dữ liệu không hợp lệ', error: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Dữ liệu trùng lặp, không thể tạo bài viết.', error: error.message });
      }

      res.status(500).json({
        message: 'Lỗi không xác định khi tạo bài viết.',
        error: error.message,
      });
    };
  },

  getAllPost : async (req, res) => {
    const all = PostModel.find();
    res.status(200).send(all);
  },
  
}

export default postController

