import bcrypt from 'bcrypt';
import userModel from '../model/user.schema.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.SECRETKEY;

const authService = {
    registerUser: async (name, email, password) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = userModel.create({
        email,
        password: hashedPassword,
        name: name,
      });
      return newUser;
    },
    loginUser: async (email, password) => {
      const user = await userModel.findOne({ email });
      if (!user) {
        throw new Error("Invalid email or password");
      }
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (!checkPassword) {
        throw new Error("Invalid email or password");
      }
  
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            token: token
        }
    };
    },
  };
  

export default authService;
