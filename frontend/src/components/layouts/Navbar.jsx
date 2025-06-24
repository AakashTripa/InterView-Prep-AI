import React from 'react';
import ProfileInfoCard from '../Cards/ProfileInfoCard';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="h-16 bg-gradient-to-br from-sky-50 via-white to-violet-50 backdrop-blur-md shadow-sm border-b border-gray-300 px-4 md:px-8 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-5 h-full">
        <Link to="/dashboard">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 hover:text-orange-500 transition-colors duration-200">
            Interview Prep AI
          </h2>
        </Link>
        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
