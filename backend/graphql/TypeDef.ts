import { gql } from "apollo-server-micro";

// TYPE DEFS
const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }

    type Query {
        getPosts: [Post]
    }
`;


export default typeDefs;