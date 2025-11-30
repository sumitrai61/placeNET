import { useState } from 'react'
import './css/App.css'
import './css/utility.css'
import Navbar from './components/Navbar'
import Body from './components/body'
import Footer from './components/Footer'
import JuniorStudent from './components/JuniorStudent'
import SeniorStudent from './components/SeniorStudent'
import Liveplacements from './components/LivePlacements'
import Experiences from './components/Experiences'
import { Route, Routes } from 'react-router-dom'
import Features from './components/Features'
import PlaceCoordinator from './components/PlaceCoordinator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Navbar/>
    <Body/>
    <Footer/> */}
    {/* <JuniorStudent/> */}
    <Routes>
    <Route path="/" element={<><Features/><JuniorStudent  /></>} />
    <Route path="/live" element={<><Features/><Liveplacements  /></>} />
    <Route path="/experiences" element={<><Features/><Experiences  /></>} />
    </Routes>
    {/* <Experiences/> */}
    {/* <SeniorStudent/> */}
    {/* <PlaceCoordinator/> */}
    </>
  )
}

export default App
