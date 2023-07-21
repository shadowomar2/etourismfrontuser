import React, { useState, useEffect } from "react";
import "../../style/booking_tour.css";
import "bootstrap/dist/css/bootstrap.css";
import { fetchData } from "../../axios_URL";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faClock,
  faMoneyBillAlt,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { BACKEND_URL, Imagefitch_URL } from "../../Endpoint";
import ImageGallery from "react-image-gallery";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "react-image-gallery/styles/css/image-gallery.css";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Booking_event() {
  const [event, setevent] = useState({});
  const id = useParams().id;
  const [book, setbook] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);


  
  useEffect(() => {
    fetchData("get", `http://localhost:8081/user/events/${id}`)
      .then((response) => setevent(response.data))
      .catch((error) => console.error(error));
   
    
  }, []);
 
  const handleSubmitComment = (e) => {
    e.preventDefault();
    fetchData("POST", "http://localhost:8081/user/addeventsComment", {
      comment,
      id: parseInt(id),
    })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })

      .catch((error) => console.error(error));
  };
  useEffect(() => {
    fetchData("get", `http://localhost:8081/user/geteventsComment/${id}`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error(error));
  }, []);
  const handleBooking = () => {
    fetchData("POST", `http://localhost:8081/user/bookevent/${id}`)
      .then((response) => setbook(response.data))
      .catch((error) => console.error(error));

    setShowModal(false);
  };

  const position = [event.latitude, event.longitude];

  return (
    <div className="container ">
 
      <h2 className="title ">{event?.name}</h2>
      <hr className="my-5" />
      <div className="row">
        <div className="col-md-4 mb-2">
          <h2 style={{ borderBottom: "1px solid black" }}>Images</h2>
          <div className="tour-image">
        
            <ImageGallery
             className="gall"
             items={
              event && event.images
                ? event.images.map((image) => ({
                    original: BACKEND_URL+Imagefitch_URL + image.imageURL,
                    thumbnail: BACKEND_URL +Imagefitch_URL+ image.imageURL,
                  }))
                : []
            }
                showNav={true}
                renderLeftNav={(onClick, disabled) => (
                  <button type="button" disabled={disabled} onClick={onClick}style={{backgroundColor: "transparent"}}>
                    <FaArrowLeft size={30} color="#e05d06" />
                  </button>
                )}
                renderRightNav={(onClick, disabled) => (
                  <button  type="button"  disabled={disabled} onClick={onClick}style={{backgroundColor: "transparent"}}>
                    <FaArrowRight size={30} color="#e05d06" />
                  </button>
                )}
                thumbnailPosition={"bottom"}
               
                renderItem={(item) => (
                  <img src={item.original} alt={item.originalAlt} className="gallery-image"/>
              )}
             
              />

            <div className="m-4"></div>
            <hr className="my-5" />
            <h2>Map</h2>
            {event.latitude && event.longitude ? (
              <MapContainer
                scrollWheelZoom={false}
                style={{ height: "400px" }}
                center={[event.latitude, event.longitude]}
                zoom="10"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={position}>
                  <Popup>{event?.place}</Popup>
                </Marker>
              </MapContainer>
            ) : null}
          </div>
        </div>

        <div className="col-md-8 mb-2 p-5">
          <h2>Info</h2>
          <div className="d-flex align-items-center my-3">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 p-2" />
            <strong>place:</strong>
            <p className="m-4 info-text">{event?.place}</p>
          </div>
          <div className="d-flex align-items-center my-3">
            <FontAwesomeIcon icon={faClock} className="mr-2 p-2" />
            <strong>Time:</strong>
            <p className="m-4 info-text">
              from {event?.starttime} to {event?.endtime}
            </p>
          </div>
          <div className="d-flex align-items-center my-3">
            <FontAwesomeIcon icon={faMoneyBillAlt} className="mr-2 p-2" />
            <strong>price:</strong>
            <p className="m-4 info-text">${event?.price}</p>
          </div>
          <div className="d-flex align-items-center my-3">
            <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 p-2" />
            <strong>Phone Number :</strong>
            <p className="m-4 info-text">{event?.phonenumber}</p>
          </div>
          <div className="d-flex align-items-center my-3">
            <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 p-2" />
            <strong>Phone Number 2:</strong>
            <p className="m-4 info-text">{event?.phonenumber2}</p>
          </div>
          <hr className="my-5" />
          {book !== "ok" && (
            <button
              className="btn btn-primary mt-3  m-2 "
              onClick={() => setShowModal(true)}
            >
              Book Now
            </button>
          )}
          {showModal && (
            <div className="my-modal" style={{ zIndex: 10 }}>
              <div className="modal-content">
                <h3 className="display-5">Confirm Booking</h3>
                <p className="h4">Are you sure you want to book this event?</p>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary m-2"
                    onClick={handleBooking}
                  >
                    Yes
                  </button>
                  <button
                    className="btn btn-secondary m-2"
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
          {book === "ok" && (
            <button className="btn btn-secondary mt-3" disabled="true">
              Booked
            </button>
          )}
        </div>
      </div>

      <hr className="my-5" />

      <div className="row pb-5 ">
        <div className="col-md-10">
          <h2 className="h3"> Details</h2>

          <strong className="description-text  ">Description :</strong>
          <div className="d-flex justify-content-between">
            <p className="description-text text-dark">{event?.description}</p>
            <div>
              <p className="mb-2 text-dark">
                <strong>Distance:</strong> {event?.tripdistance} km
              </p>
              <p className="mb-2 text-dark">
                <strong>Last Date to Book:</strong> {event?.lastdatetobook}
              </p>
              <p className="mb-2 text-dark">
                <strong>Maximum Booking:</strong> {event?.maximumbooking}
              </p>
              <p className="mb-2 text-dark">
                <strong>Owner Name:</strong> {event?.ownername}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <h2>Comments</h2>
        <form onSubmit={handleSubmitComment}>
          <div className="form-group">
            {" "}
            <label htmlFor="comment">Add a comment:</label>
            <textarea
              className="form-control"
              id="comment"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>{" "}
          </div>{" "}
          <button type="submit" className="btn btn-primary">
            {" "}
            Submit{" "}
          </button>
        </form>

        {comments && comments.length > 0 ? (
          comments.map((item, index) => (
            <div key={index} className="card my-3">
              <div className="card-body">
                <p>{item.comment}</p>
                <small>By {item.name}</small>
              </div>
            </div>
          ))
        ) : (
          <div className="card my-3"></div>
        )}
      </div>
    </div>
  );
}
