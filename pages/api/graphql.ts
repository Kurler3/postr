import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import resolvers from '../../backend/graphql/resolvers';
import typeDefs from '../../backend/graphql/TypeDef';

// CREATE THE SERVER WITH THE TYPE DEFS AND THE RESOLVERS
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// TO USE TO START THE SERVER INSIDE THE HANDLER FUNCTION
const startServer = server.start();

// HANDLER FUNCTION (NEEDS TO BE LIKE THIS FOR NEXT.JS API ROUTES)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // WAIT FOR THE SERVER TO START
    await startServer;
    // TELL NEXT.JS WHAT THE PATH IS
    await server.createHandler({
        path: "/api/graphql",
    })(req, res);
}


// CONFIG FOR LETTING DATA THROUGH BODY
export const config = {
    api: {
        bodyParser: false,
    },
}



