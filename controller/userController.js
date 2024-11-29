// TODO: fix getUserInfo api and add more route

import userModel from "../model/user.schema.js";
import authService from "../services/authService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import mongoose from "mongoose";

const JWT_SECRET = process.env.SECRETKEY;

const userController = {
  registerUser: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const user = await authService.registerUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const checkPassword = bcrypt.compareSync(password, user.password);
      if (!checkPassword) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        token: token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message || "Login failed" });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const userInfo = await userModel.find()
      res.status(200).send(userInfo)
    } catch (e) {
      res.status(500).send({
        message: e.message,
      });
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const userId = req.params.id;
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ message: "Invalid user ID" });
      }

      const user = await userModel.findById(userId);

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      res.status(200).send(user);
    } catch (e) {
      console.log(e);
      res.status(500).send({
        message: e.message,
      });
    }
  },
  createNewUser: async (req, res) => {
    try {
      const { name, email, password, profilePic } = req.body;
      const existingUser = userModel.findOne({ $or: [{ email }, { name }] });
      if (existingUser) {
        console.log("User already exists");
        return res.status(400).send("User already exists");
      }
    } catch (error) {
      console.log("create new user error:", e);
    }
  },

  updateUserInfo: async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedData = req.body;

      const existingUser = await userModel.findById(userId);
      if (!existingUser) {
        return res.status(404).send("User not found!");
      }
      const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, {new:true})

      return res.status(200).send(updatedUser)
    } catch (e) {
      res.status(500).send(e)
      console.log("update user error:", e);
    }
  },
};

export default userController;
