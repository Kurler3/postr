import { PostComment, PostType } from '../../../types/postTypes';
import commentsResolver from './commentsResolver';
import  postsResolvers  from './postsResolver';
import usersResolver from './usersResolver';

export default {

    // MODIFIERS 
    // (everytime a query/mutation/subscription returns the same type defined here
    // it will modify the data)

    // POST MODIFIER
    Post: {
        likesCount: (parent:PostType) => {
            return parent.likes.length;
        },
        commentsCount: (parent: PostType) => {
            return parent.comments.length;
        }
    },

    Comment: {
        voteCount: (parent:PostComment) => {

            let likesCount = parent.likes ? parent.likes.length : 0;
            let dislikesCount = parent.dislikes ? parent.dislikes.length : 0;

            return likesCount - dislikesCount;
        }   
    },

    // QUERIES
    Query: {
        ...postsResolvers.Query,
    },

    // MUTATIONS
    Mutation: {
        ...usersResolver.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolver.Mutation,
    }
};