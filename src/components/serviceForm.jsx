import {
  Building,
  CircleDollarSignIcon,
  List,
  MailOpen,
  MapPinHouse,
  Phone,
  ShieldCheck,
  SquareUser,
  Tags,
  Lock,
  Link
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OtpVerify from './otpVerify'
import ComingSoonOverlay from './comingSoonOverlay';


const Form = () => {

  const [isChecked, setIsChecked] = useState(false);
  const [verify,setVerify] = useState(false);
  const navigate = useNavigate();

  // Form fields
  const [buisnessname, setBusinessname] = useState("");
  const [ownername, setOwnername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [serviceCategory, setServiceCateogry] = useState("");
  const [weblink, setWeblink] = useState("");
  const [serviceOffered, setserviceOffered] = useState("");
  const [pricing, setpricing] = useState("");
  const [emergencycontact, setemergencycontact] = useState("");
  const [addressProofFile, setAddressProofFile] = useState(null);
  const [experienceFile, setExperienceFile] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);


  // Error state
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!buisnessname.trim())
      newErrors.buisnessname = "Business Name is required";
    if (!ownername.trim()) newErrors.ownername = "Owner Name is required";
    if (!/^\d{10}$/.test(phone)) newErrors.phone = "Enter valid phone number";
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter valid email";
    if (!password) newErrors.password = "Enter valid password"
    if (!address.trim()) newErrors.address = "Address is required";
    if (!serviceCategory)
      newErrors.serviceCategory = "Select category for service";
    if (!serviceOffered.trim())
      newErrors.serviceOffered = "Enter service names separated by a comma";
    if (!pricing.trim())
      newErrors.pricing = "Enter valid Pricing";
    if (!/^\d{10}$/.test(emergencycontact))
      newErrors.emergencycontact = "Enter valid emergency contact number";

    return newErrors;
  };

  const handleVerifyEmail = async () => {

    setShowOtp(true);
    try {
      const res = await axios.post(
        "https://service-app-backend-1.onrender.com/api/email/request-otp/email",
        { email }
      );
      console.log("OTP response:", res.data);

    } catch (error) {
      console.error("Error while requesting OTP:", error.response?.data || error.message);
    }

  }

  const handleSubmit = async (e) => {

    e.preventDefault(); 

    // if(!verify)
    // {
    //    alert("Please Verify Email");
    //    return;
    // }

    setLoading(true);

    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append("name", ownername);
    formData.append("email", email);
    formData.append("password", password); // fixed as per your structure
    formData.append("role", "provider");
    formData.append("phone_number", phone);
    formData.append("address", address);
    formData.append("providerDetails[service_category]", serviceCategory);
    formData.append("providerDetails[business_name]", buisnessname);
    formData.append("providerDetails[emergency_contact]", emergencycontact);
    formData.append("providerDetails[average_pricing]", pricing);
    formData.append("providerDetails[websiteLink]", weblink);



    // Handle multiple services (comma-separated)
    const serviceNames = serviceOffered.split(",").map((s) => s.trim());

    serviceNames.forEach((name, index) => {
      formData.append(
        `providerDetails[services][${index}][serviceName]`,
        name
      );
    });

    formData.append("addressproof", addressProofFile);
    formData.append("experience", experienceFile);

    try {
      const res = await axios.post(
        "https://service-app-backend-1.onrender.com/api/auth/register",
        formData
      );

      console.log("Signup Success:", res.data);
      const { accessToken, refreshToken, user } = res?.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      alert("Provider registered successfully!");
      navigate("/payments");
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
        "Signup failed. Please check your details and try again."
      );
    }
    setLoading(false);

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto p-6 space-y-6 rounded-lg shadow bg-white"
    >
      {/* Business name */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Building className="text-[#ff8801]" />
          <h1 className="text-lg md:text-xl font-bold">Business Name*</h1>
        </div>
        <input
          onChange={(e) => setBusinessname(e.target.value)}
          type="text"
          placeholder="Enter your business name"
          className="w-full border border-gray-300 rounded-md p-4 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff8901]"
        />
        {errors.buisnessname && (
          <p className="text-red-500 text-sm">{errors.buisnessname}</p>
        )}
      </div>

      {/* Owner name */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <SquareUser className="text-[#ff8901]" />
          <h1 className="text-lg md:text-xl font-bold">Owner's Full Name*</h1>
        </div>
        <input
          type="text"
          onChange={(e) => setOwnername(e.target.value)}
          placeholder="Enter your full name"
          className="w-full border border-gray-300 rounded-md p-4 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff8901]"
        />
        {errors.ownername && (
          <p className="text-red-500 text-sm">{errors.ownername}</p>
        )}
      </div>

      {/* Phone & Email */}
      <div className="flex flex-col md:flex-row md:justify-between md:space-x-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-[48%]">
          <div className="flex items-center space-x-2 mb-3">
            <Phone className="text-[#ff8901]" />
            <h1 className="text-lg md:text-xl font-bold">Phone number*</h1>
          </div>
          <input
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full p-4 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff8901]"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        <div className="w-full md:w-[48%]">
          <div className="flex items-center space-x-2 mb-1.5">
            <MailOpen className="text-[#ff8901]" />
            <h1 className="text-lg md:text-xl font-bold">Email*</h1>
          </div>
          <div className="flex items-center rounded-lg p-0">

            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="your@gmail.com"
              className="w-full p-4 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff8901]"
            />

            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <button
              type="button"
              onClick={handleVerifyEmail} // your verification handler
              className="bg-white-200 text-gray-700 px-4 py-4 m-1 rounded-lg hover:bg-gray-300 transition border-2 h-1/3"
            >
              Verify
            </button>

            {showOtp && <OtpVerify onClose={() => setShowOtp(false)} email={email} verified={()=>{
              setVerify(true);
            }} requestOtp={()=>{
                handleVerifyEmail();
              }}/>}
          </div>
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Lock className="text-[#ff8901]" />
          <h1 className="text-lg md:text-xl font-bold">Password*</h1>
        </div>
        <input
          type="password"
          placeholder="● ● ● ● ● ●"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff8901]"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <MapPinHouse className="text-[#ff8901]" />
          <h1 className="text-lg md:text-xl font-bold">
            Registered Business Address*
          </h1>
        </div>
        <textarea
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your business address"
          className="w-full p-4 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff8901]"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}
      </div>

      {/* Upload address proof */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <MapPinHouse className="text-[#ff8901]" />
          <h1 className="text-lg md:text-xl font-bold">Upload Any Government ID Proof*</h1>
        </div>
        <input
          type="file"
          onChange={(e) => setAddressProofFile(e.target.files[0])}
          className="p-4 w-full border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff8901]"
          required
        />
      </div>

      {/* Service Category & Website Link */}
      <div className="flex flex-col md:flex-row md:justify-between md:space-x-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-[59%]">
          <div className="flex items-center space-x-2 mb-3">
            <Tags className="text-[#ff8901]" />
            <h1 className="text-lg md:text-xl font-bold">Service Category*</h1>
          </div>
          <input
            onChange={(e) => setServiceCateogry(e.target.value)}
            placeholder="Add a Category"
            className="w-full p-4 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff8901]"
            required
          />
          {errors.serviceCategory && (
            <p className="text-red-500 text-sm">{errors.serviceCategory}</p>
          )}
        </div>

        <div className="w-full md:w-[39%]">
          <div className="flex items-center space-x-2 mb-3">
            <Link className="text-[#ff8901]" />
            <h1 className="text-lg md:text-xl font-bold">Website Link</h1>
          </div>
          <input
            onChange={(e) => setWeblink(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff8901]"
            placeholder="Add a Link to your website"
          />
        </div>
      </div>

      {/* Services Offered & Pricing */}
      <div className="flex flex-col md:flex-row md:justify-between md:space-x-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-[59%]">
          <div className="flex items-center space-x-2 mb-3">
            <List className="text-[#ff8901]" />
            <h1 className="text-lg md:text-xl font-bold">Services Offered*</h1>
          </div>
          <input
            onChange={(e) => setserviceOffered(e.target.value)}
            type="text"
            placeholder="Service offered (comma-separated)"
            className="w-full p-4 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff8901]"
          />
          {errors.serviceOffered && (
            <p className="text-red-500 text-sm">{errors.serviceOffered}</p>
          )}
        </div>

        <div className="w-full md:w-[39%]">
          <div className="flex items-center space-x-2 mb-3">
            <CircleDollarSignIcon className="text-[#ff8901]" />
            <h1 className="text-lg md:text-xl font-bold">Average Price*</h1>
          </div>
          <input
            type="text"
            onChange={(e) => setpricing(e.target.value)}
            placeholder="Enter pricing (comma-separated)"
            className="w-full p-4 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff8901]"
          />
          {errors.pricing && (
            <p className="text-red-500 text-sm">{errors.pricing}</p>
          )}
        </div>
      </div>

      {/* Experience certificates */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <ShieldCheck className="text-[#ff8901]" />
          <h1 className="text-lg md:text-xl font-bold">
            Experience Certificates/ Client References*
          </h1>
        </div>
        <input
          type="file"
          onChange={(e) => setExperienceFile(e.target.files[0])}
          className="w-full p-4 border border-gray-400 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff8901]"
          required
        />
      </div>

      {/* Emergency contact */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Phone className="text-[#ff8901]" />
          <h1 className="text-lg md:text-xl font-bold">Emergency Contact Number*</h1>
        </div>
        <input
          placeholder="Enter emergency contact number"
          onChange={(e) => setemergencycontact(e.target.value)}
          type="text"
          className="w-full p-4 border border-gray-400 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff8901]"
        />
        {errors.emergencycontact && (
          <p className="text-red-500 text-sm">{errors.emergencycontact}</p>
        )}
      </div>

      {/* Checkbox & Submit */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isChecked}
            className="accent-[#ff8901] w-5 h-5 rounded focus:ring-2 focus:ring-[#ff8901]"
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <label className="text-gray-700 text-sm md:text-base">
            I agree to the terms and conditions and privacy policy.
          </label>
        </div>
        <button
          type="submit"
          className={`w-full md:w-[30%] py-3 rounded-md font-medium transition-all duration-200 ${isChecked
            ? "bg-[#ff8901] hover:bg-[#ff8910] text-black"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          disabled={!isChecked}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </form>

  );
};

export default Form;
