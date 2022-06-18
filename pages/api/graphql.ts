import { ApolloServer } from 'apollo-server-express'
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core';
import { NextApiRequest, NextApiResponse } from 'next';
import resolvers from '../../backend/graphql/resolvers';
import typeDefs from '../../backend/graphql/TypeDef';
import Cors from 'micro-cors';

import connectDb from '../../backend/mongoose';

const cors = Cors();

// CREATE THE SERVER WITH THE TYPE DEFS AND THE RESOLVERS
const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

// TO USE TO START THE SERVER INSIDE THE HANDLER FUNCTION
const startServer = server.start();


// HANDLER FUNCTION (NEEDS TO BE LIKE THIS FOR NEXT.JS API ROUTES)
export default cors(async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

        connectDb();

        // WAIT FOR THE SERVER TO START
        await startServer;
        // TELL NEXT.JS WHAT THE PATH IS
        await server.getMiddleware({
            path: "/api/graphql",
        })(req, res);    

    } catch (error) {
        console.log("Error starting GraphQL server: ", error);
    }
});



// CONFIG FOR LETTING DATA THROUGH BODY
export const config = {
    api: {
        bodyParser: false,
        externalResolver: false,
    },
}



