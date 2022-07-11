import React from 'react';

// WILL EXPORT A JSX ELEMENT THAT WRAPS THE ENTIRE APP
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

// APOLLO AUTH CONTEXT
import {setContext} from '@apollo/client/link/context';
import { USER_TOKEN } from '../../util/constants';
import { RequestHandler } from 'micro';


// AUTH
export const authLink = setContext(() => {
    let token = localStorage.getItem(USER_TOKEN);

    // SET AUTH HEADER
    return {
        headers: {
            Authorization: token ? `Bearer: ${token}` : '',
        }
    };
});

// HTTP LINK
const httpLink = createHttpLink({
    uri: "http://localhost:3000/api/graphql",
});


const client = new ApolloClient({
    // SET SERVER SIDE RENDERING 
    ssrMode: true,
    link: authLink.concat(httpLink) as any,
    cache: new InMemoryCache(),
    
});

export default client;