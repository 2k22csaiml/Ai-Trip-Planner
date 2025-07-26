import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.place
    }
    const result = await GetPlaceDetails(data).then(resp => {
      console.log(resp.data.places[0].photos[3].name)
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
      setPhotoUrl(PhotoUrl)
    })
  }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.place} target='_blank'>
      <div className='shadow-md border border-gray-200 rounded-2xl p-4 mt-4 flex gap-4 hover:scale-[1.02] hover:shadow-lg cursor-pointer transition-all duration-300 ease-in-out'>
        <img
          src={photoUrl ? photoUrl : '/placeholder.jpg'}
          alt=""
          className='w-[130px] h-[130px] rounded-2xl object-cover shadow-sm'
        />
        <div>
          <h2 className='font-semibold text-lg text-gray-800'>{place.place}</h2>
          <p className='text-sm text-gray-500'>{place.details}</p>
          <h2 className='text-xs font-medium mt-2 text-gray-600'>🏷️ Ticket: {place.ticket_pricing}</h2>
          {/* <Button size="sm"><FaMapLocationDot /></Button> */}
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem
