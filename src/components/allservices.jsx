import { useState, useEffect } from 'react';
import { X, Star, ArrowLeft, Search } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import image from "../assets/image.png";
import ii from '../assets/ii.jpg'
import Thynk1 from "../assets/Thynk1.jpg";
import BookNow from './bookNow';
import LocationFilter from './locationFilter';
import MendoraFooter from './footer';
import SearchBar from "./searchBar"; // adjust path if needed




function AllServices() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [drop, setDrop] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const info = async () => {

      const res = await axios.get("https://service-app-backend-1.onrender.com/api/provider/services-by-category");

      console.log(res?.data?.data);


      setFilteredCategories(res?.data?.data);
      setCategories(res?.data?.data);

      setLoading(false);

    }
    info();

    // fetchCategories();
  }, []);

  // useEffect(() => {
  //   const fetchSearchResults = async () => {
  //     if (searchQuery.trim() === '') {
  //       // setFilteredCategories(categories);
  //     } else {
  //       try {
  //         const res = await axios.get(
  //           `https://service-app-backend-1.onrender.com/api/provider/search?query=${searchQuery}`
  //         );
  //         console.log(res?.data);
  //         if (res.data.success) {
  //           // setFilteredCategories(res.data.category);
  //         } else {
  //           // setFilteredCategories([]);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching search results:", error);
  //       }
  //     }
  //   };

  //   // Debounce search (wait 400ms after typing)
  //   const delayDebounce = setTimeout(() => {
  //     fetchSearchResults();
  //   }, 400);

  //   return () => clearTimeout(delayDebounce);
  // }, [searchQuery, categories]);


  const handleCardClick = (id) => {


    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("Please Login / Sign Up first to Book a service");
      return;
    }

    navigate(`/individualListing/${id}`);

  };

  const handleCategoryClick = async (category) => {

    const res = await axios.get(`https://service-app-backend-1.onrender.com/api/provider/category/${category}`);

    console.log(res?.data?.data);

    setSelectedCategory(category);
    setIsModalOpen(true);
    setServices(res?.data?.data);
    setServicesLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setServices([]);
  };

  //   const handleBook = async (id) => {


  //   const token = localStorage.getItem("accessToken");
  //   const storedUser = JSON.parse(localStorage.getItem("user"));

  //   if (!storedUser){
  //     alert("Please Login / Sign Up first to Book a service");
  //     return;
  //   }

  //   const res = await axios.get(`https://service-app-backend-1.onrender.com/api/booknow/provider/${id}`,  {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //   console.log(res?.data);

  //   window.open(res?.data?.whatsAppURL, '_blank', 'noopener,noreferrer');


  // }
  const handleLocationSelect = async ({ lat, lon, address }) => {
    try {
      // const res = await axios.get(`/api/services/location`, {
      //   params: { lat, lon },
      // });
      // setServices(res.data);
      console.log(`Filtered by location: ${address}`);
    } catch (err) {
      console.error("Error filtering by location:", err);
    }
  };

const sanitizeServiceName = (name) => {
  return name
    .split('-')                                   // split at hyphens
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each part
    .join('');                                    // join together
};

