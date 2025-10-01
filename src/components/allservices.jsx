import { ArrowBigLeft, ArrowLeft, MapPin, Search, Star } from "lucide-react";
import image from "../assets/image.png";
import Painter from "../assets/Painter.png";
import Plumber from "../assets/Plumber.png";
import Electrician from "../assets/Electrician.png";
import Beautician from "../assets/Beautician.png";
import Highlight from "../assets/Highlight 1.png";
import Hightlight2 from "../assets/Highlight 2.png";
import Hightlight3 from "../assets/Highlight 3.png";
import star_shine from "../assets/star_shine.png";
import woman from "../assets/woman.jpg";
import gelLaser from "../assets/gelLaser.jpg";
import stoneMassage from "../assets/stoneMassage.jpg";
import pedicure from "../assets/pedicure.jpg";
import trp1 from "../assets/TRP 1.png";
import trp2 from "../assets/TRP 2.png";
import trp3 from "../assets/TRP 3.png";

import topprofessionals from "../assets/topprofessionals.png";
import Vector from "../assets/Vector.png";
import star from "../assets/star.png";
import calendar from "../assets/calendar.png";
import { useState } from "react";
import Modal from "./beauticianListingModel";

const AllServices = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="container mx-auto my-2">
        {/*search bars*/}
        <div className="w-full p-4 grid  sm:grid-cols-1 md:grid-cols-2 items-center justify-center gap-1 place-content-center ">
          <div className="border border-[#FF8900] rounded-xl  flex items-center gap-3">
            <div className="flex items-center px-2 ml-4 ">
              <MapPin className="text-[#FF8900]" />
            </div>
            <div className=" flex flex-grow">
              <input
                type="text"
                name=""
                id=""
                className="w-full p-2 border-none rounded-xl"
                placeholder="Search for your location"
              />
            </div>
          </div>
          <div className="border border-[#FF8900] rounded-xl  flex justify-start items-center gap-3">
            <div className="flex items-center px-2  ml-4">
              <Search className="text-[#FF8900]" />
            </div>
            <div className=" flex flex-grow">
              <input
                type="text"
                name=""
                id=""
                className=" p-2 border-none rounded-xl w-full"
                placeholder="Search for Services"
              />
            </div>
          </div>
        </div>
        <div className="relative">
          <img src={image} alt="heroimg" className="w-full h-auto" />

          {/* Hero Heading */}
          <div className="absolute inset-x-0 top-[35%] sm:top-[40%] text-center px-2 sm:px-4">
            <h1 className="text-gray-200 font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide font-serif mb-2">
              One Platform
            </h1>
            <h1 className="text-gray-200 font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide font-serif ">
              All Services
            </h1>
          </div>

          {/* Search Bar */}
          {/* <div className="absolute inset-x-0 top-1/2 px-2 sm:px-4">
            <div className="max-w-md sm:max-w-lg mx-auto flex items-center bg-gray-200 rounded-3xl px-2 sm:px-3 py-2 sm:py-3">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              <input
                type="text"
                placeholder="Search for services"
                className="flex-grow bg-gray-200 border-none focus:outline-none px-2 sm:px-3 text-sm sm:text-base"
              />
              <button className="bg-[#ff8901] px-3 sm:px-4 py-1 sm:py-2 rounded-2xl text-xs sm:text-sm md:text-base font-semibold text-black">
                Search
              </button>
            </div>
          </div> */}
        </div>

        {/* Popular Services */}
        <div className="px-4 w-full flex flex-col gap-4 space-y-6 mt-6">
          <h1 className="text-lg sm:text-xl font-bold">Popular Services</h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <img src={Painter} alt="" className="w-full" />
            <img src={Plumber} alt="" className="w-full" />
            <img src={Electrician} alt="" className="w-full" />
            <img
              src={Beautician}
              alt=""
              className="w-full"
              onClick={() => setIsOpen(true)}
            />
          </div>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="flex items-center gap-4 mb-4  justify-start">
            <ArrowLeft className="flex items-center justify-between font-bold" onClick={()=>setIsOpen(false)}/>
            <h2 className="text-2xl font-bold mb-4"> Services</h2>
            </div>
            <div className="relative rounded-xl shadow-2xl overflow-hidden flex flex-col gap-4 mb-4">
              <div>
              <img src={woman} alt="" />
              </div>
              <div className=" p-2 absolute bottom-0 w-full bg-white">
              <div className="">
                <h2 className="text-xl font-bold">Looks Salon</h2>
                <p className="text-md text-gray-400">Facial, Grooming, Massage</p>
              </div>  
              <div className="flex justify-between ">
                <div className="flex items-center gap-2">
                  <h2 className="text-[#FFDE7E] text-2xl font-bold">4.3</h2>
                  <Star className="text-[#FFDE7E]"/>
                </div>
                <div>
                  <button className="p-2 rounded-xl border-2 font-bold border-[#FFD700] hover:bg-[#FF8900]">Buy Now</button>
                </div>
              </div>
              </div>
            </div>
            <div className="relative rounded-xl shadow-2xl overflow-hidden flex flex-col gap-4 mb-4">
              <div>
              <img src={gelLaser} alt="" />
              </div>
              <div className=" p-2 absolute bottom-0 w-full bg-white">
              <div className="">
                <h2 className="text-xl font-bold">Mahi Salon</h2>
                <p className="text-md text-gray-400">Facial, Grooming, Massage</p>
              </div>  
              <div className="flex justify-between ">
                <div className="flex items-center gap-2">
                  <h2 className="text-[#FFDE7E] text-2xl font-bold">4.3</h2>
                  <Star className="text-[#FFDE7E]"/>
                </div>
                <div>
                  <button className="p-2 rounded-xl border-2 font-bold border-[#FFD700] hover:bg-[#FF8900]">Buy Now</button>
                </div>
              </div>
              </div>
            </div>
            <div className="relative rounded-xl shadow-2xl overflow-hidden flex flex-col gap-4 mb-4">
              <div>
              <img src={stoneMassage} alt="" />
              </div>
              <div className=" p-2 absolute bottom-0 w-full bg-white">
              <div className="">
                <h2 className="text-xl font-bold">OUD Luxury Salon</h2>
                <p className="text-md text-gray-400">Facial, Grooming, Massage</p>
              </div>  
              <div className="flex justify-between ">
                <div className="flex items-center gap-2">
                  <h2 className="text-[#FFDE7E] text-2xl font-bold">4.3</h2>
                  <Star className="text-[#FFDE7E]"/>
                </div>
                <div>
                  <button className="p-2 rounded-xl border-2 font-bold border-[#FFD700] hover:bg-[#FF8900]">Buy Now</button>
                </div>
              </div>
              </div>
            </div>
            <div className="relative rounded-xl shadow-2xl overflow-hidden flex flex-col gap-4 mb-4">
              <div>
              <img src={pedicure} alt="" />
              </div>
              <div className=" p-2 absolute bottom-0 w-full bg-white">
              <div className="">
                <h2 className="text-xl font-bold">Dazzle by style Salon</h2>
                <p className="text-md text-gray-400">Facial, Grooming, Massage</p>
              </div>  
              <div className="flex justify-between ">
                <div className="flex items-center gap-2">
                  <h2 className="text-[#FFDE7E] text-2xl font-bold">4.3</h2>
                  <Star className="text-[#FFDE7E]"/>
                </div>
                <div>
                  <button className="p-2 rounded-xl border-2 font-bold border-[#FFD700] hover:bg-[#FF8900]">Buy Now</button>
                </div>
              </div>
              </div>
            </div>
            
          </Modal>
        </div>

        {/* Trending Services */}
        <div className="px-4 w-full flex flex-col gap-4 space-y-6 mt-6">
          <h1 className="text-lg sm:text-xl font-bold">Trending Services</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            <img src={Highlight} alt="" className="w-full" />
            <img src={Hightlight2} alt="" className="w-full" />
            <img src={Hightlight3} alt="" className="w-full" />
          </div>
        </div>

        {/* Top Rated Professionals */}
        <div className="px-4 w-full flex flex-col gap-4 space-y-6 mt-6">
          <h1 className="text-lg sm:text-xl font-bold">
            Top Rated Professionals
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            <img src={trp1} alt="" className="w-full" />
            <img src={trp2} alt="" className="w-full" />
            <img src={trp3} alt="" className="w-full" />
          </div>
        </div>

        {/* Why Choose */}
        <div className="w-full mt-10 p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">
            Why choose UnlockDiscounts?
          </h1>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="space-y-4 text-center md:text-left">
            <img src={Vector} alt="" className="mx-auto md:mx-0" />
            <h2 className="font-bold text-lg">
              Verified and Background-Checked pros
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              We thoroughly vet all our pros to ensure they meet our high
              standards.
            </p>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <img src={star_shine} alt="" className="mx-auto md:mx-0" />
            <h2 className="font-bold text-lg">Top rated professionals</h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Our pros consistently receive excellent reviews from satisfied
              customers.
            </p>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <img src={calendar} alt="" className="mx-auto md:mx-0" />
            <h2 className="font-bold text-lg">Flexible Scheduling</h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Book appointments at your convenience, with flexible scheduling
              options.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 mt-20 text-gray-500 flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 bg-[#F2E7E7] w-full text-sm sm:text-base">
        <a className="hover:cursor-pointer hover:text-blue-700">
          Terms of service
        </a>
        <a className="hover:cursor-pointer hover:text-blue-700">
          Privacy Policy
        </a>
        <a className="hover:cursor-pointer hover:text-blue-700">Contact us</a>
      </footer>
    </>
  );
};

export default AllServices;
