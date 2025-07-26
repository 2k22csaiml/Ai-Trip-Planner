import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace(
        '{NAME}',
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <div className="w-full">
      <img
        src={photoUrl ? photoUrl : '/placeholder.jpg'}
        alt="Destination"
        className="w-full h-[340px] object-cover rounded-2xl shadow-md"
      />
      <div className="my-6 flex flex-col gap-4">
        <h2 className="font-bold text-2xl text-gray-800">
          {trip?.userSelection?.location?.label}
        </h2>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-1 bg-gray-100 rounded-full text-gray-600 text-sm shadow-sm">
            📅 {trip.userSelection?.noOfDays} Day(s)
          </span>
          <span className="px-4 py-1 bg-gray-100 rounded-full text-gray-600 text-sm shadow-sm">
            💰 {trip.userSelection?.budget} Budget
          </span>
          <span className="px-4 py-1 bg-gray-100 rounded-full text-gray-600 text-sm shadow-sm">
            👥 {trip.userSelection?.traveler} Traveler(s)
          </span>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
