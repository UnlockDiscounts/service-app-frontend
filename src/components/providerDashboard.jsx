import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import i1 from '../assets/i1.jpg'
import ComingSoonOverlay from './comingSoonOverlay';
import { Trash2, Edit, Plus, Logs } from "lucide-react"; // icons from lucide-react
import api from './api';
import welcomeBack from '../assets/welcomeBack.svg';
import bglanding from "../assets/bglanding.svg";
import Illustration from '../assets/Illustration.svg';

export default function ProviderDashboard() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [service, setService] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(0);
  const [task, setTask] = useState([]);
  const [add, setIsAdd] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceImage, setServiceImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const fileInputRef1 = useRef(null);
  const [pimage, setPImage] = useState(null);

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) return;

    const info = async () => {

      const res = await api.get(`/provider/${storedUser.id}`);
      const res1 = await api.get(`/booking/${storedUser.id}`);
      console.log(res1?.data?.bookings);
      console.log(res?.data);


      setName(res?.data?.name);
      setEmail(res?.data?.email);
      setPhone(res?.data?.phoneno);
      setAddress(res?.data?.address);
      setWebsite(res?.data?.website || "");
      setService(res?.data?.services);
      setPrice(res?.data?.average_pricing);
      setTask(res1?.data?.bookings);

    }

    info();


  }, []);

  const handleIconClick = () => {
    fileInputRef1.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      console.log("Upload canceled or no file selected.");
      event.target.value = null;
      return;
    }

    // Create the temporary URL for immediate UI preview
    const newImageUrl = URL.createObjectURL(file);
    setPImage(newImageUrl);
    console.log("File selected and local preview URL created:", newImageUrl);

    // Create a FormData object to properly package the file for the API.
    const formData = new FormData();

    // Append the actual File object. 
    // The key 'avatar' must match the name your server-side code expects (e.g., req.file.avatar).
    formData.append('avatar', file);

    // Optionally append other data if your API needs it, e.g., formData.append('userId', userId);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await api.post(
        "/auth/avatar",
        formData // <-- Sending the file data package!
        
      );

      console.log("API Response Data:", res?.data);

    } catch (error) {
      // Handle errors
      console.error("Avatar upload failed:", error);

    } finally {
      // Always reset the file input field
      event.target.value = null;
    }
  };
  const handlePrice = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await api.patch(
        "/provider/addpricing",
        { average_pricing: price }
      );
      console.log(res?.data);
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  const handleInfo = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await api.patch(
        "/provider/update-info",
        { email: email, phone_number: phone, address: address,website: website, average_pricing: price }
      );
      console.log(res?.data);
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };


  const handleAddService = () => {

    setIsAdd(!add);


  };
  const handleAdd = async () => {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) return;

    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("serviceImage", serviceImage);

    const res = await api.post(`/provider/addService/${storedUser.id}`, formData);

    console.log(res?.data);

    window.location.reload();

    setIsAdd(!add);




  };

  const handleUpdate = async (id) => {

    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("serviceImage", serviceImage);
    const res = await api.patch(`/provider/updateservice/${id}`, formData);

    console.log(res?.data);

    window.location.reload();

    setEdit(false);




  };
  const handleDeleteService = async (id) => {

    const token = localStorage.getItem("accessToken");
    const res = await api.delete(`/provider/deleteservice/${id}`);
    console.log(res?.data);
    window.location.reload();



  };
  const handleStatusClick = async (id) => {
    try {
      const res = await api.patch(`/booking/servicedone/${id}`);
      console.log(res?.data);
      alert(res?.data?.message);
      window.location.reload();
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };


  // ... (imports and state/functions remain the same above)

  return (
    <div className="max-w-full mx-auto p-16 space-y-6 py-10"
      style={{ backgroundImage: `url(${bglanding})` }}
    >

      <div className="flex flex-col lg:flex-row gap-0 justify-center items-stretch">
        
        {/* Profile Details Card (Left Side) */}
<div className="bg-white shadow-lg rounded-lg p-16 space-y-4 w-full lg:w-4/5 xl:w-4/5"> 
  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
    <h2 className="text-3xl font-bold text-gray-800">
      Hi, {name}
    </h2>
    {!isEditing && (
      <button
        className="flex items-center px-4 py-2 bg-[#FF9800] text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition duration-150"
        onClick={() => setIsEditing(true)}
      >
        <Edit size={16} className="mr-2" /> Edit Profile
      </button>
    )}
  </div>

  {/* Profile Fields: Reduced vertical gap between fields from large spacing to space-y-1 */}
  <div className="space-y-8 text-lg"> 
    
    {/* Email*/}
    <div className="flex items-center space-x-4">
      <span className="text-xl font-semi-bold text-gray-900 w-1/4">Email:</span>
      {isEditing ? (
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-3/4 p-1 border-b border-gray-300 focus:outline-none focus:border-orange-500 text-left"
        />
      ) : (
        <span className="text-xl text-gray-900 w-3/4">{email}</span>
      )}
    </div>
        
    {/* Phone Number */}
    <div className="flex items-center space-x-4">
      <span className="text-xl font-semi-bold text-gray-900 w-1/4">Phone number:</span>
      {isEditing ? (
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-3/4 p-1 border-b border-gray-300 focus:outline-none focus:border-orange-500 text-left"
        />
      ) : (
        <span className="text-xl text-gray-900 w-3/4">{phone}</span>
      )}
    </div>

    {/* Address */}
    <div className="flex items-center space-x-4">
      <span className="text-xl font-semi-bold text-gray-900 w-1/4">Address:</span>
      {isEditing ? (
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-3/4 p-1 border-b border-gray-300 focus:outline-none focus:border-orange-500 text-left"
        />
      ) : (
        <span className="text-xl text-gray-900 w-3/4">{address}</span>
      )}
    </div>

    {/* Website*/}
    <div className="flex items-center space-x-4">
              <span className="text-xl font-semi-bold text-gray-900 w-1/4">Website:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Enter website URL"
                  className="w-3/4 p-1 border-b border-gray-300 focus:outline-none focus:border-orange-500 text-left"
                />
              ) : (
                <a href={website ? website : "#"} 
                   className="text-xl text-orange-500 underline w-3/4"
                   target="_blank" 
                   rel="noopener noreferrer"
                >
                  {website || "N/A"}
                </a>
              )}
            </div>
    
    {/* Average Price */}
    <div className="flex items-center space-x-4">
      <span className="text-xl font-semi-bold text-gray-900 w-1/4">Average Price:</span>
      {isEditing ? (
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-3/4 p-1 border-b border-gray-300 focus:outline-none focus:border-orange-500 text-left"
        />
      ) : (
        <span className="text-xl text-gray-900 w-3/4">₹{price}</span>
      )}
    </div>
  </div>

  {/* Save/Cancel Buttons */}
  {isEditing && (
    <div className="pt-4 space-y-4">
      <p className="text-medium text-gray-500">
        Review details before submitting. These are visible to your clients.
      </p>
      <div className="flex justify-end space-x-4">
        <button
          className="px-6 py-2 border border-orange-400 text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition duration-150"
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition duration-150"
          onClick={() => {
            setIsEditing(false);
            handleInfo(); // Save both phone and address
            handlePrice(); // Save average price
          }}
        >
          Save
        </button>
      </div>
    </div>
  )}
