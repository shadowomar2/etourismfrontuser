import { useState, useEffect } from "react";
import "../style/nav.css";
import { Link } from "react-router-dom";
import logo from "../assets/crew/122.png";
import image from "./download.png";
import AOS from "aos";
import "aos/dist/aos.css";
import soundEffect from "./click.mp3";
import "bootstrap/dist/css/bootstrap.css";
import "animate.css";
import { fetchData } from '../axios_URL';
const Navbar = ({ isAuthenticated }) => {
  
  const [audio] = useState(new Audio(soundEffect));
  const [name, setName] = useState("");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchData("GET", "/user/getname", null, null)
        .then((response) => setName(response.data))
        .catch((error) => console.error(error));
    }
  }, []);
 
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    const links = document.querySelectorAll(".nav-menu ul li a");
    links.forEach((link) => {
      link.addEventListener("click", playSoundEffect);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", playSoundEffect);
      });
    };
  }, []);

  const playSoundEffect = () => {
    audio.currentTime = 0;
    audio.play();
  };

  const setActiveLink = (e) => {
    const links = document.getElementsByTagName("a");
    Array.from(links).forEach((el) => el.classList.remove("active"));
    const lis = document.querySelectorAll(".nav-menu ul li");
    lis.forEach((li) => {
      li.classList.remove("active", "chosen");
    });
    const li = e.currentTarget.closest("li");
    li.classList.add("active", "chosen");
  };

  return (
    <>
   
      <header id="header" className="fixed-top ">
        <div className="container-fluid  navbur">
          <div className="navi">
            
            <div className="col-xl-12 d-flex align-items-center lefty">
              
              <h5 className="ld-flex mr-auto devman">
                <Link to="/home" className="ld-flex mr-auto devman">
                <img src={image} alt="" className="rotate-image" />
                  <div className="animate__animated  animate__rubberBand icon-font ">
                    <span className="animate__animated     ">R E H L A</span>
                  </div>
                </Link>
              </h5>
              <nav className="nav-menu  mainMenu">
                <ul className="liftUL">
                  <li
                    className="active"
                    data-aos="fade-down"
                    data-aos-duration="300"
                    onClick={setActiveLink}
                  >
                    <Link to="/home">Home</Link>
                  </li>
                  {isAuthenticated ? (
                    <>
                      <li
                        data-aos="fade-down"
                        data-aos-duration="600"
                        onClick={setActiveLink}
                      >
                        <Link to="/tours">Tours</Link>
                      </li>

                      <li
                        data-aos="fade-down"
                        data-aos-duration="900"
                        onClick={setActiveLink}
                      >
                        <Link to="/hotels">Hotels&Restaurants</Link>
                      </li>
                      <li
                        data-aos="fade-down"
                        data-aos-duration="1200"
                        onClick={setActiveLink}
                      >
                        <Link to="/events">Events</Link>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  <li
                    data-aos="fade-down"
                    data-aos-duration="1500"
                    onClick={setActiveLink}
                  >
                    <Link to="/about">About</Link>
                  </li>

                  <li
                    data-aos="fade-down"
                    data-aos-duration="1800"
                    onClick={setActiveLink}
                  >
                    <Link to="/contact_us">Contact Us</Link>
                  </li>
                </ul>
              </nav>
              <nav className="nav-menu    navlogin">
                <ul className="rightUL">
                  {isAuthenticated ? (
                    <>
                      <li
                        data-aos="fade-down"
                        data-aos-duration="2100"
                        onClick={setActiveLink}
                      >
                        <Link to="/logout">Logout</Link>
                      </li>
                      <li
                        data-aos="fade-down"
                        data-aos-duration="2100"
                        onClick={setActiveLink}
                      >
                        <Link to="/user">{name}</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li
                        data-aos="fade-down"
                        data-aos-duration="2100"
                        onClick={setActiveLink}
                        className="right-links"
                      >
                        <Link to="/signup">Sign Up</Link>
                      </li>
                      <li
                        data-aos="fade-down"
                        data-aos-duration="2400"
                        onClick={setActiveLink}
                        className="right-links"
                      >
                        <Link to="/login">Log In</Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
              <div className="left-btns">
                <div className="left-btns">
                  <div className=" " id="theme-button2">
                    <input id="toggle" className="toggle" type="checkbox" />
                  </div>

                  <div className=" " id="theme-button">
                    <Link to="#" className="menuBtn">
                      <span className="lines"></span>
                    </Link>
                  </div>
                </div>

                <div className=" " id="theme-button">
                  <Link to="#" className="menuBtn">
                    <span className="lines"></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
