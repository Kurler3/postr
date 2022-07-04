import mongoose, { model, Schema} from 'mongoose';

// DEFINE USER SCHEMA

// CAN MAKE THESE FIELDS REQUIRED HERE, BUT SINCE USING GRAPHQL, WE CAN JUST DEFINE IT AS REQUIRED IN THOSE TYPES INSTEAD.
const userSchema = new Schema({
    // USERNAME
    username: String,
    // PASSWORD
    password: String,
    // EMAIL
    email: String,
    // CREATED AT
    createdAt: String,
});

const modelToReturn = mongoose.models.User || model("User", userSchema);

export default modelToReturn;