</div>

        {/* Welcome Image Card (Right Side)  */}
        <div className="rounded-lg p-0 w-full lg:w-2/5 xl:w-2/5 flex flex-col items-center justify-center">
                    <img 
                      src={welcomeBack} 
                      alt="Welcome Back User" 
                      className="w-full max-h-84 object-contain" />
                </div>
      </div>
      
      <h2 className="text-[32px] font-semibold">Your Services</h2>
      <div className="flex flex-wrap justify-left gap-4">
        {service.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-xl shadow-md w-[220px] h-[220px] relative hover:shadow-lg transition cursor-pointer"
          >
            {/* Top Action Icons Area */}
<div className="absolute top-0 left-0 right-0 flex rounded-[10px] justify-between z-10 w-full p-2 bg-amber-100 ">
  
  {/* Edit Button */}
  <button
    className="p-1 bg-white/70 rounded-md shadow-sm hover:bg-white transition"
    onClick={() => {
      setEdit(true);
      setEditId(service._id);
      setServiceName(service.serviceName);
    }}
  >
    <Edit size={16} className="text-gray-700" />
  </button>
  
  {/* Delete Button */}
  <button
    onClick={() => handleDeleteService(service._id)}
    className="p-1 bg-white/70 rounded-md shadow-sm hover:bg-white transition"
  >
    <Trash2 size={16} className="text-gray-500" />
  </button>

</div>

            {/* Image Area */}
            <div className="bg-amber-100 h-[140px] flex items-center justify-center p-4">
              <img 
                src={service.serviceImage || Illustration} 
                alt={service.serviceName}
                className="w-full h-5/6 object-contain"
              />
            </div>

            {/* Title */}
            <div className="flex justify-center items-center p-2">
              <p className="text-2xl font-medium text-black">{service.serviceName}</p>
            </div>

            {/* Edit Modal */}
            {edit && editId === service._id && (
              <div
                className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
                onClick={() => setEdit(false)} // close on outside click
              >
                <div
                  className="bg-white shadow-[0px_4px_8px_2px_rgba(0,0,0,0.25)] p-6 flex flex-col gap-6 rounded-3xl w-[380px]"
                  onClick={(e) => e.stopPropagation()} // prevent close on inside click
                >
                  {/* Modal content remains the same */}
                  {/* Close button */}
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[16px] text-black">Service Image</p>
                    <button
                      className="text-gray-500 hover:text-[#ff9800] text-4xl font-bold"
                      onClick={() => setEdit(false)}
                    >
                      ×
                    </button>
                  </div>
                  {/* Upload Area */}
                  <div
                    className="bg-[rgba(0,0,0,0.08)] flex items-center justify-center h-[88px] w-full rounded-[24px] cursor-pointer overflow-hidden"
                    onClick={() =>
                      fileInputRef.current && fileInputRef.current.click()
                    }
                  >
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setServiceImage(file);
                        if (file) setPreviewImage(URL.createObjectURL(file));
                      }}
                    />
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-[16px]"
                      />
                    ) : (
                      <div className="text-center text-[14px] text-[rgba(0,0,0,0.5)] leading-tight">
                        Click to upload or drag and drop
                        <br />
                        JPG, PNG up to 10MB
                      </div>
                    )}
                  </div>

                  {/* Service Name Input */}
                  <p className="font-semibold text-[16px] text-black">Service Name</p>
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="Enter service name"
                    className="w-full h-[48px] px-4 py-2 bg-transparent border border-[#ff9800] rounded-[16px] outline-none shadow-sm"
                  />

                  {/* Done Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleUpdate(editId)}
                      className="bg-[#ff9800] hover:bg-[#e68a00] text-white font-semibold text-[16px] rounded-[36px] px-[48px] py-[12px] transition-all duration-200 shadow-sm"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add New Services Card */}
        <div 
          onClick={() => setIsAdd(true)} 
          className="bg-white rounded-xl shadow-md w-[220px] h-[220px] flex items-center justify-center border-2 border-gray-300 border-dashed hover:border-orange-500 hover:shadow-lg transition cursor-pointer"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
              <Plus size={36} />
            </div>
            <p className="text-gray-700 text-xl font-medium">Add New Services</p>
          </div>
        </div>

        {/* Modal */}
          {add && (
            <div
              className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setIsAdd(false)}
            >
              <div
                className="bg-white shadow-[0px_4px_8px_2px_rgba(0,0,0,0.25)] p-6 flex flex-col gap-6 rounded-3xl w-[380px]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Service Image Label */}
                <div className="flex items-center justify-start">
                  <p className="font-semibold text-[16px] text-black">Service Image</p>
                </div>

                {/* Upload Area */}
                <div
                  className="bg-[rgba(0,0,0,0.08)] flex items-center justify-center h-[88px] w-full rounded-[24px] cursor-pointer overflow-hidden"
                  onClick={() =>
                    fileInputRef.current && fileInputRef.current.click()
                  }
                >
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setServiceImage(file);
                      if (file) setPreviewImage(URL.createObjectURL(file));
                    }}
                  />
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-[16px]"
                    />
                  ) : (
                    <div className="text-center text-[14px] text-[rgba(0,0,0,0.5)] leading-tight">
                      Click to upload or drag and drop
                      <br />
                      JPG, PNG up to 10MB
                    </div>
                  )}
                </div>

                {/* Service Name Label */}
                <div className="flex items-center justify-start">
                  <p className="font-semibold text-[16px] text-black">Service Name</p>
                </div>

                {/* Service Name Input */}
                <div className="w-full">
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="Enter service name"
                    className="w-full h-[48px] px-4 py-2 bg-transparent border border-[#ff9800] rounded-[16px] outline-none shadow-sm"
                  />
                </div>

                {/* Done Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleAdd}
                    className="bg-[#ff9800] hover:bg-[#e68a00] text-white font-semibold text-[16px] rounded-[36px] px-[48px] py-[12px] transition-all duration-200 shadow-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>

      {/* Task Logs */}
<div className="mt-8">
  <h2 className="text-[32px] font-semibold mb-2">Service Requests</h2>
  <div className="flex flex-col gap-4">
    {task.map((task, i) => {
      return (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-8 flex justify-between items-center hover:shadow-lg transition"
        >
          <div className="flex items-center space-x-4">
            <Logs size={36} className="text-orange-500 flex-shrink-0" />
            
            <div>
              <p className="text-2xl font-medium">
                {task.customerName} has requested for a service
              </p>
              <p className="text-medium text-gray-900">
                Today: 11:45 AM {/* Placeholder for time */}
              </p>
            </div>
          </div>
          
          {/* Done Button*/}
          <button
            onClick={() => handleStatusClick(task.Booking_id)}
            className="px-6 py-3 bg-[#ff9800] text-white text-xl font-medium rounded-xl shadow-md hover:bg-orange-600 transition duration-150"
          >
            Done
          </button>
        </div>
      );
    })}
  </div>
</div>
    </div>
  );
}

