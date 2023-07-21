import React, { useState } from 'react';
import Hotels from './Hotels';
import Restaurants from './Restaurants';
import "../../style/HandR.css"
 

export default function HandR() {
  const [page, setPage] = useState('hotels');
  const [hotelsClicked, setHotelsClicked] = useState(false);
  const [restaurantsClicked, setRestaurantsClicked] = useState(false);

  const handleHotelsClick = () => {
    setPage('hotels');
    setHotelsClicked(true);
    setRestaurantsClicked(false);
  };

  const handleRestaurantsClick = () => {
    setPage('restaurants');
    setHotelsClicked(false);
    setRestaurantsClicked(true);
  };

  return (
      <div>
        <div className="buttons_div">
          <button
            className={`my-button ${hotelsClicked ? 'hotels-button-clicked' : ''}`}
            onClick={handleHotelsClick}
          >
            Hotels
          </button>
          <button
            className={`my-button ${restaurantsClicked ? 'restaurants-button-clicked' : ''}`}
            onClick={handleRestaurantsClick}
          >
            Restaurants
          </button>
        </div>
        {page === 'hotels' ? (
          <Hotels />
        ) : page === 'restaurants' ? (
          <Restaurants />
        ) : (
          <div></div>
        )}
      </div>
  );
}