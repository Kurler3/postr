import '../styles/css/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import client from '../src/components/ApolloClient';
import { useEffect } from 'react';
import Navbar from '../src/components/Navbar';

// THIS COMPONENT CONTAINS THE ENTIRE APP (THIS IS THE APP ROOT)
// ANY CODE WRITEN INSIDE THE RETURN WILL BE DISPLAYED IN EVERY SINGLE PAGE.
function MyApp({ Component, pageProps }: AppProps) {



  return (
    <ApolloProvider client={client}>

      {/* NAVBAR */}
      <Navbar />

      {/* COMPONENT */}
      <Component {...pageProps} user={null}/>

    </ApolloProvider>
  )
}

export default MyApp;
