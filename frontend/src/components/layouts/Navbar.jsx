import React from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-16 bg-white shadow-md border-b border-gray-200 backdrop-blur-sm px-4 md:px-8 sticky top-0 z-50'>
      <div className='container mx-auto flex items-center justify-between gap-5 h-full'>
        <Link to='/dashboard'>
          <h2 className='text-xl md:text-2xl font-semibold text-gray-800 hover:text-orange-500 transition-colors duration-200'>
            Interview Prep AI
          </h2>
        </Link>
        <ProfileInfoCard />
      </div>
    </div>
  )
}

export default Navbar
