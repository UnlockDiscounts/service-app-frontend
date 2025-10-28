import bglanding from "../assets/bglanding.svg";
import bw from '../assets/bw.png';

const About = () => {
  return (
    <div
      className=" bg-cover h-screen w-full "
      style={{ backgroundImage: `url(${bglanding})` }}
    >
      <div className="grid sm:grid-cols-1 md:grid-cols-2  p-10">
        <div className="mt-4 ml-10">
          <h1 className="font-extrabold md:text-5xl sm:text-xl font-poppins">
            About Us
          </h1>
          <div className="font-bold md:text-lg sm:text-sm mt-5 font-poppins">
            
            Welcome to UnlockDiscounts, the simplest way to book trusted
            services at unbeatable prices. We believe finding reliable help for
            everyday needs—like home repair, cleaning, beauty, or
            wellness—should be easy, not a headache. Our platform solves this by
            connecting you directly with verified, top-rated professionals in
            your area.
            <br />

             Our Promise
             <br /> We focus on convenience and affordability so
            you can get back to your life. 
            <ul className="list-disc pl-8">
              <li className="text-lg font-bold">Trusted Professionals: Every provider
            is rigorously vetted for quality and reliability.</li> 
            <li className="text-lg font-semibold"> Exclusive Value:
            Access special offers and the best prices, guaranteeing maximum
            value.</li>
            <li className="text-lg font-semibold"> Simplicity & Transparency: Enjoy easy booking with upfront,
            transparent pricing—no hidden fees.</li>
            <li className="text-lg font-semibold"semibold> Convenience: Find, compare, and
            book all your services in one user-friendly spot.</li>
            </ul>
            
            <br /> Let
            UnlockDiscounts help you unlock the freedom of affordable, reliable
            service today!
          </div>
        </div>
       <div className="flex p-8 justify-center">
  <img
    src={bw}
    alt="About Us"
    className="w-1/2 h-5/6 sm:h-50 object-cover transition-transform duration-500 hover:scale-105"
  />
</div>


      </div>
    </div>
  );
};
export default About;