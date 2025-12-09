import bglanding from "../assets/bglanding.svg";
import ContactForm from './contactForm';
import animateimg1 from "../assets/animateimg1.svg";
import animateimg2 from "../assets/animateimg2.svg";
import animateimg3 from "../assets/animateimg3.svg";
import Background from '../assets/Background.svg';




const Contact = ({setheading}) => {

  // const [fullName, setFullName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [message, setMessage] = useState("");
  // const [loading,setLoading] = useState(false);
  

  // const handleSubmit = async (e) => {
  //   setLoading(true);
  //   e.preventDefault(); // prevents page reload and route change
  //   try {
  //     const res = await api.post(
  //       "/email/contact-us",
  //       { fullName, email, phone, message }
  //     );
  //     alert("Query successfully sent !!");
  //     setFullName("");
  //     setEmail("");
  //     setPhone("");
  //     setMessage("");

  //   } catch (error) {
  //     console.error("Error sending contact message:", error);
  //   }
  //   setLoading(false);
  // };

  return (
    <div
      className="relative bg-cover min-h-screen w-full"
      style={{ backgroundImage: `url(${Background})` }}
    >

      <div className="flex flex-row mt-12 w-full gap-4">

        {/* LEFT SIDE */}
        <div className="w-full">
          <div className="w-4/5 sm:w-4/5 md:w-5/6 lg:w-5/6 
                  mx-auto p-4 
                  shadow-xl shadow-gray-500 rounded-[10px] bg-white 
                  mb-8 mt-6 flex flex-col object-cover">

            <div className="p-5 w-full">
              <h1 className="font-poppins text-xl sm:text-2xl md:text-3xl font-semibold text-left">
                Contact Us
              </h1>
            </div>

            <div className="w-full">
              <ContactForm />
            </div>

          </div>
        </div>


        {/* RIGHT SIDE */}
        <div className="relative w-full h-[500px] flex justify-between items-center"> 
          <img src={animateimg1} className="rounded-full slide-img delay-0 right-0 absolute w-4/5 h-auto object-cover opacity-0 animate-slide-in-0 z-30" /> 
          <img src={animateimg2} className="rounded-full slide-img delay-1 top-0 absolute w-4/5 h-auto object-cover opacity-0 animate-slide-in-1 z-20" />
          <img src={animateimg3} className="rounded-full slide-img delay-2 left-0 absolute w-4/5 h-auto object-cover opacity-0 animate-slide-in-2 z-10" /> 
        </div>


      </div>
    </div>
  );
};

export default Contact;
