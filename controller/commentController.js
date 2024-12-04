import commentModel from "../model/comment.schema.js";
import userModel from "../model/user.schema.js";

const commentController = {
    likeComment: async (req, res) => {
        const { userId, commentId } = req.body;  // Extract userId and commentId from request body

        try {
            // Find the user and the comment by their IDs
            const user = await userModel.findById(userId);
            const comment = await commentModel.findById(commentId);

            // Check if the user or the comment does not exist
            if (!user || !comment) {
                return res.status(404).json({ message: 'User or Comment not found' });
            }

            // Check if the user has already liked the comment
            if (!user.likedComments.includes(commentId)) {
                // User hasn't liked the comment yet, add it to their likedComments array
                await userModel.findByIdAndUpdate(userId, {
                    $push: { likedComments: commentId },  // Add the commentId to likedComments array
                });

                // Increment the like count on the comment
                await commentModel.findByIdAndUpdate(commentId, {
                    $inc: { count: 1 },  // Increment like count by 1
                });

                return res.status(200).json({ message: 'Comment liked' });
            }

            // If the user has already liked the comment, remove the like
            await userModel.findByIdAndUpdate(userId, {
                $pull: { likedComments: commentId },  // Remove the commentId from likedComments array
            });

            // Decrement the like count on the comment
            await commentModel.findByIdAndUpdate(commentId, {
                $inc: { count: -1 },  // Decrement like count by 1
            });

            return res.status(200).json({ message: 'Comment unliked' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error liking/unliking comment', error: error.message });
        }
    },

    replyToComment : async (req, res) => {
        const { userId, commentId, content } = req.body;  // Extract userId, commentId, and reply content

        try {
            // Create a new reply comment
            const reply = new commentModel({
                content,
                author: userId,  // Set the userId as the author of the reply
                timestamp: new Date(),
            });

            // Save the reply comment
            await reply.save();

            // Use findByIdAndUpdate to add the new reply to the parent comment's replies array
            await commentModel.findByIdAndUpdate(
                commentId,  // Find the parent comment by its ID
                {
                    $push: { replies: reply._id },  // Push the reply's _id into the replies array
                },
                { new: true }  // Return the updated document
            );

            // Return the reply as the response
            res.status(201).json({ message: 'Reply added', reply });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding reply', error: error.message });
        }
    }
}

export default commentController;