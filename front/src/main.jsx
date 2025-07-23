/**
 * Entry point for the React application.
 *
 * - Wraps the application in React's StrictMode for highlighting potential problems.
 * - Uses BrowserRouter to enable client-side routing.
 * - Renders the main App component into the DOM element with id "root".
 *
 * Dependencies:
 * - React 18+ (for createRoot API)
 * - react-router-dom (for BrowserRouter)
 * - index.css for global styles
 * - App.jsx as the main application component
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
