import { NextApiRequest } from "next";
import checkAuth from "../../../util/check-auth";
import { UserInputError, AuthenticationError } from "apollo-server-micro";
import Post from "../../mongodb/models/Post";
import { PostComment, PostLike } from "../../../types/postTypes";
import {v4 as uuid} from "uuid";


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

                // INIT NEW COMMENT
                let newComment = {
                    id: uuid(),
                    body: args.body,
                    username: authenticatedUser.username,
                    createdAt: new Date().toISOString(),
                    likes: [],
                    dislikes: [],
                };

                console.log("NewComment: ", newComment)

                // UPDATE POST DOCUMENT IN MONGODB WITH NEW COMMENT
                post.comments.unshift(newComment);

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


        },

        // LIKE COMMENT
        likeComment: async (_:null, args: {postId: string|number, commentId: string|number},context: {req: NextApiRequest}) => {

            let loggedUser = checkAuth(context);

            // IF LOGGED
            if(loggedUser) {
                
                // FIND THE POST BEING EDITED
                let post = await Post.findById(args.postId);

                console.log("PostComment: ", post)

                // IF POST NOT FOUND IN DB
                if(!post) throw new UserInputError("Post not found!");
                
                // FIND COMMENT IN THE POST
                let commentInPostIndex = post.comments.findIndex((comment:PostComment) => comment.id === args.commentId);

                // IF EXISTS
                if(post.comments && post.comments[commentInPostIndex]) {
                    // INIT COMMENT WITH THE INDEX
                    let commentInPost = post.comments[commentInPostIndex];

                    // INIT NEW LIKES ARRAY
                    let newLikes = commentInPost.likes ?? [];


                    // IF USER IS IN LIKES ARRAY, THEN REMOVE IT
                    if(newLikes.find((like:PostLike) => like.username === loggedUser!.username)) {
                        // FILTER OUT THE LIKE INSIDE THE COMMENT
                        newLikes = newLikes.filter((like: PostLike) => like.username!==loggedUser!.username);
                    }
                    // OTHERWISE ADD ID
                    else {
                        // PUSH NEW LIKE
                        newLikes.push({
                            id: uuid(),
                            username: loggedUser.username,
                            createdAt: new Date().toISOString(),
                        });
                    }
                    
                    // COPY THE POST COMMENTS
                    let newComments = post.comments;

                    // ASSIGN NEW LIKES ARRAY TO COMMENT
                    commentInPost.likes = newLikes;

                    // SUBSTITUTE NEW COMMENT IN THE INDEX OF THE COMMENT
                    newComments[commentInPostIndex] = commentInPost;

                    console.log("Post: ", post);

                    post.comments = newComments;

                    // RETURN POST WITH NEW COMMENTS ARRAY
                    return post;
                    
                } else {
                    throw new UserInputError("Comment doesnt exist :(");
                }


            } else {
                console.log("Not authorized to like comment :/"); 
            }

        },

        // DISLIKE COMMENT
        dislikeComment: async (_:null, args: {postId: string|number, commentId: string|number},context: {req: NextApiRequest}) => {

            // CHECK AUTH
            let loggedUser = checkAuth(context);

            // IF AUTH THEN CONTINUE
            if(loggedUser) {

                // GET POST
                let post = await Post.findById(args.postId);

                // IF CANT FIND POST THROW ERROR
                if(!post) {
                    throw new UserInputError("Post not found :(");
                }

                // FIND COMMENT INDEX IN POST COMMENTS
                let commentInPostIndex = post.comments.findIndex((comment:PostComment) => comment.id === args.commentId);

                // IF EXISTS
                if(commentInPostIndex > -1) {

                    // INIT
                    let commentInPost = post.comments[commentInPostIndex] as PostComment;
                    
                    let newDislikes = commentInPost.dislikes ?? [];

                    // TRY FIND INDEX OF USER IN DISLIKES
                    let userDislikeIndex = newDislikes.findIndex((dislike:PostLike) => dislike.username === loggedUser!.username);

                    // IF WAS ALREADY IN DISLIKES ARRAY, THEN REMOVE USER FROM IT
                    if(userDislikeIndex > -1) {

                        newDislikes.splice(userDislikeIndex, 1);

                    }
                    // ELSE PUSH IT TO THE DISLIKES ARRAY
                    else {
                        newDislikes.push({
                            id: uuid(),
                            username: loggedUser.username,
                            createdAt: new Date().toISOString(),
                        });
                    }

                    // INIT NEW COMMENTS ARRAY
                    let newComments = post.comments;

                    // UPDATE COMMENT WITH NEW DISLIKES ARRAY :)
                    newComments[commentInPostIndex] = {
                        ...commentInPost,
                        dislikes: newDislikes,
                    };

                    // RETURN POST WITH UPDATED COMMENTS
                    return {
                          ...post,
                        comments: newComments,
                    };

                }
                else {
                    throw new UserInputError("Comment not found :(");
                }

            } 
            // LOG ERROR
            else {
                console.log("Not authorized to like comment :/");
            }
        }
    }
}