import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { AppContext } from "../context/AppContext";
import '../assets/tts-logo.png';

function Navbar() {


  function handleGoPremium(){



  }

  function handleLogin() {




  }


  
  const { user } = useContext(AppContext);

  const navigate = useNavigate();

  const { setShowLogin } = useContext(AppContext);

  return (
    <div className="nav-container">
      <Link to="/">
        <img src="tts-logo.png" alt="logo" className="nav-logo" />
      </Link>
      <div className="nav-right" >
           <p className="pricing" onClick={handleGoPremium}>Go Premium </p>
           <button className="login" onClick={handleLogin}>Login </button>

      </div>
      

      
    </div>
  );
}

export default Navbar;
