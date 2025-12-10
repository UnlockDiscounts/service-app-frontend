import bglanding from "../assets/bglanding.svg";
import bw from '../assets/bw.png';
import Frame1 from '../assets/Frame1.png';
import { Link } from "react-router-dom";
import MendoraFooter from "./footer";


const About = () => {
  return (
    <>
    <div
      className=" bg-cover min-h-screen w-full py-10"
      style={{ backgroundImage: `url(${bglanding})` }}
    >
      <div className="md:px-16 py-12 font-poppins">
  <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-gray-900 drop-shadow-sm">
    About <span className="text-[#FF9800]">Us</span>
  </h1>

  <div className="gap-10 items-center">
    {/* Left Text Section */}
    <div>
      <p className="text-center mx-[190px] text-gray-700 text-base md:text-[28px] leading-relaxed mb-4">
        Welcome to{" "}
        <span className="font-bold">
          Mend<span className="text-[#FF9800]">ora</span>
        </span>
        , the simplest way to book trusted services at unbeatable prices.
      </p>

      <div className="flex justify-center mb-20">
  <Link to="/allservices">
    <button
      className=" text-[20px] mt-6 px-7 py-2 border-4 border-[#FFC727] rounded-md font-semibold hover:bg-[#FF9800] hover:text-white transition"
    >
      Explore Services
    </button>
  </Link>
</div>

    <div className="mx-[190px] mt-10 gap-10">
<h2 className="font-bold text-gray-900 text-4xl mb-10">
        Our <span className="text-[#FF9800] font-bold">Mission</span>
      </h2>


      <p className="text-gray-700 text-base md:text-[25px] leading-relaxed mb-20">
        Getting help for home, beauty, or wellness should be effortless. We make
        it easy by linking you with verified pros in your area.
      </p>
      
      <h2 className="font-semibold text-gray-900 text-4xl mb-10">
        Our <span className="text-[#FF9800] font-bold">Promise</span>
      </h2>

      <p className="text-center text-gray-700 text-base md:text-[25px] leading-relaxed mb-20">
        We focus on convenience and affordability so you can get back to your
        life.
      </p>

      <div className="flex gap-10">
      <div className="flex-1 bg-[#D7FFF9] pl-5 py-5 border rounded-md">
        <img className="mb-5" src={Frame1} alt=""/>
        <h2 className="font-bold mb-5">Trusted Professionals</h2>
        <h3>Every provider is rigorously vetted for quality and reliability</h3>
      </div>
      <div className="flex-1 bg-[#E2E8FE] pl-5 py-5  border rounded-md">
        <img className="mb-5" src={Frame1} alt=""/>
        <h2 className="font-bold mb-5">Exclusive Value</h2>
        <h3>Access special offers and the best prices, guaranteeing maximum value</h3>
      </div>
      <div className="flex-1 bg-[#F4E0FF] pl-5 py-5  border rounded-md">
        <img className="mb-5" src={Frame1} alt=""/>
        <h2 className="font-bold mb-5">Dedicated Support</h2>
        <h3>Our customer care team is always ready to help with any questions or concerns</h3>
      </div>

      </div>
      
    </div>
    </div>

 
  </div>
</div>

    </div>
    <MendoraFooter/>
</>
  );
};
export default About;