import bglanding from "../assets/bglanding.svg";
import bw from '../assets/bw.png';
import { Link } from "react-router-dom";


const About = () => {
  return (
    <div
      className=" bg-cover h-screen w-full "
      style={{ backgroundImage: `url(${bglanding})` }}
    >
      <div className="px-6 md:px-16 py-12 font-poppins">
  <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-gray-900 drop-shadow-sm">
    About Us
  </h1>

  <div className="grid md:grid-cols-2 gap-10 items-center">
    {/* Left Text Section */}
    <div>
      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
        Welcome to{" "}
        <span className="font-bold">
          Mend<span className="text-[#FF9800]">ora</span>
        </span>
        , the simplest way to book trusted services at unbeatable prices.
      </p>

      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
        Getting help for home, beauty, or wellness should be effortless. We make
        it easy by linking you with verified pros in your area.
      </p>

      <h2 className="font-semibold text-gray-900 text-xl mb-2">
        Our <span className="text-[#FF9800] font-bold">Promise</span>
      </h2>

      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
        We focus on convenience and affordability so you can get back to your
        life.
      </p>

      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base md:text-lg">
        <li>
          <span className="font-bold">Trusted Professionals:</span> Every
          provider is rigorously vetted for quality and reliability.
        </li>
        <li>
          <span className="font-bold">Exclusive Value:</span> Access special
          offers and the best prices, guaranteeing maximum value.
        </li>
        <li>
          <span className="font-bold">Simplicity & Transparency:</span> Enjoy
          easy booking with upfront, transparent pricing—no hidden fees.
        </li>
        <li>
          <span className="font-bold">Convenience:</span> Find, compare, and
          book all your services in one user-friendly spot.
        </li>
      </ul>

      <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-4">
        Let <span className="font-semibold">Mendora</span> help you unlock the
        freedom of affordable, reliable service today!
      </p>
      <Link to="/allservices">
      <button className="mt-6 px-5 py-2 border-2 border-[#FF9800] text-[#FF9800] rounded-full font-semibold hover:bg-[#FF9800] hover:text-white transition"
      >
        Explore Services
      </button>
      </Link>
    </div>

    {/* Right Image Section */}
    <div className="flex justify-center">
      <img
        src={bw}
        alt="About Mendora"
        className="w-80 md:w-96 object-contain"
      />
    </div>
  </div>
</div>

    </div>
  );
};
export default About;