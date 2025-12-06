import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import api from './api';
import unlockdiscounts from "../assets/unlockdiscounts.logo.jpg";
import logoo from '../assets/logoo.jpg'
import "../index.css";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await api.post(
        "/auth/logout",
        {}
      );

      console.log("Logout successful:", res.data);
      setMenuOpen(false);
      localStorage.removeItem("user");
      window.location.href = "/allservices";
    } catch (error) {
      console.log("Logout error:", error.response?.status, error.response?.data || error.message);
    }
  };

  const handleProfile = () => {


    if (user.role === "customer") {
      navigate("/customerDashboard");
    }
    else if (user.role === "provider") {
      navigate("/providerDashboard");
    }

  }
  // close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[65px] flex justify-between items-center px-6 border-b-2 border-[#FF8900] bg-white z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logoo} alt="logo" className="h-10 w-10" />
        <h1 className="text-2xl font-bold">
          <span>Mend</span>
          <span className="text-[#FF9800]">ora</span>
        </h1>
      </div>

      {/* Navbar Links */}
      <div className="hidden md:flex items-center gap-10 mr-10">
        <nav>
          <ul className="flex items-center gap-9 text-xl font-[30px] py-2">
            <a href="/">Home</a>
            <a href="/allservices">Services</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>

            {user ? (
              <div className="relative" ref={menuRef}>
                <div
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="w-10 h-10 flex items-center justify-center bg-[#FF9800] rounded-full text-lg font-semibold text-white cursor-pointer select-none"
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg z-50">
                    <a
                      className="block px-4 py-2 hover:bg-gray-100 rounded-t-xl"
                      onClick={() => {
                        setMenuOpen(false)
                        handleProfile();
                      }}
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-xl"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <span>
                <a
                  className="border-2 border-[#FF9800] px-6 py-2 rounded-[10px] font-semibold"
                  href="/login"
                >
                  Login
                </a>
              </span>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
