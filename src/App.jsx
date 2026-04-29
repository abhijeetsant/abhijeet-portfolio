import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import SIOKIProject1 from './components/SIOKIProject1'
import LucidProject from './components/LucidProject'
import SpecterProject from './components/SpecterProject'
import Specter from './components/Specter'
import CustomCursor from './CustomCursor'

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/sioki" element={<SIOKIProject1 />} />
        <Route path="/projects/lucid" element={<LucidProject />} />
        <Route path="/projects/specter" element={<SpecterProject />} />
        <Route path="/specter" element={<Specter />} />
      </Routes>
    </BrowserRouter>
  )
}
