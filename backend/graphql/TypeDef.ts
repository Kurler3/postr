import { gql } from "apollo-server-express";

// TYPE DEFS
const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`;


export default typeDefs;