import { useState } from 'react'
import './css/App.css'
import './css/utility.css'
import Navbar from './components/Navbar'
import Body from './components/body'
import Footer from './components/Footer'
import JuniorStudent from './components/JuniorStudent'
import SeniorStudent from './components/SeniorStudent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Navbar/>
    <Body/>
    <Footer/> */}
    <JuniorStudent/>
    {/* <SeniorStudent/> */}
    </>
  )
}

export default App
