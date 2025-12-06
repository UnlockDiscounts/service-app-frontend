import {  useState } from "react";
import bglanding from "../assets/bglanding.svg";
import axios from 'axios';
import api from './api';


const Contact = ({setheading}) => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading,setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault(); // prevents page reload and route change
    try {
      const res = await api.post(
        "/email/contact-us",
        { fullName, email, phone, message }
      );
      alert("Query successfully sent !!");
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");

    } catch (error) {
      console.error("Error sending contact message:", error);
    }
    setLoading(false);
  };

  return (
    <div
      className="relative bg-cover h-screen w-full px-4"
      style={{ backgroundImage: `url(${bglanding})` }}
    >
      <div className="absolute bottom-40 right-0 opacity-80">
        <img alt="" className="w-32 sm:w-48 md:w-64" />
      </div>

      <div className="flex flex-col justify-center items-center gap-2 mt-10 mb-8">
        <h1 className="font-semibold font-poppins text-3xl sm:text-4xl md:text-5xl text-center">
          {setheading || ""}
        </h1>

        <div className="container mx-auto justify-center items-center p-4 
                        w-full sm:w-3/4 md:w-2/3 lg:w-2/5 
                        shadow-xl shadow-gray-500 rounded-3xl bg-white mb-8 mt-6">
          <div className="p-5">
            <h1 className="font-poppins text-xl sm:text-2xl md:text-3xl font-semibold text-left">
              Contact form
            </h1>
          </div>

          <div className="flex flex-col justify-center items-center">
            {/* ✅ Removed action="submit", added onSubmit */}
            <form onSubmit={handleSubmit} className="flex flex-col p-4 w-full space-y-4">

              <div>
                <label htmlFor="name" className="font-poppins font-medium text-lg">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="shadow-md border p-2 rounded-xl w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="mail" className="font-poppins font-medium text-lg">
                  E-mail
                </label>
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your business email"
                  className="shadow-md border p-2 rounded-xl w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="tel" className="font-poppins font-medium text-lg">
                  Phone
                </label>
                <div className="flex gap-2 w-full">
                  <select className="shadow-md border p-2 rounded-xl w-24 sm:w-28">
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                  </select>
                  <input
                    type="tel"
                    id="tel"
                    name="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your contact number"
                    className="shadow-md border p-2 rounded-xl flex-grow"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="font-poppins font-medium text-lg">
                  How can we help you?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  rows="4"
                  className="shadow-md border p-2 rounded-xl w-full"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end w-full">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#FFC727] to-[#FF9800] 
                             px-6 py-2 rounded-2xl font-medium text-white hover:scale-105 transition"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
