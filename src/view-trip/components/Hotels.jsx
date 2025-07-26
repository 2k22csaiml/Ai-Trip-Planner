import React from 'react';
import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  return (
    <div className="mt-10 px-4">
      <h2 className="font-bold text-2xl text-center md:text-left mb-6 text-gray-800">
        🏨 Hotel Recommendations
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
