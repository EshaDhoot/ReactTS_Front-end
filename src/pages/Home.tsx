import React from 'react'
import Navbar from './Navbar';
import withAuth from './AuthChecker';
function Home() {
  return (
    <>
    <Navbar/>
      <h1>
        Welcome to Home Page.
      </h1>
    </>
  )
}

export default withAuth(Home);
