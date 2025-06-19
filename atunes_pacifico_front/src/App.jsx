import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Products from './components/Products/Products'
import Footer from './components/Footer/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar/>
        <Hero/>
        <Products/>
        <Footer/>
      </div>
    </>
  )
}

export default App
