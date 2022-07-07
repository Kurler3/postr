import { gql } from "@apollo/client";

// FETCH INITIAL POSTS QUERY
export const FETCH_POSTS_QUERY = gql`
    query listPosts { 
        getPosts {
            id
            body 
            commentsCount
            likesCount 
            likes {
                username
            }
            username
            createdAt
        }
    }
`;