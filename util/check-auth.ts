import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import { AuthenticationError } from 'apollo-server-micro';
import {UserJWT} from '../types/userTypes';

export default (context: {req:NextApiRequest}): UserJWT | undefined => {
    let authHeader = context.req.headers.authorization;

    try {
        // IF AUTH HEADERS DEFINED
        if(authHeader) {
            // WILL HAVE FORMAT OF "Bearer ......"
            let token = authHeader.split("Bearer: ")[1];

            // IF TOKEN EXISTS, VERIFY IT
            if(token) {
                try {
                    // VERIFY IF THE TOKEN IS OK
                    let user = jwt.verify(token, process.env.JWT_SECRET_KEY!);

                    return user as UserJWT;
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
            throw new Error('Authorization header must be provided');
        }    
    } catch (error) {
            throw new Error("No Auth Header :((");
    }
    
}