import  postsResolvers  from './postsResolver';

export default {
    // QUERIES
    Query: {
        ...postsResolvers.Query,
    },

    // MUTATIONS
    Mutation: {
        
    }
};