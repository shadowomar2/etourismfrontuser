import React , { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../style/card.css"
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';

function Card(props) {
  const cardStyle = {
    border: `1px solid black`,
    borderRadius: '10px',
    overflow: 'hidden',
    width: '18rem'
  };
  const [imgIndex, setImgIndex] = useState(0);
  const handleMouseEnter = () => {
    let timeoutId = null;
    const delay = 800;  
  
    timeoutId = setTimeout(() => {

      setImgIndex((prevIndex) => (prevIndex + 1) % props.imgSrc.length);
    }, delay);
  
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  };
  
  const handleMouseLeave = () => {
    setImgIndex(0);
  };
  return (
    <MDBCard style={{height: '35rem', maxWidth: '42rem', backgroundColor: '#222222' }} className="shadow p-3 mb-5 bg-white rounded">
      <MDBCardImage style={{minHeight: '15rem'}} src={props.imgSrc[imgIndex]} position='top' alt='...'   onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave} />
      <MDBCardBody className="bg-light">
        <MDBCardTitle className="fw-bold mb-3">{props.title}</MDBCardTitle>
        <MDBCardText   >{props.description.slice(0, 40)}{props.description.length > 40 ? '...' : ''}</MDBCardText>
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0 fw-bold">{props.price+" $"}</p>
          <p className="m-0">{props.location}</p>
        </div>
        <button className="button-78" href={props.link} onClick={props.onClick} >{props.buttonText}</button>
      </MDBCardBody>
    </MDBCard>
  );
}

export default Card;