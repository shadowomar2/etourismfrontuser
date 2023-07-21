// Import Statement
import "../style/homepage.css";
import background from "../Components/background";
import myImage from "./download2.gif";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
 
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
// Homepage Component
export default function Homepage({ isAuthenticated }) {


  const [props, set] = useSpring(() => ({
    transform: "scale(1)",
    boxShadow: "0px 0px 0px rgba(0,0,0,0.2)",
    config: { mass: 1, tension: 500, friction: 35 },
  }));
  return (
    // Homepage
      <div className="base">
          
      
      <div className="homepage">
        {/* Homepage Text */}
        <div className="home-text">
          <span id="heading">Start your tourism trip</span>

          <p>
            Tours, tourist places, hotels, restaurants, offers, remote
            reservations, and many other services.
          </p>
        </div>
        <div className="header-img">
          <img src={myImage} alt="My Image" />
        </div>
              {!isAuthenticated ? (
                  <Link to="/login">
                      <button className="explore-btn">&ensp; JoinUs &ensp;</button>
                  </Link>
              ) : (<></>)}
      
      </div>
    </div>
  );
}
