import { useState } from "react";
import bglanding from "../assets/bglanding.svg";
import axios from "axios";

const BookNow = ({ businessName, onClose, services, id }) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("accessToken");


    const [loading, setLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const email = user?.email;
    const fullName = user?.name;
    // const [phone,setPhone] = useState("");



    const handleSelect = (service) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };


    const handleSubmit = async (e) => {



        setLoading(true);
        e.preventDefault(); // prevents page reload and route change
        try {
            const res = await axios.post(
                "https://service-app-backend-1.onrender.com/api/booking/book",
                { customerId: user?.id, providerId: id, serviceNames: selectedServices }
                //         ,
                //         {
                //   headers: {
                //     Authorization: `Bearer ${token}`,
                //   },
                // }
            );
            console.log(res?.data);
            alert("Booking Query Successfully Sent !!");
            onClose();


        } catch (error) {
            console.error("Error sending contact message:", error);
        }
        setLoading(false);
    };

    return (
        // ✅ Overlay background
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-20 flex items-center justify-center z-50"
            onClick={onClose}
        >
            {/* ✅ Modal container */}
            <div
                className="relative bg-white w-[100%] sm:w-[600px] rounded-2xl shadow-1xl overflow-hidden"
                onClick={(e) => e.stopPropagation()} // prevent overlay close when clicking inside form
            >
                {/* <div
          className="h-28 bg-cover bg-center"
          style={{ backgroundImage: `url(${bglanding})` }}
        ></div> */}

                <div className="p-6">
                    <h1 className="font-poppins text-2xl font-semibold text-gray-800 text-center">
                        Booking Form
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={fullName}
                                // onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                                className="shadow-sm border border-gray-300 p-2 rounded-xl w-full bg-gray-100 text-gray-600 cursor-not-allowed"
                                readOnly
                            />
                        </div>

                        <div>
                            <label htmlFor="mail" className="font-medium text-gray-700">
                                E-mail
                            </label>
                            <input
                                type="email"
                                id="mail"
                                value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="shadow-sm border border-gray-300 p-2 rounded-xl w-full bg-gray-100 text-gray-600 cursor-not-allowed"
                                readOnly
                            />
                        </div>

                        {/* <div>
                            <label htmlFor="tel" className="font-medium text-gray-700">
                                Phone
                            </label>
                            <div className="flex gap-2">
                                <input value={+91} className="shadow-sm border border-gray-300 p-2 rounded-xl w-24 sm:w-28 bg-gray-100 text-gray-600 cursor-not-allowed">
                                    <option value="+91">+91</option>
                                </input>
                                <input
                                    type="tel"
                                    id="tel"
                                    value={phone}
                                      onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter contact number"
                                    className="shadow-sm border border-gray-300 p-2 rounded-xl w-full bg-gray-100 text-gray-600 cursor-not-allowed"
                                    readOnly
                                />
                            </div>
                        </div> */}

                        <div>
                            <label htmlFor="business" className="font-medium text-gray-700">
                                Business Name
                            </label>
                            <input
                                type="text"
                                id="business"
                                value={businessName || ""}
                                readOnly
                                className="shadow-sm border border-gray-300 p-2 rounded-xl w-full bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                        </div>
                        <div className="relative w-full">
                            <label htmlFor="service" className="font-medium text-gray-700">
                                Services Requested
                            </label>

                            {/* Dropdown trigger */}
                            <div
                                id="service"
                                onClick={() => setIsOpen(!isOpen)}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-xl cursor-pointer bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                            >
                                {selectedServices.length > 0
                                    ? selectedServices.join(", ")
                                    : "Select services"}
                            </div>

                            {/* Dropdown options */}
                            {isOpen && (
                                <div className="flex flex-col mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto ">
                                    {services?.map((service, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleSelect(service.serviceName)}
                                            className={`px-4 py-2 cursor-pointer hover:bg-amber-100 ${selectedServices.includes(service.serviceName)
                                                ? "bg-amber-50 font-medium"
                                                : ""
                                                }`}
                                        >
                                            {service.serviceName}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                        <div className="flex justify-between items-center pt-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2 rounded-xl border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="bg-gradient-to-r from-[#FFC727] to-[#FF9800] px-6 py-2 rounded-xl font-medium text-white hover:scale-105 transition-transform"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookNow;
