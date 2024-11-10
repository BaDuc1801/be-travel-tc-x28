import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
  type: String,
  required: true,
  unique: true,
  trim: true
},
email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  match: [/.+@.+\..+/, 'Please enter a valid email']
},
password: {
  type: String,
  required: true
},
profilePic: {
  profilePicture: {
    type: String,
    default: 'default-profile-pic-url.jpg'
  },
  bannerImage: {
    type: String
  }
},
followers: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'users'
}],
following: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'users'
}],
posts: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'posts'
}],
settings: {
  privateAccount: {
    type: Boolean,
    default: false
  },
  notifications: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
    sms: { type: Boolean, default: false }
  }
},
createdAt: {
  type: Date,
  default: Date.now
},
updatedAt: {
  type: Date,
  default: Date.now
}
}, {
timestamps: true 
});
const userModel = mongoose.model('users', userSchema);

export default userModel;
