import { PostType } from '../../../types/postTypes';
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