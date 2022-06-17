import { gql } from "apollo-server-micro";

// TYPE DEFS
const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`;





export default typeDefs;