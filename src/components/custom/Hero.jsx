import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="flex flex-col items-center max-w-6xl mx-auto px-4 md:px-10 gap-10 py-16">
      
      <h1 className="font-extrabold text-[36px] md:text-[50px] text-center leading-tight">
        <span className="text-[#f56551]">Discover Your Next Adventure with AI:</span><br />
        <span className="text-gray-800">Personalized Itineraries at Your Fingertips</span>
      </h1>

      <p className="text-lg md:text-xl text-gray-600 text-center max-w-3xl">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

      <Link to="/create-trip">
        <Button className="px-8 py-3 rounded-full text-lg shadow-md bg-blue-600 hover:bg-blue-700 transition text-white">
          Get Started, It's Free
        </Button>
      </Link>

      <img
        src="/landing.png"
        alt="Landing"
        className="w-full max-w-3xl rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
      />
      
    </div>
  )
}

export default Hero
