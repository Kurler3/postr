// NEXT IMPORTS
import type { NextPage } from 'next';

// APOLLO
import { useQuery } from '@apollo/client';

// QUERY
import { FETCH_POSTS_QUERY } from '../graphql/queries';

// LOADER
import { CradleLoader, Circles } from 'react-loader-spinner';
import PostsGrid from '../src/components/PostsGrid/PostsGrid';

// USER
import { getUserState } from '../store/reducers/usersReducer';

// REACT
import React, { useEffect, useState } from 'react';

// POSTS FORM
import PostsForm from '../src/components/PostsForm/PostsForm';

// DISPATCH
import { useDispatch } from '../store/store';
// SELECTOR
import { useSelector } from '../store/store';

// ACTIONS FROM POSTS REDUCER
import { getPostsState, setPosts } from '../store/reducers/postsReducer';


// THIS COMPONENT WILL ONLY BE DISPLAYED WHEN THE USER ACCESSES "/"
const Home: NextPage = () => {

  // DISPATCH
  const dispatch = useDispatch();

  // USED TO SKIP QUERY
  const [skip, setSkip] = useState(false);

  // WILL AUTOMATICALLY FETCH THIS IN THE SERVER BECAUSE I SET ssrMode: true IN THE APOLLO CLIENT
  // WHICH IS PROVIDED USING THE ApolloProvider COMPONENT WRAPPED AROUND _app.tsx
  const {loading, data} = useQuery(FETCH_POSTS_QUERY, {skip});
  

  // GET USER
  const user = useSelector(getUserState);

  // GET POSTS
  const posts = useSelector(getPostsState);

  useEffect(() => {

    // IF NOT LOADING THEN ALREADY FETCHED DATA!
    if(!loading) {
      // SET SKIP TO TRUE AND DISPATCH NEW DATA!
      setSkip(true);
      // DISPATCH
      if(data) {
        dispatch(setPosts(data.getPosts));
      }
      
    }
   
  }, [loading]);

  
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
            <div className='flex flex-col w-full items-center'>

              {/* POST FORM */}
              {
                user.id &&
                
                <PostsForm 

                />
              }
              
              {/* POSTS GRID */}
              <PostsGrid 
                posts={posts}
              />
            </div>
            
          }

      </main>

      <footer className="">
        
      </footer>
    </div>
  )
}

export default Home;
