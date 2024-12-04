import commentModel from "../model/comment.schema.js";
import userModel from "../model/user.schema.js";

const commentController = {
    likeComment : async (req, res) => {
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
      
      replyToComment: async (req, res) => {
        const { userId, commentId, content } = req.body;  // Extract userId, commentId, and content from request body

        try {
            // Find the user and the original comment by their IDs
            const user = await userModel.findById(userId);
            const originalComment = await commentModel.findById(commentId);

            // Check if the user or the original comment does not exist
            if (!user || !originalComment) {
                return res.status(404).json({ message: 'User or Comment not found' });
            }

            // Create the new reply comment
            const newReply = new commentModel({
                content,
                author: userId,
                replyTo: commentId,  // Set the replyTo field to the ID of the original comment
            });

            // Save the new reply
            await newReply.save();

            // Optionally, you can add the reply comment ID to the `replies` array of the original comment
            await commentModel.findByIdAndUpdate(commentId, {
                $push: { replies: newReply._id }  // Optionally, maintain an array of replies on the original comment
            });

            return res.status(201).json({ message: 'Reply added successfully', reply: newReply });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error replying to comment', error: error.message });
        }
    } 
}

export default commentController;