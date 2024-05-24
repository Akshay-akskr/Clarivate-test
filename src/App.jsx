import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss'
import DashBoard from "./pages/Dashboard";
import Albumlist from "./pages/Albumlist";

function App() {

  return (
    <BrowserRouter>      
      <Routes>
        <Route exact path="/" element={<DashBoard />} />          
        <Route path="list" element={<Albumlist />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
