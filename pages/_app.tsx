import '../styles/css/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import client from '../src/components/ApolloProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp;
