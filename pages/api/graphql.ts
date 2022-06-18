import { ApolloServer } from 'apollo-server-micro'
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core';
import { NextApiRequest, NextApiResponse } from 'next';
import resolvers from '../../backend/graphql/resolvers';
import typeDefs from '../../backend/graphql/TypeDef';
import Cors from 'micro-cors';
import connectDb from '../../backend/mongodb/mongoose';


// NOT INSIDE THE HANDLER FUNCTION BECAUSE ONLY NEED TO CONNECT TO MONGODB ONCE!
connectDb();


// CONFIG FOR LETTING DATA THROUGH BODY
export const config = {
    api: {
        bodyParser: false,
        externalResolver: false,
    },
}

// INITIALIZE ALLOW CROSS ORIGIN 
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
export default cors(async(req: NextApiRequest, res: NextApiResponse) => {
   
    try {
        if(req.method === "OPTIONS") {
            res.end();
            return false;
        }
    
        // START SERVER
        await startServer;
    
        // CREATE HANDLER
        await server.createHandler({path: '/api/graphql'})(req, res);     
    } catch (error) {
        console.log("BIG PROBLEM");
        
    }
   


});







