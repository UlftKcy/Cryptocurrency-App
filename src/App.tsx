import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CoinDetail from "./pages/CoinDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path=":uuid" element={<CoinDetail/>}/>
      </Routes>
    </Router>
  )
}

export default App
