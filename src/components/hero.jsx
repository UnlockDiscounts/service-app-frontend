import { useNavigate } from "react-router-dom";
import imgcollage from "../assets/imgcollage.png";
import bglanding from "../assets/bglanding.svg";

import "../index.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/role");
  };


  const handleClick2 = () => {
    navigate("/allservices");
  }



  return (
    <div className="pt-10 heroclass w-full min-h-screen" style={{ backgroundImage: `url(${bglanding})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-6 sm:px-10 lg:px-20 py-10">

        {/* Left Side Text */}
        <div className="flex flex-col    text-center lg:text-left px-10  ">
          <div className="space-y-4  ">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl text-gray-800  font-extrabold font-poppins tracking-wide opacity-90"
              style={{ textShadow: "3px 4px 4px rgba(128,128,128,0.8)" }}
            >
              One Platform
            </h1>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl text-gray-800 font-extrabold font-poppins tracking-wide opacity-90"
              style={{ textShadow: "3px 4px 4px rgba(128,128,128,0.8)" }}
            >
              All Services
            </h1>
          </div>

          <p className="text-gray-600 font-semibold mt-6 text-sm sm:text-base md:text-lg lg:text-xl">
            Unlock trusted services with speed, savings, and simplicity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              className="bg-[#FF9800] px-6 py-2 md:px-8 md:py-3 rounded-full text-lg md:text-2xl font-semibold 
               border-2 border-transparent hover:bg-white hover:border-[#FF8900] 
               transition"
              onClick={handleClick}
            >
              Get Started
            </button>

            <button
              className="border-2 border-[#FF9800] px-6 py-2 md:px-8 md:py-3 rounded-full text-lg md:text-2xl 
               font-semibold hover:bg-[#FF9800] hover:text-white transition"
              onClick={handleClick2}
            >
              Explore Services
            </button>
          </div>

        </div>

        {/* Right Side Image */}
        <div className="flex justify-center lg:justify-end w-full lg:w-1/2 items-center">
  <img
    src={imgcollage}
    alt="img-collage"
    className="
      w-full
      max-w-lg 
      sm:max-w-xl
      md:max-w-2xl
      lg:max-w-xl
      object-contain
    "
  />
</div>

      </div>
    </div>
  );
};

export default Hero;
