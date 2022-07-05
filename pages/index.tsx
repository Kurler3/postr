import type { NextPage } from 'next'
import Head from 'next/head';
import { useEffect } from 'react';

// THIS COMPONENT WILL ONLY BE DISPLAYED WHEN THE USER ACCESSES "/"
const Home: NextPage = () => {
  
  

  return (
    <div className="min-h-screen">
      <Head>
        <title>Postr</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet" />
      </Head>

      <main className="">

          <h1>POSTS!!!!!!!!!</h1>
      </main>

      <footer className="">
        
      </footer>
    </div>
  )
}

export default Home
