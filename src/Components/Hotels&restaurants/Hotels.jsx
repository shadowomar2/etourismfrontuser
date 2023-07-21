import React, { useState, useEffect } from 'react';
import Card from '../Card';
import "../../style/Hotels.css";
import { MDBCard, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../axios_URL';
import { BACKEND_URL ,Imagefitch_URL} from '../../Endpoint';
import "animate.css";

export default function Hotels() {
  const [Hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetchData("GET", "/test/hotels", null, null)
      .then((response) => setHotels(response.data))
      .catch((error) => console.error(error));
  }, []);
 
  const indexOfLastTour = currentPage * eventsPerPage;
  const indexOfFirstTour = indexOfLastTour - eventsPerPage;
  const currentTours = Hotels.slice(indexOfFirstTour, indexOfLastTour);

  const totalPages = Math.ceil(Hotels.length / eventsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const keys = ["name"];
  
  const search = (data) => {
     
   return data.filter((item) =>
     keys.some((key) => item[key].toLowerCase().includes(query))
   );
 };
  return (
    
    <div className="container">
   <h1 className='text-center animate__animated animate__backInDown'>Hotels</h1>
   <input className="search"    placeholder="Search by Name"  onChange={(e) => setQuery(e.target.value.toLowerCase())} />
 
      <div className="row">
        {search(currentTours).map((event) => (
          <div className="col-sm-6 col-md-4" key={event.id}>
            <Card
               imgSrc={event.images.map(image => (BACKEND_URL+Imagefitch_URL+image.imageURL))}
              title={event.name}
              description={event.description}
              price={event.price}
              location={event.location}
              link="#"
              buttonText="Details"
              onClick={() => navigate(`/details_hotel/${event.id}`)}
            />        
          </div>
        ))}
             <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center mt-3">
          {Array.from({ length:    totalPages }).map((_, index) => (
            <li
              className={`page-item ${index + 1 === currentPage ? 'active' : null}`}
              key={index}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      </div>
 
    </div>
  );
}