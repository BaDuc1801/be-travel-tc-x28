import commentModel from "../model/comment.schema.js";
import userModel from "../model/user.schema.js";

const commentController = {
    likeComment: async (req, res) => {
        const { userId, commentId } = req.body;  

        try {
            const user = await userModel.findById(userId);
            const comment = await commentModel.findById(commentId);

            if (!user || !comment) {
                return res.status(404).json({ message: 'User or Comment not found' });
            }

            if (!user.likedComments.includes(commentId)) {
                await userModel.findByIdAndUpdate(userId, {
                    $push: { likedComments: commentId }, 
                });

                await commentModel.findByIdAndUpdate(commentId, {
                    $inc: { count: 1 },  
                });

                return res.status(200).json({ message: 'Comment liked' });
            }

            await userModel.findByIdAndUpdate(userId, {
                $pull: { likedComments: commentId },  
            });

            await commentModel.findByIdAndUpdate(commentId, {
                $inc: { count: -1 },  
            });

            return res.status(200).json({ message: 'Comment unliked' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error liking/unliking comment', error: error.message });
        }
    },

    replyToComment : async (req, res) => {
        const { userId, commentId, content } = req.body;  

        try {
            const reply = new commentModel({
                content,
                author: userId,  
                timestamp: new Date(),
            });
            await reply.save();
            await commentModel.findByIdAndUpdate(
                commentId, 
                {
                    $push: { replies: reply._id },  
                },
                { new: true } 
            );

            res.status(201).json({ message: 'Reply added', reply });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding reply', error: error.message });
        }
    }
}

export default commentController;