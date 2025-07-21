import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <main className="main-content">
        <h1 className="home-title">HOME</h1>
      </main>
    </div>
  );
}

export default Home;
