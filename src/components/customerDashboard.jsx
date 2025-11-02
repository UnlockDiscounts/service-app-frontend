import axios from "axios";
import React, { useEffect, useState } from "react";
import bglanding from "../assets/bglanding.svg";
import { FaEdit, FaCheck } from "react-icons/fa";
import ComingSoonOverlay from "./comingSoonOverlay";

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

        const res = await axios.get(`https://service-app-backend-1.onrender.com/api/customer/${storedUser.id}`);
        const res1 = await axios.get(`https://service-app-backend-1.onrender.com/api/customer/68fb5ad1d9ed9b1672d331d9`);


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
      const res = await axios.patch(
        `https://service-app-backend-1.onrender.com/api/customer/update/${storedUser.id}`,
        {name, email, phone_number:phone,address}
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


  const handleFeedback = async (id) => {

    const token = localStorage.getItem("accessToken");


    const res = await axios.post(`https://service-app-backend-1.onrender.com/api/feedback/${id}`, { comment: feedback, rating },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );
    console.log(res?.data);


  }

  return (
    <div className="max-w-full mx-auto p-6 space-y-6 py-20"
      style={{ backgroundImage: `url(${bglanding})` }}>
      {/* Profile Details */}
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm:text-2xl font-bold">Profile Details</h2>
          {isEditing ? (
            <FaCheck
              className="text-green-500 cursor-pointer"
              onClick={handleSave}
              title="Save"
            />
          ) : (
            <FaEdit
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsEditing(true)}
              title="Edit"
            />
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className={`mt-1 p-2 block w-full rounded-md border-gray-300 ${isEditing ? "bg-white" : "bg-gray-100"
                } text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className={`mt-1 p-2 block w-full rounded-md border-gray-300 ${isEditing ? "bg-white" : "bg-gray-100"
                } text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
                className={`mt-1 p-2 block w-full rounded-md border-gray-300 ${isEditing ? "bg-white" : "bg-gray-100"
                  } text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Residential Address
              </label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={!isEditing}
                className={`mt-1 p-2 block w-full rounded-md border-gray-300 ${isEditing ? "bg-white" : "bg-gray-100"
                  } text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Previous Service Logs */}
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Previous Service Logs</h2>
        {/* <ComingSoonOverlay> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user?.bookings?.length > 0 ? (
              user.bookings.map((b, idx) => (
                <div
                  key={idx}
                  className="p-4 flex justify-center flex-col items-center bg-gray-50 rounded-lg shadow"
                >
                  <p>
                    <strong>{b.service.serviceName}</strong>
                  </p>
                  <p>2 months ago</p>
                  <div>
                    <button
                      className="p-2 rounded-3xl w-full bg-[#FF9800] text-white text-md mt-8"
                      onClick={openModal}
                    >
                      Tap to rate
                    </button>
                  </div>
                  {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">
                          Your Feedback
                        </h2>
                        <div>
                          <input type="text" className="mb-4 w-full border-gray-500 shadow-lg  h-30 p-5" placeholder="Enter Your Ratings "
                            onChange={(e) => { setFeedback(e.target.value); }}
                          />

                        </div>
                        {/* Star Rating */}
                        <div className="flex gap-1 mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              onClick={() => handleStarClick(star)}
                              xmlns="http://www.w3.org/2000/svg"
                              fill={star <= rating ? "gold" : "gray"}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.75.75 0 011.04 0l2.733 3.38 3.747.545a.75.75 0 01.415 1.279l-2.71 2.64.64 3.73a.75.75 0 01-1.088.79L12 14.347l-3.34 1.753a.75.75 0 01-1.088-.79l.64-3.73-2.71-2.64a.75.75 0 01.415-1.28l3.746-.544 2.733-3.381z"
                              />
                            </svg>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            closeModal();
                            handleFeedback(b.provider);
                          }}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Close
                        </button>
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
    </div>
  );
};

export default Profile;