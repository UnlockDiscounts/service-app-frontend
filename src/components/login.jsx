import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginImg from "../assets/login.jpg";
import logo from "../assets/unlockdiscounts.logo.jpg";
import logoo from '../assets/logoo.jpg'
import axios from 'axios';
import Rectangle from '../assets/Rectangle.png'
import api from './api';


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
      <div className="w-1/2 h-screen overflow-hidden">
        <img
          src={Rectangle}
          alt="Login"
          className="w-full h-full object-cover"
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
