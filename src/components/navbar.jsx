// import { useState, useEffect, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from 'axios';
// import api from './api';
// import unlockdiscounts from "../assets/unlockdiscounts.logo.jpg";
// import logoo from '../assets/logoo.jpg'
// import "../index.css";

// const Navbar = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("accessToken");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef(null);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const res = await api.post(
//         "/auth/logout",
//         {}
//       );

//       console.log("Logout successful:", res.data);
//       setMenuOpen(false);
//       localStorage.removeItem("user");
//       window.location.href = "/allservices";
//     } catch (error) {
//       console.log("Logout error:", error.response?.status, error.response?.data || error.message);
//     }
//   };

//   const handleProfile = () => {


//     if (user.role === "customer") {
//       navigate("/customerDashboard");
//     }
//     else if (user.role === "provider") {
//       navigate("/providerDashboard");
//     }

//   }
//   // close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="fixed top-0 left-0 w-full h-[75px] flex justify-between items-center px-6 border-b-2 border-[#FF8900] bg-white z-50">
//       {/* Logo */}
//       <div className="flex items-center gap-2">
//         <img src={logoo} alt="logo" className="h-10 w-10" />
//         <h1 className="text-3xl font-bold">
//           <span>Mend</span>
//           <span className="text-[#FF9800]">ora</span>
//         </h1>
//       </div>

//       {/* Navbar Links */}
//       <div className="hidden md:flex items-center gap-10 mr-10">
//         <nav>
//           <ul className="flex items-center gap-9 text-2xl font-[30px] py-2">
//             <a href="/">Home</a>
//             <a href="/allservices">Services</a>
//             <a href="/about">About Us</a>
//             <a href="/contact">Contact</a>

//             {user ? (
//               <div className="relative" ref={menuRef}>
//                 <div
//                   onClick={() => setMenuOpen(!menuOpen)}
//                   className="w-10 h-10 flex items-center justify-center bg-[#FF9800] rounded-full text-lg font-semibold text-white cursor-pointer select-none"
//                 >
//                   {user.name.charAt(0).toUpperCase()}
//                 </div>

//                 {menuOpen && (
//                   <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg z-50">
//                     <a
//                       className="block px-4 py-2 hover:bg-gray-100 rounded-t-xl"
//                       onClick={() => {
//                         setMenuOpen(false)
//                         handleProfile();
//                       }}
//                     >
//                       Profile
//                     </a>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-xl"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <span>
//                 <a
//                   className="border-2 border-[#FF9800] px-6 py-2 rounded-[10px] font-semibold"
//                   href="/login"
//                 >
//                   Login
//                 </a>
//               </span>
//             )}
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


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
    // Close the mobile menu when navigating
    setMenuOpen(false); 

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
      // Check if click is outside both the desktop dropdown (menuRef) AND the mobile menu button
      // The mobile menu dropdown itself will be handled by the close button or link clicks.
      // This is primarily for the desktop dropdown logic.
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Only set to false if the desktop menu is the one open
        // Mobile menu is controlled by a separate button and link clicks
        // A better approach for the mobile menu is to just close it when a link is clicked.
        // Let's keep the menuRef logic focused on the desktop profile dropdown.
        const profileAvatar = document.getElementById('profile-avatar-desktop');
        const isProfileAvatarClick = profileAvatar && profileAvatar.contains(event.target);
        
        if (!isProfileAvatarClick) {
             setMenuOpen(false);
        }
      }
      
      // Additional logic to close the mobile menu if needed, but often
      // a close button or link click is sufficient for mobile UX.
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to toggle the mobile menu state
  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-[75px] flex justify-between items-center px-6 border-b-2 border-[#FF8900] bg-white z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logoo} alt="logo" className="h-10 w-10" />
        <h1 className="text-3xl font-bold">
          <span>Mend</span>
          <span className="text-[#FF9800]">ora</span>
        </h1>
      </div>

      {/* Navbar Links - Desktop */}
      <div className="hidden md:flex items-center gap-10 mr-10">
        <nav>
          <ul className="flex items-center gap-9 text-2xl font-[30px] py-2">
            <a href="/">Home</a>
            <a href="/allservices">Services</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>

            {user ? (
              <div className="relative" ref={menuRef}>
                <div
                  id="profile-avatar-desktop" // Added ID for potential external click handling
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="w-10 h-10 flex items-center justify-center bg-[#FF9800] rounded-full text-lg font-semibold text-white cursor-pointer select-none"
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg z-50">
                    <a
                      className="block px-4 py-2 hover:bg-gray-100 rounded-t-xl cursor-pointer" // Added cursor-pointer
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
      
      {/* Hamburger Menu Icon - Mobile */}
      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-gray-800 p-2 focus:outline-none"
        >
          {/* Hamburger Icon (Three lines) */}
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-[#FF9800] transform transition duration-300 ease-in-out ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-[#FF9800] transition duration-300 ease-in-out ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-0.5 w-6 bg-[#FF9800] transform transition duration-300 ease-in-out ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Content (Hamburger Screen) */}
      {menuOpen && (
        <div className="md:hidden fixed top-[75px] left-0 w-full h-[calc(100vh-75px)] bg-white shadow-xl z-40 p-6 transition-transform duration-300 ease-in-out">
          <ul className="flex flex-col gap-6 text-xl font-medium">
            <a 
              href="/" 
              onClick={() => setMenuOpen(false)} // Close menu on click
              className="py-2 border-b border-gray-200"
            >
              Home
            </a>
            <a 
              href="/allservices" 
              onClick={() => setMenuOpen(false)} // Close menu on click
              className="py-2 border-b border-gray-200"
            >
              Services
            </a>
            <a 
              href="/about" 
              onClick={() => setMenuOpen(false)} // Close menu on click
              className="py-2 border-b border-gray-200"
            >
              About Us
            </a>
            <a 
              href="/contact" 
              onClick={() => setMenuOpen(false)} // Close menu on click
              className="py-2 border-b border-gray-200"
            >
              Contact
            </a>

            {/* User/Login Logic for Mobile */}
            {user ? (
              <div className="pt-4 space-y-4">
                <div 
                  className="flex items-center gap-3 py-2 cursor-pointer"
                  onClick={() => {
                    setMenuOpen(false);
                    handleProfile();
                  }}
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-[#FF9800] rounded-full text-sm font-semibold text-white select-none">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold">Profile</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 font-semibold text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a
                className="mt-4 inline-block text-center border-2 border-[#FF9800] text-[#FF9800] px-6 py-2 rounded-[10px] font-semibold"
                href="/login"
                onClick={() => setMenuOpen(false)} // Close menu on click
              >
                Login
              </a>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;