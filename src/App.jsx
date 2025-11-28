import { useState } from 'react'
import Home from './pages/home'
import ProcessPage from './pages/processPage'
import './App.css'
import FooterPage from './pages/footerPage'

function App() {
  const [count, setCount] = useState(0)

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
