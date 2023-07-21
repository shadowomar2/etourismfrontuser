import React, { useState } from "react";
import "../../style/about.css";
import Lottie from "react-lottie";
import animationData from "./142985-contact-us-transparent-girl-customer-service.json";
import "bootstrap/dist/css/bootstrap.css";

function Contactus() {
 
    return (
      <>
        <div className="signup-container">
          <div >
            <Lottie
              style={{
                position: "absolute",
                zIndex: -1,
                top: -100,
                right: 400,
                width: "80%",
                height: "80%",
                pointerEvents: "none",
              }}
              options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
              }}
            />
          </div>
          <div className="signup-form-container">
           
          <span id="heading"> Contact US</span>
            <p>
              We ensure that you get the best prices and options for your
              flight, and that your flight search experience is fun and simple.
              We value your time, and we always strive to provide the easiest
              way to book and pay, by providing different and secure payment
              options.
              
            </p>
          </div>
        </div>
      </>
    );
  }
 

export default Contactus;
