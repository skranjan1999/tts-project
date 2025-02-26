import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import './App.css'
import Navbar from "./components/Navbar";
import Result from "./pages/Result";
import Footer from "./components/Footer";
import Login from "./components/Login";

function App() {


  return (
    <div className="main-container">
      <Navbar />
      {/* {showLogin && <Login />} */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
