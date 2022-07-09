// NEXT IMPORTS
import type { NextPage } from 'next';

// APOLLO
import { useQuery } from '@apollo/client';

// QUERY
import { FETCH_POSTS_QUERY } from '../graphql/queries';

// LOADER
import { CradleLoader, Circles } from 'react-loader-spinner';
import PostsGrid from '../src/components/PostsGrid/PostsGrid';



// THIS COMPONENT WILL ONLY BE DISPLAYED WHEN THE USER ACCESSES "/"
const Home: NextPage = () => {
  
  // WILL AUTOMATICALLY FETCH THIS IN THE SERVER BECAUSE I SET ssrMode: true IN THE APOLLO CLIENT
  // WHICH IS PROVIDED USING THE ApolloProvider COMPONENT WRAPPED AROUND _app.tsx
  const {loading, data} = useQuery(FETCH_POSTS_QUERY);
  
  return (
    <div className="">
      {/* <Head>
        <title>Postr</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet" />
      </Head> */}

      <main className={`h-full  w-full flex justify-center items-center ${loading ? "h-[70vh]" : ""}`}>

          {
            loading ? 
            <Circles 
              color="#00BFFF"
              height={100}
              width={100}
            />
            :
            <PostsGrid 
              posts={data.getPosts}
            />
          }

      </main>

      <footer className="">
        
      </footer>
    </div>
  )
}

export default Home;
