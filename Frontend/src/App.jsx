import './css/App.css'
import './css/utility.css'
import Navbar from './components/Navbar'
import Body from './components/body'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import JuniorStudent from './components/JuniorStudent'
import SeniorStudent from './components/SeniorStudent'
import PlaceCoordinator from './components/PlaceCoordinator'
import Liveplacements from './components/LivePlacements'
import Experiences from './components/Experiences'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<><Navbar /><Body /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
        <Route path="/junior" element={<JuniorStudent />} />
        <Route path="/senior" element={<SeniorStudent />} />
        <Route path="/pc" element={<PlaceCoordinator />} />
        <Route path="/live" element={<Liveplacements />} />
        <Route path="/experiences" element={<Experiences />} />
      </Routes>
      
    </>
  )
}

export default App
