import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.name,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name},${hotel?.address}`}
      target="_blank"
    >
      <div className="hover:scale-[1.03] transition-transform duration-300 ease-in-out cursor-pointer mt-6 mb-8 shadow-md rounded-xl overflow-hidden bg-white">
        <img
          src={photoUrl ? photoUrl : '/placeholder.jpg'}
          alt={hotel?.name}
          className="h-48 w-full object-cover"
        />
        <div className="p-4 space-y-1">
          <h2 className="font-semibold text-lg text-foreground truncate">{hotel?.name}</h2>
          <p className="text-sm text-muted-foreground truncate">📍 {hotel?.address}</p>
          <p className="text-sm text-green-600 font-medium">💰 {hotel?.price}</p>
          <p className="text-sm text-yellow-500 font-medium">⭐ {hotel?.rating}</p>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
