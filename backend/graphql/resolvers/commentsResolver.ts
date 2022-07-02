import { NextApiRequest } from "next";
import checkAuth from "../../../util/check-auth";
import { UserInputError, AuthenticationError } from "apollo-server-micro";
import Post from "../../mongodb/models/Post";
import { PostComment } from "../../../types/postTypes";


export default {
    Mutation: {

        // CREATE COMMENT
        createComment: async (_:null, args: {postId: string|number,body: string}, context: {req: NextApiRequest}) => {

            // CHECK AUTH
            let authenticatedUser = checkAuth(context);

            // IF NOT NULL
            if(authenticatedUser) {

                // CHECK IF BODY IS NOT EMPTY
                if(args.body.trim().length === 0) {
                    throw new UserInputError('Empty comment', {
                        errors: {
                            body: 'Comment body must not be empty',
                        },
                    });
                }

                // CHECK IF POST EXISTS,
                let post = await Post.findById(args.postId);
                
                if(!post) {
                    throw new UserInputError("Post not found");
                }
                
                // UPDATE POST DOCUMENT IN MONGODB WITH NEW COMMENT
                post.comments.unshift({
                    body: args.body,
                    username: authenticatedUser.username,
                    createdAt: new Date().toISOString(),
                });

                // UPDATE POST
                await post.save();


                // RETURN POST
                return post;

            } else {
                // HERE ONLY NEED TO LOG BECAUSE IF AUTH FAILS, AN ERROR WILL BE THROWN IN checkAuth FUNCTION
                console.log("Not Authenticated :(");
            }
            
        },

        // DELETE COMMENT
        deleteComment: async (_:null, args: {postId: string|number, commentId: string|number},context: {req: NextApiRequest}) => { 

            // CHECK AUTH
            let authenticatedUser = checkAuth(context);

            // IF AUTHENTICATED
            if(authenticatedUser) {

                // CHECK IF POST EXISTS
                let post = await Post.findById(args.postId);

                if(!post) {
                    throw new UserInputError("Post not found");
                }

                // DELETE 
                let commentIndex = post.comments.find((comment:PostComment) => comment.id === args.commentId);

                if(commentIndex === -1) {
                    throw new UserInputError("Comment not found");
                }   
                else if(post.comments[commentIndex].username !== authenticatedUser.username) {
                    
                    // DO NOT NEED TO SEND ERRORS OBJECT TO FRONT-END BECAUSE
                    // THE USER WILL NEVER GET A DELETE BUTTON IF THE COMMENT IS NOT THEIRS.
                    throw new AuthenticationError("Can't remove comments not made by you!");
                }

                // REMOVE FROM COMMENTS ARRAY
                post.comments.splice(commentIndex, 1);

                // UPDATE POST
                await post.save();

                // RETURN 
                return post;
            } else {    
                console.log("User not authenticated :/");
            }


        }
    }
}