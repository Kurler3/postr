import type { NextPage } from 'next'
import Head from 'next/head';
import { useEffect } from 'react';

// THIS COMPONENT WILL ONLY BE DISPLAYED WHEN THE USER ACCESSES "/"
const Home: NextPage = ({user}) => {
  
  console.log("USER: ", user);
  

  return (
    <div className="min-h-screen">
      <Head>
        <title>Postr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
          <h1>Hello world lol</h1>
      </main>

      <footer className="">
        
      </footer>
    </div>
  )
}

export default Home
