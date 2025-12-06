import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginImg from "../assets/login.jpg";
import logo from "../assets/unlockdiscounts.logo.jpg";
import logoo from '../assets/logoo.jpg'
import axios from 'axios';
import Rectangle from '../assets/Rectangle.png';
import img1 from '../assets/img1.svg';
import img2 from '../assets/img2.svg';
import img3 from '../assets/img3.svg';
import img4 from '../assets/img4.svg';
import api from './api';
import "../index.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();
    setError("");
    setLoading(true);

    try {

      const response = await api.post(
        "/auth/login",
        { email, password }
      );
      console.log(response?.data);
      const { accessToken, refreshToken, user } = response?.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      alert(response?.data?.message);


      if (user.role === "customer") {
        navigate("/customerDashboard");
      }
      else if (user.role === "provider") {
        navigate("/providerDashboard");
      }


    } catch (error) {
      setError(error.response?.data.error);

    }

    setLoading(false);
  }
  return (
    //     <div className="min-h-screen flex">
    //       {/* Left Section (Image) */}
    //       <div className="flex">
    //   <img
    //     src={Rectangle}
    //     alt="Login"
    //     className="w-3/4 h-auto object-cover rounded-xl"
    //   />
    // </div>


    //       {/* Right Section (Form) */}
    //       <div className="min-w-[400px] bg-white flex flex-col justify-center">
    //         <div className="flex flex-col items-center mb-8">
    //           <img src={logoo} alt="Logo" className="w-16 h-16 rounded-xl mb-2" />
    //           {/* <h1 className="text-2xl font-bold text-gray-800">Unlock Discounts</h1> */}
    //           <h1 className="text-2xl font-bold">
    //           <span>Mend</span>
    //           <span className="text-[#FF9800]">ora</span>
    //         </h1>
    //         </div>

    //         <h2 className="text-3xl text-center font-semibold mb-2">Login</h2>
    //         <p className="text-center text-gray-500 mb-6">Enter your details to sign in</p>

    //         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

    //         <form onSubmit={handleLogin} className="space-y-5">
    //           <div>
    //             <label className="block mb-1 text-gray-700">Email</label>
    //             <input
    //               type="email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               placeholder="example@gmail.com"
    //               required
    //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
    //             />
    //           </div>

    //           <div>
    //             <label className="block mb-1 text-gray-700">Password</label>
    //             <input
    //               type="password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               placeholder="●●●●●●"
    //               required
    //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
    //             />
    //           </div>

    //           <button
    //             type="submit"
    //             disabled={loading}
    //             className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
    //           >
    //             {loading ? "Signing In..." : "Sign In"}
    //           </button>
    //         </form>

    //         <p className="text-center mt-6">
    //           Don’t have an account?{" "}
    //           <Link to="/usersignup" className="text-blue-600 hover:underline">
    //             Sign up
    //           </Link>
    //         </p>
    //       </div>
    //     </div>
    <div className="min-h-screen flex">
      {/* Left Section (Image) */}
      <div className="w-1/2 h-screen overflow-hidden relative flex items-center justify-center">
  <img
    src={img1}
    alt="Login"
    className="slide-img delay-0 w-full h-full object-cover opacity-0 animate-slide-in-1 z-40"
  />
  <img
    src={img2}
    alt="Login"
    className="slide-img delay-1 w-full h-full object-cover opacity-0 animate-slide-in-1 z-30"
  />
  <img
    src={img3}
    alt="Login"
    className="slide-img delay-2 w-full h-full object-cover opacity-0 animate-slide-in-1 z-20"
  />
  <img
    src={img4}
    alt="Login"
    className="slide-img delay-3 w-full h-full object-cover opacity-0 animate-slide-in-1 z-10"
  />
</div>



      {/* Right Section (Form) */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-12">
         <div className="flex items-center gap-3 mb-6 justify-center">
         
          <img className="size-16 rounded-2xl flex items-center justify-center" src={logoo} alt="/" />
       
          <h1 className="text-2xl font-bold">
          <span>Mend</span>
          <span className="text-[#FF9800]">ora</span>
        </h1>
        </div>

        <h2 className="text-3xl text-center font-semibold mb-2">Login</h2>
        <p className="text-center text-gray-500 mb-6">Enter your details to sign in</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="●●●●●●"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/usersignup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>

  );
};

export default Login;