import React from 'react';
import { Container } from 'react-bootstrap';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
  
        <div className="copywrite">
          <p>
            © {new Date().getFullYear()} All rights reserved | E_Tourism REHLA
          </p>
        </div>
 
    </footer>
  );
}

export default Footer;