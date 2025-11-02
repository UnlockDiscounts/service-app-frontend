import React, { useState } from "react";
import Illustration from '../assets/Illustration.png';
import axios from 'axios';

const OtpVerify = ({ onClose, email, verified, requestOtp }) => {

  const [otp,setOtp] = useState("");

  const verifyOtp = async () => {
  try {
    console.log({ email, otp });

    const res = await axios.post(
      "https://service-app-backend-1.onrender.com/api/email/verify-otp/email",
      { email, otp }
    );

    console.log("OTP verification response:", res?.data);
    verified();
    

  } catch (error) {
    console.error(
      "Error while verifying OTP:",
      error.response?.data || error.message
    );
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
      <div className="bg-[#FFF8ED] p-8 rounded-2xl shadow-xl w-[400px] text-center relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <img
            src={Illustration} // optional illustration if you have one
            alt="OTP Verification"
            className="w-24 h-24"
          />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          OTP Verification
        </h2>

        {/* Input */}
        <div className="relative mb-6">
          <span className="absolute top-0 left-4 block text-sm font-semibold text-orange-600 -translate-y-1/2 
                 rounded-md bg-[#FFFBEE]">
            Enter OTP
          </span>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border-2 border-orange-400 rounded-xl bg-[#FFFBEE] px-4 py-3 focus:outline-none focus:ring-0 focus:ring-orange-500 text-center text-lg tracking-widest"
            onChange={(e)=>{
              setOtp(e.target.value);
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button className="border-2 border-orange-400 text-orange-500 px-4 py-2 rounded-full hover:bg-orange-100 transition"
          onClick={requestOtp}>
            Re-send OTP
          </button>
          <button 
             className="border-2 border-orange-400 text-orange-500 px-8 py-2 rounded-full hover:bg-orange-100 transition"
             onClick={verifyOtp}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;

