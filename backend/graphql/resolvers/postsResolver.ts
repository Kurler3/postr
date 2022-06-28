import { NextApiRequest } from "next";
import Post from "../../mongodb/models/Post";
import checkAuth from "../../../util/check-auth";

export default {
    // QUERIES
    Query: {
        // GET ALL POSTS
        getPosts: async () => {
            // USE POST MODEL TO FETCH POSTS
            try {
                // FETCHES ALL POSTS
                let posts = await Post.find();
                return posts;
            } catch (error) {
                console.log("Error fetching all posts: ", error);
                throw new Error(error!.toString());
            }
        },

        // GET SPECIFIC POST
        getPost: async (_, args: {postId: string|number}) => {
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
                throw new Error(error);
            }
        }
    },

    // MUTATIONS
    Mutation: {

        // CREATE POST
        createPost: async (_, args: {body: string}, context: {req:NextApiRequest}) => {
            
            // MAKE SURE THE USER IS AUTHENTICATED BEFORE CREATING A POST (USING JWT)
            let authenticatedUser = checkAuth(context);

            

        },

        // DELETE POST
        deletePost: async (_, args: {postId: string|number}) => {
            
        }
    }
};