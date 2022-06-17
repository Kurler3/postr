import { ApolloServer } from 'apollo-server-micro';
import resolvers from './resolvers';
import typeDefs from './TypeDef';

// CREATE THE SERVER WITH THE TYPE DEFS AND THE RESOLVERS
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// CONFIG FOR LETTING DATA THROUGH BODY
export const config = {
    api: {
        bodyParser: false,
    },
}


// START THE SERVER
server.start().then(() => {
    return server.createHandler({path: "/api/graphql"});
})



