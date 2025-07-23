import "./App.css";
import Home from "./views/Home";
import MisTurnos from "./views/MisTurnos";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mis-turnos" element={<MisTurnos />} />
      </Routes>
    </div>
  );
}

export default App;
