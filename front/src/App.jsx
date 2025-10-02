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
import "./styles/accessibility.css";
import Home from "./views/Home";
import MisTurnos from "./views/MisTurnos";
import Register from "./views/Register";
import Login from "./views/Login";
import CreateAppointment from "./views/CreateAppointment";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <div className="App">
          <a href="#main-content" className="skip-link">
            Saltar al contenido principal
          </a>
          <Navbar />
          <main id="main-content" role="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mis-turnos" element={<MisTurnos />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/agendar-cita" element={<CreateAppointment />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
