/**
 * Home component renders the main landing page of the application.
 *
 * @component
 * @returns {JSX.Element} The rendered Home page with a title.
 */
import React from "react";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <main className="main-content">
        <h1 className="home-title">HOME</h1>
      </main>
    </div>
  );
}

export default Home;
