import { useState } from 'react'
import './App.css'
import './utility.css'
import Navbar from './components/Navbar'
import Body from './components/body'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Body/>
    <Footer/>
    </>
  )
}

export default App
