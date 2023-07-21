import React, { useState } from "react";
import "../../style/Signup.css";
import Lottie from "react-lottie";
import animationData from "./plane-ticket.json";
import "bootstrap/dist/css/bootstrap.css";

function About() {
  {
    return (
       
        <div className="signup-container">
          <div className="signup-img">
            <Lottie
              style={{
                position: "absolute",
                zIndex: -1,
                top: -200,
                right: 300,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
              options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
              }}
            />
          </div>
          <div className="signup-form-container ">
            <span id="heading"> Welcome to the Tourism search site</span>

            <p>
              We offer you the best options to travel and enjoy an unforgettable
              travel experience anywhere in the world. We work hard to provide
              flight search services at reasonable prices and high quality. We
              believe that travel should be fun and easy, and that's why we're
              constantly improving our site to make that happen. The site allows
              users to search for flights from different airlines and different
              travel companies, by entering the required flight information,
              such as the departure and arrival city and flight dates. We ensure
              that you get the best prices and options for your flight, and that
              your flight search experience is fun and simple. We value your
              time, and we always strive to provide the easiest way to book and
              pay, by providing different and secure payment options.
            </p>
          </div>
        </div>
   
    );
  }
}

export default About;
