/**
 * Main application component that sets up routing and navigation.
 *
 * @component
 * @returns {JSX.Element} The rendered application with navigation and route handling.
 *
 * @example
 * // Renders the App component with navigation and routes for Home and MisTurnos views.
 * <App />
 *
 * @see {@link Home} for the home page component.
 * @see {@link MisTurnos} for the user's appointments page.
 * @see {@link Navbar} for the navigation bar component.
 */
import "./App.css";
import Home from "./views/Home";
import MisTurnos from "./views/MisTurnos";
import Register from "./views/Register";
import Login from "./views/Login";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mis-turnos" element={<MisTurnos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
