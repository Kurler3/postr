import { gql } from "apollo-server-micro";

// TYPE DEFS
const typeDefs = gql`

    # LIKE TYPE
    type Like {
        id: ID!
        username: String!
        createdAt: String!
    }

    # COMMENT TYPE
    type Comment {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
        likes: [Like]!
        dislikes: [Like]!
        voteCount: Int!
    }

    # POST TYPE
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        likesCount: Int!
        commentsCount: Int!
    }

    # USER TYPE
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    # REGISTER INPUT
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    # QUERIES
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }

    # MUTATIONS
    type Mutation {
        # USER
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        # POST
        createPost(body:String!):Post!
        deletePost(postId: ID!): Post!
        # COMMENT
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likeComment(postId: ID!, commentId: ID!):Post!
        dislikeComment(postId: ID!, commentId:ID!):Post!
        # LIKE
        likePost(postId: ID!): Post!
    }
`;


export default typeDefs;