const sanitizeServiceName1 = (name) => {
  
  return name
    .split('-')                                   // split at hyphens
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each part
   .join(' ');
};


  return (
    <div className="min-h-screen bg-white">
      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-6 h-6 text-amber-500" />
            </div>
            <input
              type="text"
              placeholder="Search for Services"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-12 py-4 text-base border-2 border-amber-400 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button className="absolute inset-y-0 right-4 flex items-center text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div> */}
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-xl">
          <img
            src={image}
            alt="Hero"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 flex flex-col items-center justify-center">



            <div className="w-1/2 px-6 py-8">
  {/* Container for both fields side by side */}
  <div className="flex flex-wrap gap-4 items-center justify-between">
    {/* Location Filter */}
    <div className="flex-1 min-w-[400px]">
      {/* <LocationFilter onLocationSelect={handleLocationSelect} className="w-full pl-14 pr-12 py-6 text-base border-2 border-amber-400 rounded-xl focus:outline-none focus:border-amber-500 transition-colors" /> */}
    </div>

    {/* Search Input */}
    <SearchBar
 
/>

  </div>
</div>

            <h1 className="text-6xl font-semibold text-white mb-2 tracking-tight c opacity-90">
  One Platform
</h1>

<h2 className="text-5xl font-semibold text-white tracking-tight mix-blend-color-dodge opacity-90">
  All Services
</h2>

          </div>
        </div>
      </div>

      {/* Popular Services Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 ">
        <h2 className="text-4xl md:text-5xl font-medium mb-16 text-gray-900 text-center tracking-tight">Services Category</h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-2xl h-72 animate-pulse"></div>
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No services found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCategories.map((category, id) => (
              <button
                key={id}
                onClick={() => handleCategoryClick(category.category)}
                className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className="aspect-[1]">
                  <img
                    src={require(`../assets/${sanitizeServiceName(category.category)}.jpg`)}
                    alt={category.category}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-2xl font-bold text-center">{sanitizeServiceName1(category.category)}</h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Why Choose Section */}
    <div className="max-w-7xl mx-auto px-4 py-20 mb-16">
  <h2 className="text-4xl md:text-5xl font-medium mb-16 text-gray-900 text-center tracking-tight">
    Why choose Mendora?
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
    
    {/* Feature 1 */}
    <div className="flex flex-col items-start p-8 rounded-3xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>

      <h3 className="text-2xl font-semibold text-black/90 mb-3 leading-tight
">
        Verified and Background-Checked Pros
      </h3>
      <p className="text-gray-600 text-base leading-relaxed">
        We thoroughly vet all our pros to ensure they meet our high standards.
      </p>
    </div>

    {/* Feature 2 */}
    <div className="flex flex-col items-start p-8 rounded-3xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
        <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>

      <h3 className="text-2xl font-semibold text-black/90 mb-3 leading-tight
">
        Top-Rated Professionals
      </h3>
      <p className="text-gray-600 text-base leading-relaxed">
        Our pros consistently receive excellent reviews from satisfied customers.
      </p>
    </div>

    {/* Feature 3 */}
    <div className="flex flex-col items-start p-8 rounded-3xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      </div>

      <h3 className="text-2xl font-semibold text-black/90 mb-3 leading-tight
">
        Flexible Scheduling
      </h3>
      <p className="text-gray-600 text-base leading-relaxed">
        Book appointments at your convenience, with flexible scheduling options.
      </p>
    </div>

  </div>
</div>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto">
          <div className="bg-white w-full max-w-lg min-h-screen md:min-h-0 md:my-8 md:rounded-3xl shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center gap-4 md:rounded-t-3xl z-10">
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900">Services</h2>
            </div>

            {/* Modal Content */}
            <div className="p-5">
              {servicesLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="bg-gray-100 rounded-3xl h-80 animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service._id}
                      className="cursor-pointer bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      onClick={() => {
                        // handleCardClick(service._id);
                      }}
                    >
                      <div className="relative h-56" >
                        <img
                          src={Thynk1}
                          alt={service?.providerDetails?.business_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-bold mb-1 text-gray-900 cursor-pointer" onClick={() => {
                          handleCardClick(service._id);
                        }}>{service?.providerDetails?.business_name}</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {/* <span className="text-lg font-bold text-amber-500">rating</span>
                            <Star className="w-5 h-5 fill-amber-400 text-amber-400" /> */}
                          </div>
                          <button className="px-6 py-2.5 bg-white border-2 border-amber-400 text-gray-900 font-semibold rounded-full hover:bg-amber-400 hover:text-white transition-all duration-300"
                            onClick={
                              () => {

                                if (!user) {
                                  alert("Please Log In/Sign Up for Booking a Service");
                                  return;
                                }

                                setBook(true);
                                setDrop(service?.providerDetails?.services);

                              }}>
                            Book now
                          </button>
                          {book && <BookNow businessName={service?.providerDetails?.business_name} onClose={() => {
                            setBook(false);
                          }} services={drop} id={service._id} />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

      )}
      <MendoraFooter />
    </div>
  );
}

export default AllServices;
