import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
    };
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="rounded-xl shadow-md bg-white dark:bg-gray-900 hover:shadow-xl transition-transform duration-300 hover:scale-105">
        <img
          src={photoUrl ? photoUrl : '/placeholder.jpg'}
          alt="Trip Destination"
          className="w-full h-[220px] object-cover rounded-t-xl"
        />
        <div className="p-4 space-y-1">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {trip?.userSelection?.location?.label}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {trip?.userSelection?.noOfDays} Days trip with ₹{trip?.userSelection?.budget} budget
          </p>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
