import { Route, Routes } from "react-router-dom"
//pages
import Currencies from "./pages/Currencies"
import Main from "./pages/Main"
import Price from "./pages/Price"
//components
import Nav from "./components/Nav"
//css
import "./style.css"

export default function App() {
  return (
    <div className="App">
        <Nav/>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/price/:symbol" element={<Price/>}/>
            <Route path="/currencies" element={<Currencies/>}/>

        </Routes>
    </div>
  )
}
