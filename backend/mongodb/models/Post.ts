import mongoose, { model, Schema} from 'mongoose';

// DEFINE POST SCHEMA

// CAN MAKE THESE FIELDS REQUIRED HERE, BUT SINCE USING GRAPHQL, WE CAN JUST DEFINE IT AS REQUIRED IN THOSE TYPES INSTEAD.
const postSchema = new Schema({
    // BODY
    body: String,
    // USERNAME (UNIQUE FOR EACH USER)
    username: String,
    // CREATED AT
    createdAt: String,
    // COMMENTS
    comments: [{
        body: String,
        username: String,
        createdAt: String,
    }],
    // LIKES
    likes: [
        {
            username: String,
            createdAt: String,
        },
    ],
    // RELATION WITH OWNER OF POST
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

const modelToReturn = mongoose.models.Post || model("Post", postSchema);

export default modelToReturn;