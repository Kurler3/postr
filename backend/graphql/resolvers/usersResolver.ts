import { RegisterInput, UserType } from "../../../types/userTypes";

// PASSWORD HASHING LIBRARY
import bcrypt from 'bcryptjs';
// JSON WEB TOKEN
import jwt from 'jsonwebtoken';
import User from "../../mongodb/models/User";

// IMPORT ERRORS FROM APOLLO
import { UserInputError } from "apollo-server-micro";
import { validateLoginInput, validateRegisterInput } from "../../../util/validators";


const generateToken = (user: UserType) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, process.env.JWT_SECRET_KEY!, {expiresIn: '1h'});
}

export default {
    Mutation: {
        // REGISTER USER MUTATION
        register: async (_, args: {registerInput: RegisterInput}, ) => {
            // DESTRUCTURE
            let {username, password, confirmPassword, email} = args.registerInput;

            //  VALIDATE USER DATA
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);

            if(!valid) {
                throw new UserInputError("Errors", {
                    errors
                });
            }

            // CHECK IF USERNAME IS UNIQUE AND EMAIL IS ALSO NOT TAKEN
            let userInDb = await User.findOne({$or: [{username},  {email}]});

            // IF USER EXISTS, THEN NEED TO RETURN ERROR
            if(userInDb) {
                let errors = userInDb.email === email ? {email: "This email is taken"} : {username: "This username is taken"};
                // PASS A TITLE TO THE ERROR, AND A PAYLOAD THAT WILL BE USED IN THE CLIENT
                throw new UserInputError('Username or email is taken', {
                    errors: errors,
                });
            }

            // HASH PASSWORD
            let hashedPassword = await bcrypt.hash(password, 12);

            // CREATE NEW USER
            let newUser = new User({
                username,
                email,
                // PASSWORD IS HASHED NOW!
                password: hashedPassword,
                createdAt: new Date().toISOString(),
            });
            
            // SAVE NEW USER AND GET RESULT
            let res = await newUser.save();
            
            // CREATE AUTH TOKEN (JWT TOKEN)
            // FIRST ARGUMENT IS WHAT DATA IS STORED IN THE TOKEN AND SECOND IS THE JWT TOKEN
            // THIRD ARGUMENT IS THE OPTIONS OBJECT, WHICH WE USE FOR SETTING THE EXPIRATION TIME
            let token = generateToken(res._doc);

            // NEED TO MAYBE STORE JWT TOKEN IN LOCAL STORAGE

            // SPREAD THE USER DATA + ID + TOKEN
            return {
                ...res._doc,
                id: res._id,
                token: token,
            }

        },
        // LOGIN USER MUTATION
        login: async (_, args: {username: string, password: string}) => {
            let {username, password} = args;

            // VALIDATION OF INPUT DATA
            let {valid, errors} = validateLoginInput(username, password);

            if(!valid) {
                throw new UserInputError("Errors", errors);
            }

            // CHECK IF USER EXISTS IN DB
            let user = await User.findOne({username})

            // DOES NOT EXIST
            if(!user) {
                errors.general = 'User not found';

                throw new UserInputError("User not found", errors);
            }

            // COMPARE PASSWORD INPUTTED TO ONE IN DB
            let isMatchPass = await bcrypt.compare(password, user.password);

            if(!isMatchPass) {
                errors.general = "Wrong credentials";

                throw new UserInputError("Wrong credentials", errors);
            }

            // CREATE NEW JWT TOKEN
            let token = generateToken(user);

            // SET IN LOCAL STORAGE

            // RETURN USER
            // SPREAD THE USER DATA + ID + TOKEN
            return {
                ...user._doc,
                id: user._id,
                token: token,
            }
        }
    }
}