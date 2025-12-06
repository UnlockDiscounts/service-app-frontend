import { useState } from "react";
import { useNavigate } from "react-router-dom";
import customer from '../assets/customer.jpg';
import provider from '../assets/provider.jpg'
import Background from '../assets/Background.svg';

const Role = () => {
  const [selectedRole, setSetselectedRole] = useState("");
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSetselectedRole(role);
    if (role === "customer") {
      navigate("/allservices");
    } else if (role === "serviceProvider") {
      navigate("/serviceproviderlogin");
    }
  };
  return (
    <div className="flex w-full justify-center items-center min-h-screen" 
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-16 pt-16 rounded-xl w-[600px] h-[450px]">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-semibold text-center">Choose Your Role</h1>
          <p className="text-gray-600 text-xl">
            Are you looking for services or offering them?
          </p>
        </div>

        <div className="flex flex-row items-center gap-6 mt-10 justify-between">
          <button
            onClick={() => handleRoleSelection("customer")}
            className="rounded-[500px] flex flex-col items-center justify-start text-center group 
               transition-all duration-200"
          >
            {/* Image container */}
            <div className="
        w-full max-w-[250px] h-[200px] p-2 
        relative rounded-[500px] overflow-hidden 
        flex items-center !hover:justify-center border-2 border-gray-200
    ">
              {/* Actual image */}
              <img
                src={customer}
                alt="customer"
                className="
                w-full h-4/6 object-contain rounded-full
                transition-all duration-300
            "
              />

              {/* SIMPLE ORANGE CIRCULAR OVERLAY (opacity only, no shadow) */}
              <div
                className="
                absolute inset-0 rounded-2xl 
                bg-amber-500 
                opacity-0 group-hover:opacity-20
                transition-opacity duration-300
            "
              ></div>
            </div>

            {/* Text */}
            <div className="mt-3 transition-colors duration-300">
              <h3
                className="
                text-gray-800 text-[20px] font-medium whitespace-pre-line leading-snug
                transition-colors duration-300
                group-hover:text-amber-500 px-12
            "
              >
                I'm a Customer 
              </h3>
            </div>
          </button>
          <button
            onClick={() => handleRoleSelection("serviceProvider")}
            className="rounded-[500px] flex flex-col items-center justify-start text-center group 
               transition-all duration-200"
          >
            {/* Image container */}
            <div className="
        w-full max-w-[250px] h-[200px] p-2 
        relative rounded-[500px] overflow-hidden 
        flex items-center justify-center border-2 border-gray-200
    ">
              {/* Actual image */}
              <img
                src={provider}
                alt="provider"
                className="
                w-full h-4/6 object-contain rounded-2xl
                transition-all duration-300
            "
              />

              {/* SIMPLE ORANGE CIRCULAR OVERLAY (opacity only, no shadow) */}
              <div
                className="
                absolute inset-0 rounded-2xl 
                bg-amber-500 
                opacity-0 group-hover:opacity-20
                transition-opacity duration-300
            "
              ></div>
            </div>

            {/* Text */}
            <div className="mt-3 transition-colors duration-300">
              <h3
                className="
                text-gray-800 text-[20px] font-medium whitespace-pre-line leading-snug
                transition-colors duration-300
                group-hover:text-amber-500
            "
              >
                I'm a Service Provider
              </h3>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Role;

