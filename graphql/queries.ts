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
                id
                createdAt
            }
            comments {
                id
                body
                username
                createdAt
                likes {
                    id
                    username
                    createdAt
                }
                dislikes {
                    id
                    username
                    createdAt
                }
                voteCount
            }
            username
            createdAt
        }
    }
`;

// FETCH ARRAY OF ALL POSTS IDS
export const FETCH_POSTS_IDS = gql`
    query listPostsIds {
        getPosts {
            id
        }
    }
`