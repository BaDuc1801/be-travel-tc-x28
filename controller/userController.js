// import { Request, Response } from 'express'
import authService from '../services/authService.js'

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
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = await authService.loginUser(email, password);
      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  },
  getAllUsers: async (req, res) => {
    try {
      userInfo = userModel.find()
      res.status(200).send(userInfo)
    } catch (e) {
      res.status(500).send({
        message: e.message
      })
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const userParam = req.params.user;

      const user = await userModel.findOne({
        $or: [
          { name: userParam },
          { __id: userParam }
        ]
      })

      if (!user) {
        return res.status(404).send({ message: 'User not found' })
      }

      res.status(200).send(user)
    }
    catch (e) {
      console.log(e)
      res.status(500).send({
        message: e.message
      })
    }
  },
  createNewUser: async (req, res) => {
    try {
      const { name, email, password, profilePic } = req.body;
      const existingUser = userModel.findOne({ $or: [{ email }, { name }] })
      if (existingUser) {
        console.log("User already exists")
        return res.status(400).send("User already exists");
      }
    } catch (error) {

    }
  }

};

export default userController;
