import '../styles/css/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import client from '../src/components/ApolloClient';
import { useEffect } from 'react';

// THIS COMPONENT CONTAINS THE ENTIRE APP (THIS IS THE APP ROOT)
// ANY CODE WRITEN INSIDE THE RETURN WILL BE DISPLAYED IN EVERY SINGLE PAGE.
function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
      // CHECK FOR ANY JWT IN THE LOCAL STORAGE
  }, []);


  return (
    <ApolloProvider client={client}>

      {/* NAVBAR */}


      {/* COMPONENT */}
      <Component {...pageProps} user={null}/>
    </ApolloProvider>
  )
}

export default MyApp;
