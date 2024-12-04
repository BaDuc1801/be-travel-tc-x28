import mongoose from 'mongoose';

// Define the comment schema to use within the post schema
const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Reference to users model
    required: true,
  },
  count: {
    type: Number,
    required: false,
    default: 0 
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  replies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments', 
    required: false,
  },
});

const commentModel = new mongoose.model('comments', commentSchema);

export default commentModel