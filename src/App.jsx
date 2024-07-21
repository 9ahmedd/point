import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import "./App.css"
import Servs from './pages/Services/Servs'
import Employment from './pages/Employment/Employment'
import Who from './pages/Who/Who'
import Phil from './pages/Philsophy/Phil'
import Creations from './pages/Creations/Creations'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/> } />
        <Route path='/servs' element={<Servs/> } />
        <Route path='/employment' element={<Employment/> } />
        <Route path='/who' element={<Who/> } />
        <Route path='/phil' element={<Phil/> } />
        <Route path='/creations' element={<Creations/> } />
    </Routes>
    </BrowserRouter>
  )
}

export default App