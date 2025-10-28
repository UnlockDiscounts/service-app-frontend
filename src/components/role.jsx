import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className=" flex w-full justify-center items-center mt-10">
      <div className=" bg-[#FFFBEE] p-10 rounded-xl">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-5xl font-bold text-center">Choose Your Role</h1>
          <p className="text-[#8C805E] text-xl">
            Are you looking for services or offering them?
          </p>
        </div>

        <div className="flex flex-col items-center gap-5 mt-10">
          <button
            onClick={() => handleRoleSelection("customer")}
            className="border-2 border-[#ff8901] rounded-3xl px-6 py-2"
          >
            I'm a Customer
          </button>
          <button
            onClick={() => handleRoleSelection("serviceProvider")}
            className="bg-[#ff8901] rounded-3xl px-6 py-2"
          >
            I'm a Service Provider
          </button>
        </div>
      </div>
    </div>
  );
};
export default Role;
