import Post from "../../mongodb/models/Post";

export default {
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
        }
    }
};