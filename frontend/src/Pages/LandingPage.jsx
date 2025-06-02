// LandingPage.js
import React, { useContext, useState } from 'react';
import HERO_IMG from '../assets/hero-image.png';
import { APP_FEATURES } from '../utils/data';
import { useNavigate } from 'react-router-dom';
import { LuSparkle } from "react-icons/lu";
import Modal from '../components/Modal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const LandingPage = () => {
const {user} =useContext(UserContext);

  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if(!user){
    setOpenAuthModal(true);
    }else{
      navigate("/dashboard");
    }

  };

  return (
    <>
      <div className="relative w-full min-h-screen bg-[#F6FAFD] overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-100 blur-[100px] rounded-full z-0"></div>

        <div className="container mx-auto px-6 pt-6 pb-28 relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-14">
            <div className="text-xl font-bold text-gray-900">
              AI Interview Preparation
            </div>
          { user?( <ProfileInfoCard/>): (<button
              className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-sm font-semibold text-white px-6 py-2 rounded-full shadow hover:opacity-90 transition cursor-pointer"
              onClick={() => setOpenAuthModal(true)}
            >
              Login / Sign Up
            </button>)}
          </header>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 border border-blue-200 rounded-full">
                AI Powered
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                Ace Interviews with <br />
                <span className="inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] animate-text-shine">
                  <LuSparkle className="text-2xl" />
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            <div className="md:w-1/2 text-gray-800 space-y-6">
              <p className="text-[17px] leading-relaxed">
                Get role-specific questions, expand answers when you need them, dive deeper into concepts, and organize everything your way. Your ultimate interview toolkit is here.
              </p>
              <button
                className="bg-indigo-600 text-sm font-semibold text-white px-6 py-3 rounded-full cursor-pointer hover:bg-indigo-700 transition"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <section className="flex justify-center -mt-24 px-4 z-10 relative">
          <img
            src={HERO_IMG}
            alt="Hero"
            className="w-full max-w-5xl rounded-xl shadow-lg border border-blue-200"
          />
        </section>
      </div>

      {/* Features Section */}
      <div className="w-full bg-[#F6FAFD] mt-16 px-6 py-20">
        <section className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
            Features That Make You Shine
          </h2>

          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {APP_FEATURES.slice(0, 3).map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-blue-100"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {APP_FEATURES.slice(3).map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-blue-100"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-16 text-sm text-gray-500 text-center">
          Made with 💙 by Aakash
        </footer>
      </div>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
