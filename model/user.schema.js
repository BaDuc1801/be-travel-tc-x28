import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    pronoun: {
      type: String,
      default: "none",
    },
    cob: {
      type: String,
      default: "none",
    },
    nationality: {
      type: String,
      default: "none",
    },
    education: {
      type: Array,
      default: [],
    },
    dob: {
      type: String,
      default: "none",
    },
    workplaces: {
      type: Array,
      default: [],
    },
    relationship: {
      type: String,
      default: "none",
    },
    phone: {
      type: String,
      default: "none",
    },
    socials: {
      type: Array,
      default: [],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      profilePicture: {
        type: String,
        default:
          "https://res.cloudinary.com/dzpw9bihb/image/upload/v1726676632/wgbdsrflw8b1vdalkqht.jpg",
      },
      bannerImage: {
        type: String,
        default: "",
      },
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
    settings: {
      privateAccount: {
        type: Boolean,
        default: false,
      },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("users", userSchema);

export default userModel;
