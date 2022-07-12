// STYLES
import '../styles/globals.css'
// PROPS
import type { AppProps } from 'next/app'
// APOLLO
import { ApolloProvider } from '@apollo/client';
import client from '../src/components/ApolloClient';

// NAVBAR
import Navbar from '../src/components/Navbar/Navbar';

// HEAD
import Head from 'next/head';

// REACT LOADER CSS
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// IMPORT REDUX PROVIDER
import {Provider} from 'react-redux';

// IMPORT STORE
import {store, useSelector} from '../store/store';


// THIS COMPONENT CONTAINS THE ENTIRE APP (THIS IS THE APP ROOT)
// ANY CODE WRITEN INSIDE THE RETURN WILL BE DISPLAYED IN EVERY SINGLE PAGE.
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Head>
          <title>Postr</title>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet" />
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600&family=Neucha&display=swap');
          </style>
        </Head>
        {/* NAVBAR */}
        <Navbar />

        {/* COMPONENT */}
        <Component {...pageProps}/>

      </Provider>
    </ApolloProvider>
  )
}

export default MyApp;
