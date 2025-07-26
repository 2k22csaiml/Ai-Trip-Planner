import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
  return (
    <div className="mt-6">
      <h2 className='font-bold text-2xl text-gray-800 mb-4'>📍 Places to Visit</h2>

      <div className="space-y-8">
        {trip.tripData?.itinerary.map((item, index) => (
          <div key={index} className="space-y-4">
            <h2 className='font-semibold text-lg text-blue-700'>{item.day}</h2>

            <div className='grid md:grid-cols-2 gap-6'>
              {item.plan.map((place, idx) => (
                <div key={idx} className='space-y-2'>
                  <h3 className='font-medium text-sm text-orange-600'>{place.time}</h3>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
