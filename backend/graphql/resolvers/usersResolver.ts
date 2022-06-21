import { RegisterInput } from "../../../types/userTypes";

// PASSWORD HASHING LIBRARY
import bcrypt from 'bcryptjs';
// JSON WEB TOKEN
import jwt from 'jsonwebtoken';
import User from "../../mongodb/models/User";

export default {
    Mutation: {
        // REGISTER USER MUTATION
        register: async (_, args: {registerInput: RegisterInput}, context, info) => {
            // DESTRUCTURE
            let {username, password, confirmPassword, email} = args.registerInput;

            //TODO: VALIDATE USER DATA

            //TODO: CHECK IF USERNAME IS UNIQUE

            //TODO: HASH PASSWORD
            let hashedPassword = await bcrypt.hash(password, 12);

            // CREATE NEW USER
            let newUser = new User({
                username,
                email,
                // PASSWORD IS HASHED NOW!
                password: hashedPassword,
                createdAt: new Date().toISOString(),
            });
            

            
            //TODO: CREATE AUTH TOKEN (JWT TOKEN)

            


        }
    }
}