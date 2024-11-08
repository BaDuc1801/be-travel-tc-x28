import bcrypt from 'bcrypt'
import userModel from "../model/userDetails.schema.js";


const userDetailsController = {
    getAllUsers: async(req,res) => {
        try {
            userInfo = userModel.find()
            res.status(200).send(userInfo)
        } catch (e) {
            res.status(500).send({
                message: e.message
            })
        }
    },
    getUserInfo: async(req,res) => {
        try {
            const userParam = req.params.user;

            const user = await userModel.findOne({
                $or: [
                    {username: userParam},
                    {__id: userParam}
                ]
            })

            if(!user) {
                return res.status(404).send({message: 'User not found'})
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
    createNewUser: async(req, res) => {
        try {
            const {username, email, password, profilePic} = req.body;
            const existingUser = userModel.findOne({$or: [{email}, {username}]})
            if(existingUser) {
                console.log("User already exists")
                return res.status(400).send("User already exists");
            }
        } catch (error) {
            
        }
    }

}

export default userDetailsController;