import axios from "axios";
import React, { useEffect, useState } from "react";
import bglanding from "../assets/bglanding.svg";
import { FaEdit, FaCheck } from "react-icons/fa";
import api from './api';
import ComingSoonOverlay from "./comingSoonOverlay";
import welcomeBack from '../assets/welcomeBack.svg';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");


  const [rating, setRating] = useState(0); // 0 to 5

  const handleStarClick = (star) => {
    setRating(star);
  };

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) return;

    const fetchUser = async () => {
      try {

        const res = await api.get(`/customer/${storedUser.id}`);
        // const res1 = await axios.get(`https://service-app-backend-1.onrender.com/api/customer/68fb5ad1d9ed9b1672d331d9`);


        const data = res.data;
        console.log(res?.data);
        // console.log(res1?.data);
        setUser(res.data);
        setName(data?.customer?.name);
        setEmail(data?.customer?.email);
        setAddress(data?.customer?.address);
        setPhone(data?.customer?.phone_number);



      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);


  const handleSave = async () => {

    const storedUser = JSON.parse(localStorage.getItem("user"));


    if (!storedUser) return;


    try {
      const res = await api.patch(
        `/customer/update/${storedUser.id}`,
        { name, email, phone_number: phone, address }
      );

      const data = res?.data?.updatedCustomer;
      console.log(res?.data);
      setName(data?.updatedCustomer?.name);
      setEmail(data?.updatedCustomer?.email);
      setAddress(data?.updatedCustomer?.address);
      setPhone(data?.updatedCustomer?.phone_number);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update user data:", err);
      alert("Failed to update profile. Try again.");
    }
  };
  
  // Existing state: const [rating, setRating] = useState(0);

  const getRatingInfo = (currentRating) => {
    switch (currentRating) {
      case 1:
        return { emoji: "😠", text: "Very Bad", color: "text-red-600" };
      case 2:
        return { emoji: "🙁", text: "Bad", color: "text-orange-500" };
      case 3:
        return { emoji: "😐", text: "Average", color: "text-yellow-500" };
      case 4:
        return { emoji: "🙂", text: "Good", color: "text-lime-500" };
      case 5:
        return { emoji: "😊", text: "Excellent", color: "text-green-600" };
      default:
        return { emoji: "", text: "Tap to rate", color: "text-gray-500" };
    }
  };

  const { emoji, text, color } = getRatingInfo(rating);

  const handleFeedback = async (id) => {

    const token = localStorage.getItem("accessToken");

    const res = await api.post(`/feedback/${id}`, { comment: feedback, rating });
    console.log(res?.data);


  }

  return (
    <div className="max-w-full mx-auto p-24 space-y-6 py-20"
      style={{ backgroundImage: `url(${bglanding})` }}>
        
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch pt-8 pb-8">
            
            {/* 1. Profile Details Card (Left Side) */}
            <div className="bg-white shadow-lg rounded-lg p-16 space-y-6 w-full lg:w-4/5 xl:w-4/5">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Hi, {name} {/* Display the current name or a default */}
                    </h2>
                    {!isEditing && (
                        <button
                            className="flex items-center px-4 py-2 bg-[#FF9800] text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition duration-150"
                            onClick={() => setIsEditing(true)}
                        >
                            <FaEdit className="mr-2" /> Edit Profile
                        </button>
                    )}
                </div>

                {/* Profile Fields - Displayed as static text or editable inputs */}
                <div className="space-y-8 text-lg">
                    {/* Email */}
                    <div className="flex items-center space-x-32">
                        <span className="text-xl font-semi-bold text-black-600">Email:</span>
                        {isEditing ? (
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-3/5 p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-left"
                            />
                        ) : (
                            <span className="text-xl text-gray-900">{email}</span>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div className="flex items-center space-x-12">
                        <span className="text-xl font-semi-bold text-black-600">Phone number:</span>
                        {isEditing ? (
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-3/5 p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-left"
                            />
                        ) : (
                            <span className="text-xl text-gray-900">{phone}</span>
                        )}
                    </div>

                    {/* Address */}
                    <div className="flex items-center space-x-28">
                        <span className="text-xl font-semi-bold text-black-600">Address:</span>
                        {isEditing ? (
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-3/5 p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-left"
                            />
                        ) : (
                            <span className="text-xl text-gray-900 text-right max-w-[60%]">
                                {address}
                            </span>
                        )}
                    </div>
                </div>

                {/* Save/Cancel Buttons and Review Text (Visible only in editing mode) */}
                {isEditing && (
                    <div className="pt-4 space-y-4">
                        <p className="text-sm text-gray-500">
                            Review details before submitting. These are visible to the service providers.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-6 py-2 border border-orange-400 text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition duration-150"
                                onClick={() => {
                                    setIsEditing(false);
                                    // Optionally reset state to original user data here if cancelled
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition duration-150"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 2. Welcome Image Card (Right Side) */}
                <div className="rounded-lg p-0 w-full lg:w-2/5 xl:w-2/5 flex flex-col items-center justify-center">
                    <img 
                      src={welcomeBack} 
                      alt="Welcome Back User" 
                      className="w-full h-auto object-contain" />
                </div>
        </div>

      {/* Previous Service Logs */}
        <h2 className="text-3xl font-bold">Previous Service Logs</h2>
        {/* <ComingSoonOverlay> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {user?.bookings?.length > 0 ? (
            user.bookings.map((b, idx) => (
              <div
                key={idx}
                className="p-8 text-xl flex justify-center flex-col items-left bg-gray-50 rounded-lg shadow"
              >
                <p>
                  <strong>{b.businessName}</strong>
                </p>
                <p>{new Date(b.bookingDate).toISOString().split("T")[0]}
                </p>
                <div>
                  <button
                    className="p-2 rounded-xl  w-full bg-[#FF9800] text-white text-md mt-8"
                    onClick={openModal}
                  >
                    Tap to rate
                  </button>
                </div>
{isOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-[28rem] max-w-full relative">
            
            {/* Close Button */}
            <button 
                onClick={closeModal} 
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition duration-150"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <h2 className="text-2xl font-bold mb-2 text-gray-900">
                How Was Your Experience?
            </h2>
            <p className="text-medium text-gray-500 mb-6">
                Your feedback helps us improve, drag the slider to rate your experience.
            </p>
            
            <div className="flex flex-col items-center space-y-4">
                
                {/* Dynamic Emoji and Text Display */}
                <div className="flex flex-col items-center">
                    <span className="text-8xl mb-2">{emoji}</span>
                    <span className={`text-3xl font-semibold ${color}`}>{text}</span>
                </div>
                
                {/* Slider and Rating Dots */}
                <div className="w-full px-2 relative">
                    <input 
                        type="range"
                        min="1" 
                        max="5" 
                        step="1" 
                        value={rating || 3} // Default to 3 if not yet rated
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                            // Custom styles to mimic the orange/gray track fill based on value
                            background: `linear-gradient(to right, #FF9800 0%, #FF9800 ${((rating || 3) - 1) * 25}%, #E5E7EB ${((rating || 3) - 1) * 25}%, #E5E7EB 100%)`
                        }}
                    />
                    
                    {/* Rating Dots (Optional Visual Cues) */}
                    <div className="flex justify-between w-full absolute top-1/2 left-0 transform -translate-y-1/2 pb-1 px-3">
                        {[1, 2, 3, 4, 5].map((dot) => (
                            <span 
                                key={dot} 
                                className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${dot <= (rating || 3) ? 'bg-white' : 'bg-gray-300'}`}
                                onClick={() => setRating(dot)}
                            />
                        ))}
                    </div>
                </div>

                {/* Review Text Area */}
                <div className="w-full pt-8">
                    <textarea 
                        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 resize-none text-base"
                        placeholder="Write a review"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={() => {
                        closeModal();
                        handleFeedback(b.providerId);
                    }}
                    className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-150 mt-2"
                >
                    Submit
                </button>
            </div>
        </div>
    </div>
)}
              </div>
            ))
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
        {/* </ComingSoonOverlay> */}
    </div>
  );
};

export default Profile;