import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import { AuthenticationError } from 'apollo-server-micro';

export default (context: {req:NextApiRequest}) => {
    let authHeader = context.req.headers.authorization;

    // IF WE AUTH HEADERS DEFINED
    if(authHeader) {
        // WILL HAVE FORMAT OF "Bearer ......"
        let token = authHeader.split("Bearer ")[1];

        // IF TOKEN EXISTS, VERIFY IT
        if(token) {
            try {
                // VERIFY IF THE TOKEN IS OK
                let user = jwt.verify(token, process.env.JWT_SECRET_KEY!);

                return user;
            } catch (error) {
                console.log("User not authenticated");

                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        // NO TOKEN
        else {
            throw new Error('Authentication token must be \'Bearer [token]');
        }
    } 
    // NO AUTH HEADER
    else {
        throw new Error('Authentication header must be provided');
    }
}