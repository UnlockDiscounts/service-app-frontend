import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const PaymentModal = ({ onClose }) => { // Component named PaymentModel
  // State 1: Ready to Scan/Upload -> 2: Upload Success -> 3: API Called
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null); 
  const navigate = useNavigate();

  // --- Utility Functions ---

  const handleFileChange = (event) => {
    // Stores the file object when the user selects an image
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleClose = () => {
    // Resets state and closes the modal
    setStep(1); 
    setImageFile(null);
    onClose(); 
  }

  // --- Core Action Functions ---

  const handleUpload = async() => {
    if (!imageFile) {
        alert("Please select an image to upload first or use the QR scanner space.");
        return;
    }
    // setLoading(true);
    
    const data = new FormData();
    data.append("receiptFile", imageFile);
    const token = localStorage.getItem("accessToken");

    try {
      const res = await axios.post(
        "https://service-app-backend-1.onrender.com/api/receipt/upload",
        data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      console.log(res?.data);
    

      alert(res?.data?.message);
      navigate("/success");

    } catch (err) {
      console.error(err);
    }
  };

 

  // --- Rendering Content based on Step (Column Layout in Step 1) ---
  let content;
  let button;

  if (step === 1) {
    // State 1: Column Layout (QR Space, then Image Uploader)
    content = (
      <div className="flex flex-col space-y-4">
        
        {/* 1. QR Scanner Space */}
        <div className="p-5 bg-gray-100 border border-gray-300 rounded-lg text-center">
          <p className="font-semibold text-gray-700">1. QR Scanner Space (Paste QR Here)</p>
          <p className="text-sm text-gray-500">This space is left for QR code scanning integration.</p>
        </div>
        
        {/* 2. Image Uploader */}
        <div className="p-4 bg-white border-2 border-dashed border-indigo-400 rounded-lg text-center">
            <label className="block text-md font-medium text-gray-700 mb-2">
                2. Image Upload (Select Receipt Image)
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {imageFile && (
                <p className="mt-2 text-sm text-green-600">Selected: {imageFile.name}</p>
            )}
        </div>
      </div>
    );
    
    // The single "Done" button at the bottom
    // button = (
    //   <button
    //     onClick={handleUpload}
    //     disabled={loading || !imageFile}
    //     className={`w-full py-2 mt-6 text-white font-semibold rounded-md transition duration-200 
    //       ${(loading || !imageFile) ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
    //   >
    //     {loading ? 'Processing...' : 'Done (Proceed with Upload)'}
    //   </button>
    // );

  } else if (step === 2) {
    // State 2: Successful Uploaded Done
    content = (
      <div className="flex flex-col items-center justify-center p-8 bg-green-100 border border-green-400 h-40 rounded-lg">
        <span className="text-xl font-bold text-green-700">Successful Uploaded Done!</span>
        <p className="text-sm text-green-600 mt-2">Image is successfully staged for API call.</p>
      </div>
    );
    // button = (
    //   <button
    //     onClick={handleApiCall}
    //     disabled={loading}
    //     className={`w-full py-2 mt-6 text-white font-semibold rounded-md transition duration-200 
    //       ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
    //   >
    //     {loading ? 'Calling API...' : '✅ Done (Call API)'}
    //   </button>
    // );
  } else if (step === 3) {
    // State 3: API Called / Complete
    content = (
      <div className="flex flex-col items-center justify-center p-8 bg-blue-100 border border-blue-400 h-40 rounded-lg">
        <span className="text-xl font-bold text-blue-700">Process Complete.</span>
        <p className="text-sm text-blue-600 mt-2">API has executed successfully.</p>
      </div>
    );
    // button = (
    //   <button
    //     onClick={handleClose} 
    //     className="w-full py-2 mt-6 text-white font-semibold rounded-md bg-green-600 hover:bg-green-700 transition duration-200"
    //   >
    //     Done (Close Model)
    //   </button>
    // );
  }

  // --- Modal Structure (Centered with Gray Backdrop) ---
  return (
    // Backdrop (Fixed, fullscreen, semi-transparent gray background)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
      
      {/* Modal content container */}
      <div 
        className="max-w-md w-full mx-4 p-6 bg-white shadow-2xl rounded-lg relative" 
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Payment Model
        </h2>
        
        {/* ❌ Cross Mark Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-3xl font-light leading-none"
        >
          &times;
        </button>
        
        {content}
        <button
        onClick={handleUpload} 
        className="w-full py-2 mt-6 text-white font-semibold rounded-md bg-green-600 hover:bg-green-700 transition duration-200"
      >
        Done
      </button>
      </div>
    </div>
  );
};

export default PaymentModal;