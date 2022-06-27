import { gql } from "apollo-server-micro";

// TYPE DEFS
const typeDefs = gql`

    # POST TYPE
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
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
    }

    # MUTATIONS
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
    }
`;


export default typeDefs;