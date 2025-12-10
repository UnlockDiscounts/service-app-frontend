import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgcollage from "../assets/imgcollage.svg";
import imgcollage1 from "../assets/imgcollage1.svg";
import imgcollage2 from "../assets/imgcollage2.svg";
import animateimg1 from "../assets/animateimg1.svg";
import animateimg2 from "../assets/animateimg2.svg";
import animateimg3 from "../assets/animateimg3.svg";
import bglanding from "../assets/bglanding.svg";
import Contact from "./contact.jsx"
import ContactForm from './contactForm';
import MendoraFooter from "./footer.jsx";
import "../index.css";

const Hero = () => {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate("/role");
  };


  const handleClick2 = () => {
    navigate("/allservices");
  }
  const feedbackData = [
    {
      name: "Tanisha K.",
      feedback:
        "The app is super easy to use and professionals arrive on time. Got my house deep-cleaned and they did a thorough job. Very reasonable pricing too."
    },
    {
      name: "Arvind S.",
      feedback:
        "I used Mendora for AC servicing and the technician was excellent. He explained the issue clearly and fixed it fast. Very reasonable pricing too."
    },
    {
      name: "Kartik J.",
      feedback:
        "Reliable platform! The car wash service was quick and convenient. Would’ve loved more scheduling options, though."
    },
    {
      name: "Sara K.",
      feedback:
        "Booked a home salon service and was genuinely impressed. The beautician was well-trained and the hygiene level was top-notch."
    },
    {
      name: "Riya M.",
      feedback:
        "Booked a home salon service and was genuinely impressed. The beautician was well-trained and the hygiene level was top-notch."
    }
  ];


  const loopData = [...feedbackData, ...feedbackData];




  return (
    <>
    <div className="pt-10 heroclass w-full min-h-screen mb-14" style={{ backgroundImage: `url(${bglanding})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-14 px-6 sm:px-10 lg:px-20 py-10">

        {/* Left Side Text */}
        <div className="flex flex-col text-center lg:text-left px-10 pr-0 gap-2 justify-center items-center">
          <div className="space-y-4 flex flex-col gap-2 justify-center items-center">
            <h1
              className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-7xl text-gray-800  font-extrabold font-poppins tracking-wide opacity-90"
              style={{ textShadow: "3px 4px 4px rgba(128,128,128,0.8)" }}
            >
              One Platform
            </h1>
            <h1
              className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-7xl text-gray-800 font-extrabold font-poppins tracking-wide opacity-90"
              style={{ textShadow: "3px 4px 4px rgba(128,128,128,0.8)" }}
            >
              All Services
            </h1>
          </div>

          <p className="text-gray-600 font-semibold mt-6 text-sm sm:text-base md:text-lg lg:text-xl">
            Unlock trusted services with speed, savings, and simplicity
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
  <button
    className="bg-gradient-to-r from-[#FFC727] to-[#FF9800] px-14 py-4 rounded-2xl text-lg md:text-2xl font-semibold hover:text-white transition"
    onClick={handleClick}
  >
    Get Started
  </button>

  <button
    className="border-2 border-[#FF9800] px-8 py-2 md:px-8 md:py-3 rounded-2xl text-lg md:text-2xl 
               font-semibold hover:bg-gradient-to-r from-[#FFC727] to-[#FF9800] hover:text-white hover:border-[#FFC727] transition"
    onClick={handleClick2}
  >
    Explore Services
  </button>
</div>


        </div>

        {/* Right Side Image */}
        <div className="relative w-full lg:w-1/2 h-[400px] flex justify-center items-center">
          <img
            src={imgcollage2}
            className="rounded-4xl slide-img delay-0 absolute w-4/5 h-auto object-contain opacity-0 animate-collage-slide-0 z-30"
          />
          <img
            src={imgcollage1}
            className="rounded-4xl slide-img delay-1 absolute w-4/5 h-auto object-contain opacity-0 animate-collage-slide-1 z-20"
          />
          <img
            src={imgcollage}
            className="rounded-4xl slide-img delay-2 absolute w-4/5 h-auto object-contain opacity-0 animate-collage-slide-2 z-10"
          />
        </div>

      </div>
      <div className="mt-5 px-10 w-150">
        <div className="overflow-hidden">

          <div className="flex animate-marquee px-20">
            {loopData.map((p, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-200 via-purple-200 to-purple-200 m-6 rounded-2xl p-10 min-w-[300px]"
              >
                <h2 className="text-2xl">{p.name}</h2>
                <h2>⭐⭐⭐⭐⭐</h2>
                <p className="pt-4">{p.feedback}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="flex flex-row mt-12 w-full gap-4">

        {/* LEFT SIDE */}
        <div className="w-full">
          <div className="w-4/5 sm:w-4/5 md:w-5/6 lg:w-5/6 
                  mx-auto p-4 
                  shadow-xl shadow-gray-500 rounded-[10px] bg-white 
                  mb-8 mt-6 flex flex-col object-cover">

            <div className="p-5 w-full">
              <h1 className="font-poppins text-xl sm:text-2xl md:text-3xl font-semibold text-left">
                Get In Touch
              </h1>
            </div>

            <div className="w-full">
              <ContactForm />
            </div>

          </div>
        </div>


        {/* RIGHT SIDE */}
        <div className="relative w-full h-[400px] flex justify-between items-center"> 
          <img src={animateimg1} className="rounded-full slide-img right-0 delay-0 absolute w-4/5 h-auto object-cover opacity-0 animate-slide-in-0 z-30" /> 
          <img src={animateimg2} className="rounded-full slide-img bottom-0 delay-1 absolute w-4/5 h-auto object-cover opacity-0 animate-slide-in-1 z-20" />
          <img src={animateimg3} className="rounded-full slide-img left-0 delay-2 absolute w-4/5 h-auto object-cover opacity-0 animate-slide-in-2 z-10" /> 
        </div>


      </div>

    
    </div>
    <MendoraFooter/>
    </>
  );
};

export default Hero;