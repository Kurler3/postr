import { gql } from "@apollo/client";

// REGISTER USER MUTATION
export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`

// LOGIN USER MUTATION
export const LOGIN_USER = gql`
    mutation loginUser(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username 
            password: $password
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`

// CREATE POST MUTATION
export const CREATE_POST = gql`
    mutation createPost(
        $body: String!
    ) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            likes {
                id
                username
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
            commentsCount
            likesCount
        }
    } 
`

// DELETE POST MUTATION
export const DELETE_POST = gql`
    mutation deletePost(
        $postId: ID!
    ) {
        deletePost(postId: $postId) {
            id
        }
    }
`

// LIKE/UNLIKE POST
export const LIKE_POST = gql`
    mutation likePost(
        $postId: ID!
    ) {
        likePost(postId: $postId) {
            id
            body
            createdAt
            username
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
            likes {
                id
                username
                createdAt
            }
            likesCount
            commentsCount        
        }
    }
`

// CREATE COMMENT MUTATION
export const CREATE_COMMENT = gql`
    mutation createComment(
        $postId: ID!
        $body: String!
    ) {
        createComment(postId: $postId, body: $body) {
            id
            body
            createdAt
            username
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
            likes {
                id
                username
                createdAt
            }
            likesCount
            commentsCount   
        }
    }
`

export const LIKE_COMMENT_MUTATION = gql`
    mutation likeComment(
        $postId: ID!
        $commentId: ID!
    ) {
        likeComment(
            postId: $postId
            commentId: $commentId
        ) {
            id
            body
            createdAt
            username
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
            likes {
                id
                username
                createdAt
            }
            likesCount
            commentsCount        
        }
    }
`


// LIKE/UNLIKE POST
export const DISLIKE_COMMENT_MUTATION = gql`
    mutation dislikePost(
        $postId: ID!
    ) {
        likePost(postId: $postId) {
            id
            body
            createdAt
            username
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
            likes {
                id
                username
                createdAt
            }
            likesCount
            commentsCount        
        }
    }
`


