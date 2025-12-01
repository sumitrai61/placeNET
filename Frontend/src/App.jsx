import './css/App.css'
import './css/utility.css'
import Navbar from './components/Navbar'
import Body from './components/body'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
