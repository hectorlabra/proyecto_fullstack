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
import { ToastProvider } from "./context/ToastContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <ToastProvider>
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
        </ToastProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
