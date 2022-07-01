import commentsResolver from './commentsResolver';
import  postsResolvers  from './postsResolver';
import usersResolver from './usersResolver';

export default {
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