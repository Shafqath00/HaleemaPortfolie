import { useState } from 'react'
import Home from './pages/home'
import ProcessPage from './pages/processPage'
import './App.css'
import FooterPage from './pages/footerPage'
import Lenis from 'lenis'

function App() {

  // Initialize Lenis
  const lenis = new Lenis({
    autoRaf: true,
  });

  // Listen for the scroll event and log the event data
  lenis.on('scroll', (e) => {
    // console.log(e);
  });

  return (
    <>
      <div>
        <Home />
        <ProcessPage />
        <FooterPage />
      </div>
    </>
  )
}

export default App
