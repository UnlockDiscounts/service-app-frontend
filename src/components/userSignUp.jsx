import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from '../assets/login.jpg'
import unlockdiscounts from '../assets/unlockdiscounts.logo.jpg';
import logoo from '../assets/logoo.jpg'
import Rectangle from '../assets/Rectangle.png'
import '../App.css';
import axios from 'axios';
import OtpVerify from './otpVerify'
import { Link } from "react-router-dom";


const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [verify,setVerify] = useState(false);

  const navigate = useNavigate();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("role", "customer");
  formData.append("phone_number", phone);
  formData.append("address", address);


  const handleVerifyEmail = async () => {
     
    setShowOtp(true);
    try {
    const res = await axios.post(
      "https://service-app-backend-1.onrender.com/api/email/request-otp/email", 
    {email}
    );
    console.log("OTP response:", res.data);

  } catch (error) {
    console.error("Error while requesting OTP:", error.response?.data || error.message);
  }

  }

  const handleSignUp = async () => {

    if(!verify)
    {
       alert("Please Verify Email");
       return;
    }
    
    setLoading(true);

    try {
      const res = await axios.post("https://service-app-backend-1.onrender.com/api/auth/register",
        formData
      );
      const { accessToken, refreshToken, user } = res?.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      alert(res?.data?.message);
      console.log(res?.data);
      navigate('/allservices');

    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
    setLoading(false);

  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background */}
      <div className="w-1/2 h-screen overflow-hidden">
  <img
    className="w-full h-full object-cover"
    src={Rectangle}
    alt=""
  />
</div>

      {/* Right side - Login form */}
      <div className=" w-1/2 bg-white flex flex-col justify-center px-12">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6 justify-center">
          {/* <div className="w-20 h-20 rounded-3xl flex items-center justify-center"> */}
          <img className="size-16 rounded-2xl flex items-center justify-center" src={logoo} alt="/" />
          {/* </div> */}
          <h1 className="text-2xl font-bold">
          <span>Mend</span>
          <span className="text-[#FF9800]">ora</span>
        </h1>
        </div>

        {/* SignUp title */}
        <h2 className="text-3xl font-bold text-center mb-3">Sign Up</h2>
        <p className="text-center text-gray-600 mb-8">Enter the details to sign in</p>

        {/* Form */}
        <div className="space-y-4">
          {/* Email field */}
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">E-mail</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleVerifyEmail} // your verification handler
                className="bg-gray-200 text-gray-700 px-4 py-2 m-1 rounded-lg hover:bg-gray-300 transition"
              >
                Verify
              </button>
              {showOtp && <OtpVerify onClose={() => setShowOtp(false)} email={email} verified={()=>{
                setVerify(true);
                setShowOtp(false);

              }}  requestOtp={()=>{
                handleVerifyEmail();
              }}/>}
            </div>
          </div>


          {/* Password field */}
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              placeholder="● ● ● ● ● ●"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>



          {/* Sign up button */}
          <button
            className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors"
            onClick={handleSignUp}
            disabled={loading}
          >
          {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-center mt-6">
          Are you a Service Provider?{" "}
          <Link to="/serviceproviderlogin" className="text-blue-600 hover:underline">
          Register Here
          </Link>
        </p>


        </div>
      </div>
    </div>
  );
};
export default SignUp;
