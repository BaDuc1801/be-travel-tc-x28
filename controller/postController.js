import PostModel from '../model/postmodel.js';
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';
import userModel from '../model/user.schema.js';
dotenv.config();

const getCloudinaryConfig = JSON.parse(process.env.CLOUD_DINARY_CONFIG);
cloudinary.config(getCloudinaryConfig);

const postController = {
  uploadImgItem: async (req, res) => {
    let imgs = req.files;
    let postId = req.params.id;
    let item = await PostModel.findOne({ _id: postId });

    if (item) {
      if (imgs && imgs.length > 0) {
        try {
          const listResult = [];
          for (let file of imgs) {
            const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            const fileName = file.originalname.split('.')[0];

            const result = await cloudinary.uploader.upload(dataUrl, {
              public_id: fileName,
              resource_type: 'auto',
            });

            listResult.push(result.url);
          }

          let rss = await PostModel.findByIdAndUpdate({ _id: postId }, { img: listResult });
          return res.json({ message: 'Tệp được tải lên thành công.', rss });
        } catch (err) {
          return res.status(500).json({ error: 'Lỗi khi upload hình ảnh.', err });
        }
      } else {
        return res.status(400).json({
          message: 'Không có tệp được tải lên.'
        });
      }
    } else {
      return res.status(404).json({
        message: 'Item không tồn tại.'
      });
    }
  },

  createPostForUser: async (req, res) => {
    try {
      const { content, privacy, type, emotion, timestamp, userId, location } = req.body;

      if (!content) {
        return res.status(400).json({ message: 'Nội dung bài viết là bắt buộc.' });
      }
      if (!privacy || (privacy !== 'private' && privacy !== 'public')) {
        return res.status(400).json({ message: 'Giá trị privacy không hợp lệ.' });
      }
      if (!type || (type !== 'text' && type !== 'image')) {
        return res.status(400).json({ message: 'Giá trị type không hợp lệ.' });
      }
      if (!timestamp) {
        return res.status(400).json({ message: 'Timestamp không được để trống.' });
      }

      const newPost = new PostModel({
        content,
        privacy,
        type,
        emotion,
        location,
        timestamp,
        author: userId
      });

      await newPost.save();

      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại.' });
      }

      user.posts.push(newPost._id);

      await user.save();

      res.status(201).json({
        message: 'Tạo bài viết thành công và thêm vào người dùng.',
        post: newPost,
        user: user,
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
    }
  },

  getAllPost: async (req, res) => {
    const all = await PostModel.find({}).populate('author', 'name profilePic.profilePicture').sort({ timestamp: -1 });
    res.status(200).send(all);
  },

  deletePostById: async (req, res) => {
    const { postId } = req.params;

    try {
      const deletedPost = await PostModel.findByIdAndDelete(postId);

      if (!deletedPost) {
        return res.status(404).json({ message: 'Bài viết không tồn tại.' });
      }

      await userModel.updateMany(
        { posts: postId },
        { $pull: { posts: postId } }
      );

      return res.status(200).json({ message: 'Bài viết đã được xóa thành công', post: deletedPost });
    } catch (error) {
      return res.status(500).json({ message: 'Lỗi khi xóa bài viết: ' + error.message });
    }
  },

  likePost: async (req, res) => {
    const { userId, postId } = req.body;

    try {
      const user = await userModel.findById(userId);
      const post = await PostModel.findById(postId);

      if (!user || !post) {
        return res.status(404).json({ message: 'User or Post not found' });
      }

      if (!user.likedPosts.includes(postId)) {
        user.likedPosts.push(postId);
        await user.save();
        return res.status(200).json({ message: 'Post liked' });
      }

      user.likedPosts = user.likedPosts.filter(id => id !== postId);
      await user.save();
      return res.status(200).json({ message: 'Post unliked' });
    } catch (error) {
      return res.status(500).json({ message: 'Error liking post', error: error.message });
    }
  },

  bookmarkPost: async (req, res) => {
    const { userId, postId } = req.body;

    try {
      const user = await userModel.findById(userId);
      const post = await PostModel.findById(postId);

      if (!user || !post) {
        return res.status(404).json({ message: 'User or Post not found' });
      }

      if (!user.bookmarkedPosts.includes(postId)) {
        user.bookmarkedPosts.push(postId);
        await user.save();
        return res.status(200).json({ message: 'Post bookmarked' });
      }

      user.bookmarkedPosts = user.bookmarkedPosts.filter(id => id !== postId);
      await user.save();
      return res.status(200).json({ message: 'Post unbookmarked' });
    } catch (error) {
      return res.status(500).json({ message: 'Error bookmarking post', error: error.message });
    }
  },
}

export default postController

