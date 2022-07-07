// STYLES
import '../styles/css/globals.css'
// PROPS
import type { AppProps } from 'next/app'
// APOLLO
import { ApolloProvider } from '@apollo/client';
import client from '../src/components/ApolloClient';

// NAVBAR
import Navbar from '../src/components/Navbar';

// HEAD
import Head from 'next/head';

// REACT LOADER CSS
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// THIS COMPONENT CONTAINS THE ENTIRE APP (THIS IS THE APP ROOT)
// ANY CODE WRITEN INSIDE THE RETURN WILL BE DISPLAYED IN EVERY SINGLE PAGE.
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Postr</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet" />
      </Head>
      {/* NAVBAR */}
      <Navbar />

      {/* COMPONENT */}
      <Component {...pageProps} user={null}/>

    </ApolloProvider>
  )
}

export default MyApp;
