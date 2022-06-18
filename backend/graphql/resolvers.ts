import Post from "../mongodb/models/Post";


const resolvers = {
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
}

export default resolvers;
