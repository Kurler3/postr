import { NextApiRequest } from "next";
import Post from "../../mongodb/models/Post";
import checkAuth from "../../../util/check-auth";
import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { PostLike } from "../../../types/postTypes";

export default {
    // QUERIES
    Query: {
        // GET ALL POSTS
        getPosts: async () => {
            // USE POST MODEL TO FETCH POSTS
            try {
                // FETCHES ALL POSTS
                let posts = await Post.find().sort({createdAt: -1});
                return posts;
            } catch (error) {
                console.log("Error fetching all posts: ", error);
                throw new Error(error!.toString());
            }
        },

        // GET SPECIFIC POST
        getPost: async (_:null, args: {postId: string|number}) => {
            try {
                // DESTRUCTURE POST ID FROM ARGUMENT
                let {postId} = args; 
                // FIND POST IN DB BY ID
                let post = await Post.findById(postId);

                // IF THE POST EXISTS, JUST RETURN IT
                if(post) {
                    return post;
                }
                // ELSE THROW ERROR
                else {
                    throw new Error('Post not found');
                }
            } catch (error) {
                console.log("Error fetching single post");
                throw new Error(error!.toString());
            }
        }
    },

    // MUTATIONS
    Mutation: {

        // CREATE POST
        createPost: async (_:null, args: {body: string}, context: {req:NextApiRequest}) => {
            
            // MAKE SURE THE USER IS AUTHENTICATED BEFORE CREATING A POST (USING JWT)
            let authenticatedUser = checkAuth(context);

            // IF AUTHENTICATED, THEN RESUME CREATION OF POST, OTHERWISE
            // checkAuth FUNCTION WILL THROW ERROR
            if(authenticatedUser) {

                try {
                    
                    // CREATE POST
                    let newPost = new Post({
                        body: args.body,
                        user: authenticatedUser.id,
                        createdAt: new Date().toISOString(),
                        username: authenticatedUser.username,
                        comments: [],
                        liked: [],
                    });
                    
                    // SAVE IT
                    let savedPost = await newPost.save();

                    return savedPost;
                    
                } catch (error) {
                    throw new Error(`Creation of post failed :( because of ${error}`);
                }
            }
            else {
                console.log("User not authenticated :/");
            }
        },

        // DELETE POST
        deletePost: async (_:null, args: {postId: string|number}, context: {req:NextApiRequest}) => {
            let authenticatedUser = checkAuth(context);

            // IF AUTHENTICATED
            if(authenticatedUser) {

                try {

                    // FIND POST IN DB
                    let post = await Post.findById(args.postId);

                    // IF NOT, THEN THROW ERROR
                    // IF IT IS, THEN DELETE FROM DB
                    // CHECK IF POST USERNAME is THIS USERS USERNAME
                    if(post.username===authenticatedUser.username) {
                        // DELETE
                        await post.delete();

                        return "Post deleted successfully";
                    }
                    else {
                        throw new AuthenticationError("Not allowed to delete posts that aren't yours");
                    }
                    
                } catch (error) {
                    throw new Error(`Error deleting post because: ${error}`);
                }
            }
            else {
                console.log('Need auth to delete post :)');
            }

        },

        // LIKE POST
        likePost: async (_:null, args: {postId: string|number}, context:{req:NextApiRequest}) => {

            // CHECK AUTH
            let authenticatedUser = checkAuth(context);

            // IF AUTHENTICATED
            if(authenticatedUser) {

                // FIND POST
                let post = await Post.findById(args.postId);

                if(!post) {
                    throw new UserInputError("Post not found :(");
                }

                // ADD TO POSTS LIKES
                let likeIndex = post.likes.findIndex((like: PostLike) => like.username === authenticatedUser!.username);

                // IF WAS LIKED, THEN REMOVE THE LIKE
                if(likeIndex > -1) {
                    post.likes.splice(likeIndex, 1);
                }  
                // WAS NOT LIKED, SO PUSH TO LIKES ARRAY
                else {
                    post.likes.push({
                        username: authenticatedUser.username,
                        createdAt: new Date().toISOString(),
                    });
                }

                // UPDATE POST
                await post.save();

                // RETURN NEW POST
                return post;
                
            } else {
                console.log("User not authenticated :/");
            }
        }
    }
};