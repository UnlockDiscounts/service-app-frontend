import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import i1 from '../assets/i1.jpg'
import ComingSoonOverlay from './comingSoonOverlay';
import { Trash2, Edit, Plus, User } from "lucide-react"; // icons from lucide-react

export default function ProviderDashboard() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [service, setService] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditing1, setIsEditing1] = useState(false);
  const [price, setPrice] = useState(0);
  const [task, setTask] = useState([]);
  const [add, setIsAdd] = useState(false);
  // const [serviceCategory, setServiceCategory] = useState("");
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

      const res = await axios.get(`https://service-app-backend-1.onrender.com/api/provider/${storedUser.id}`);
      const res1 = await axios.get(`https://service-app-backend-1.onrender.com/api/booking/${storedUser.id}`);
      console.log(res1?.data?.bookings);
      console.log(res?.data);


      setName(res?.data?.name);
      setPhone(res?.data?.phoneno);
      setAddress(res?.data?.address);
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

    // --- 1. Client-Side Preview (Still works) ---
    // Create the temporary URL for immediate UI preview
    const newImageUrl = URL.createObjectURL(file);
    setPImage(newImageUrl);
    console.log("File selected and local preview URL created:", newImageUrl);

    // --- 2. API Data Preparation (Crucial Fix) ---
    // Create a FormData object to properly package the file for the API.
    const formData = new FormData();

    // Append the actual File object. 
    // The key 'avatar' must match the name your server-side code expects (e.g., req.file.avatar).
    formData.append('avatar', file);

    // Optionally append other data if your API needs it, e.g., formData.append('userId', userId);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        "https://service-app-backend-1.onrender.com/api/auth/avatar",
        formData // <-- Sending the file data package!
        , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response Data:", res?.data);

    } catch (error) {
      // 4. Handle errors
      console.error("Avatar upload failed:", error);

    } finally {
      // 5. Always reset the file input field
      event.target.value = null;
    }
  };
  const handlePrice = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.patch(
        "https://service-app-backend-1.onrender.com/api/provider/addpricing",
        { average_pricing: price }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      console.log(res?.data);
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  const handleInfo = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.patch(
        "https://service-app-backend-1.onrender.com/api/provider/update-info",
        { phone_number: phone, address: address, average_pricing: price }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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

    const res = await axios.post(`https://service-app-backend-1.onrender.com/api/provider/addService/${storedUser.id}`, formData);

    console.log(res?.data);

    window.location.reload();

    setIsAdd(!add);




  };

  const handleUpdate = async (id) => {

    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("serviceImage", serviceImage);
    const res = await axios.patch(`https://service-app-backend-1.onrender.com/api/provider/updateservice/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res?.data);

    window.location.reload();

    setEdit(false);




  };
  const handleDeleteService = async (id) => {

    const token = localStorage.getItem("accessToken");
    const res = await axios.delete(`https://service-app-backend-1.onrender.com/api/provider/deleteservice/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res?.data);
    window.location.reload();



  };
  const handleStatusClick = async (id) => {
    try {
      const res = await axios.patch(`https://service-app-backend-1.onrender.com/api/booking/servicedone/${id}`);
      console.log(res?.data);
      alert(res?.data?.message);
      window.location.reload();
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };


  return (
    <div className="bg-white min-h-screen w-full max-w-[1440px] mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mt-8 bg-white rounded-xl shadow-md p-6 border-2 border-[#ff9800]">
        <p className="text-lg">Welcome back</p>

        <div className="flex items-center space-x-3 text-lg">
          <span>{name}</span>
          {/* <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"

          >
            <div
              onClick={handleIconClick}
              className="inline-block cursor-pointer p-1 rounded-full transition-colors hover:bg-gray-100"
              title="Click to upload profile image"
            >
              
              <img src={pimage} size={22} className="w-full h-full object-cover rounded-full text-gray-700" />

        
              <input
                type="file"
                ref={fileInputRef1}
                onChange={handleFileChange}
                accept="image/*" 
                className="hidden"
              />
            </div>
          </div> */}
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-row w-full gap-6">
        <div className="mt-6 bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-center gap-6 w-3/4">
          {isEditing ? (
            <>
              <div className="gap-2">
                <p>Contact us:</p>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-lg border border-gray-300 rounded-md p-2 w-56 focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                />
              </div>
              <div className="gap-2">
                <p>Address:</p>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="text-lg border border-gray-300 rounded-md p-2 w-72 focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                />
              </div>
            </>
          ) : (
            <>
              <p className="text-lg">Contact us: {phone}</p>
              <p className="text-lg text-center sm:text-left">
                Address: {address}
              </p>
            </>
          )}

          <button
            onClick={() => {
              setIsEditing(!isEditing);

              if (isEditing) {
                handleInfo();
              }
            }}
            className="ml-4 text-[#ff9800] hover:underline"
          >
            {isEditing ? "Done" : <Edit />}
          </button>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-center w-1/4">
          {isEditing1 ? (
            <>
              <div className="gap-2">
                <p>Average Price:</p>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="text-lg border border-gray-300 rounded-md p-2 w-40 focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                />
              </div>

            </>
          ) : (
            <>
              <p className="text-lg">Price: {price}</p>

            </>
          )}

          <button
            onClick={() => {
              setIsEditing1(!isEditing1);

              if (isEditing1) {
                handlePrice();
              }

            }}
            className="ml-4 text-[#ff9800] hover:underline"
          >
            {isEditing1 ? "Done" : <Edit />}
          </button>
        </div>
      </div>
      {/* Services */}
      <div className="mt-10 flex flex-wrap justify-left gap-8">
        {service.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-3xl shadow-md w-[280px] h-[300px] relative hover:shadow-lg transition cursor-pointer"
          >
            {/* Top image area */}
            <div className="bg-gray-200 rounded-t-3xl h-[164px] relative bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${service.serviceImage || i1})` }}
            >

              <button
                onClick={() => {

                  handleDeleteService(service._id);

                }}
                className="absolute top-2 right-2 hover: p-1 rounded-md shadow-sm"
              >
                <Trash2 size={18} className="text-gray-700" />
              </button>
            </div>

            {/* Title and edit icon */}
            <div className="flex justify-center items-center p-4">
              <p className="text-[16px] text-black">{service.serviceName}</p>
              {/* <Edit size={18} className="text-gray-500 cursor-pointer hover:text-[#ff9800]"/> */}


            </div>

            <button
              className="absolute bottom-2 right-2 p-1 rounded-md shadow-sm"
              onClick={() => {
                setEdit(true);
                setEditId(service._id);
                setServiceName(service.serviceName);
              }}
            >
              <Edit size={18} className="text-gray-500 cursor-pointer hover:text-[#ff9800]" />

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
                    {/* Service Image Label */}
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-[16px] text-black">Service Image</p>
                      {/* Close button */}
                      <button
                        className="text-gray-500 hover:text-[#ff9800] text-lg font-bold"
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
                        onClick={() => handleUpdate(editId)}
                        className="bg-[#ff9800] hover:bg-[#e68a00] text-white font-semibold text-[16px] rounded-[36px] px-[48px] py-[12px] transition-all duration-200 shadow-sm"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </button>



          </div>
        ))}

        {/* Centered Add Button */}
        <div className="flex justify-center w-[280px] h-[300px]">
          {/* Plus button */}
          <div
            onClick={() => setIsAdd(true)} // opens modal
            className="w-[60px] h-[60px] bg-gray-300 rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform cursor-pointer self-center align-center"
            title="Add new service"
          >
            <Plus size={28} />
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

      </div>

      {/* Task Logs */}
      <div className="mt-16">
        <h2 className="text-[32px] font-semibold mb-6">Task logs</h2>
        {/* <ComingSoonOverlay> */}
        <div className="flex flex-col gap-4">
          {task.map((task, i) => {
            return (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center hover:shadow-lg transition"
              >
                <p className="text-[16px]">
                  {task.customerName} has requested for a {task.serviceName} service
                </p>
                <button
                  onClick={() => handleStatusClick(task.Booking_id)}
                  className="px-4 py-2 rounded-full border-2 border-[#ff9800] text-black font-semibold"
                >
                  Done
                </button>
              </div>
            );
          })}
        </div>
        {/* </ComingSoonOverlay> */}
      </div>
    </div>
  );
}
