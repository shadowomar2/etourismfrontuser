import React, { useState, useEffect } from 'react';
import Card from '../Card';
import "../../style/tours.css";
 
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../axios_URL';
import { BACKEND_URL, Imagefitch_URL } from '../../Endpoint';



export default function Tours() {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toursPerPage] = useState(6);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetchData("GET", "/user/alltours", null, null)
      .then((response) => setTours(response.data))
      .catch((error) => console.error(error));
  }, []);

  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);

  const totalPages = Math.ceil(tours.length / toursPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const keys = ["name"];
    
  const search = (data) => {
     
   return data.filter((item) =>
     keys.some((key) => item[key].toLowerCase().includes(query))
   );
 };
  return (
    <div className="container">
       <h1 className='text-center animate__animated animate__backInDown'>Tours</h1>
       <input className="search"    placeholder="Search by Name"  onChange={(e) => setQuery(e.target.value.toLowerCase())} />
 
      <div className="row">
        {search(currentTours).map((tour) => (
          <div className="col-sm-6 col-md-4" key={tour.id}>
            <Card
              imgSrc={tour.images.map(image => (BACKEND_URL+Imagefitch_URL+image.imageURL))}
              title={tour.name}
              description={tour.description}
              price={tour.price}
              location={tour.location}
              link="#"
              buttonText="Book Now"
              onClick={() => navigate(`/Book_tour/${tour.id}`)}
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