import React from 'react';

// WILL EXPORT A JSX ELEMENT THAT WRAPS THE ENTIRE APP
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    // SET SERVER SIDE RENDERING 
    ssrMode: true,
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
});

export default client;