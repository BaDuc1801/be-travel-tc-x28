import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  img: {
    type: Object, 
    required: false,
    validate: {
      validator: function (value) {
        
        return !value || (value.url && value.alt);
      },
      message: 'Invalid image data',
    },
  },
  privacy: {
    type: String,
    enum: ['private', 'public'],
    required: true,
  },
  type: {
    type: String,
    enum: ['text', 'image'],
    required: true,
  },
  emotion: {
    type: String,
    required: false,
  },
  timestamp: {
    type: String,
    required: true,
  },
  location: String,
});

const PostModel = mongoose.model('Post', postSchema);

export default PostModel;
