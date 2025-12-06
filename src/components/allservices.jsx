import { useState, useEffect } from 'react';
import { X, Star, ArrowLeft, Search } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import api from './api';
import image from "../assets/image.png";
import ii from '../assets/ii.jpg'
import Thynk1 from "../assets/Thynk1.jpg";
import BookNow from './bookNow';
import LocationFilter from './locationFilter';
import MendoraFooter from './footer';
import SearchBar from "./searchBar"; // adjust path if needed
import bglanding from "../assets/bglanding.svg";


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
  const [nearbyProviders, setNearbyProviders] = useState(null);
  const [selectedBusinessData, setSelectedBusinessData] = useState({
    name: '',
    id: ''
  });

  const navigate = useNavigate();

  // Helper function to restructure/filter the categories data based on nearby providers
  const filterCategoriesByProviders = (allCategories, providers) => {
    if (!providers || providers.length === 0) {
      // If no providers are nearby, or filter is inactive, return all categories
      return allCategories;
    }

    // 1. Get the list of service categories present in the nearby providers list
    const nearbyServiceCategories = new Set(providers.map(p => p.providerDetails.service_category));

    // 2. Filter the main categories list to only include categories that have nearby providers
    const filtered = allCategories
      .filter(category => nearbyServiceCategories.has(category.category))
      .map(category => {

        return category;
      });

    return filtered;
  };

  // Helper function to filter the services list when a category is clicked (in the modal)
  const filterServicesByProviders = (categoryServices, providers) => {
    if (!providers || providers.length === 0) {
      // Return all services if no location filter is active
      return categoryServices;
    }

    // Get the IDs of nearby providers
    const nearbyProviderIds = new Set(providers.map(p => p._id));

    // Filter the services array (which contains providers for a category)
    const filteredServices = categoryServices.filter(service =>
      nearbyProviderIds.has(service._id)
    );

    return filteredServices;
  };


  useEffect(() => {

    const info = async () => {

      try {
        // Fetch ALL categories with services initially
        const res = await api.get("/provider/services-by-category");

        console.log("Initial All Categories:", res?.data?.data);

        setFilteredCategories(res?.data?.data);
        setCategories(res?.data?.data); // Store the complete list
      } catch (error) {
        console.error("Error fetching initial categories:", error);
      } finally {
        setLoading(false);
      }
    }
    info();
  }, []);



  const handleCardClick = (id) => {


    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("Please Login / Sign Up first to Book a service");
      return;
    }

    navigate(`/individualListing/${id}`);

  };

  const handleCategoryClick = async (category) => {
    setServicesLoading(true);
    try {
      // 1. Fetch all services for the selected category
      const res = await api.get(`/provider/category/${category}`);
      const allCategoryServices = res?.data?.data || [];

      console.log("All Services for Category:", allCategoryServices);

      // 2. Filter the services using the nearbyProviders state
      const filteredServicesList = filterServicesByProviders(allCategoryServices, nearbyProviders);

      setSelectedCategory(category);
      setIsModalOpen(true);
      setServices(filteredServicesList); // Use the filtered list for the modal
    } catch (error) {
      console.error("Error fetching services for category:", error);
      setServices([]);
    } finally {
      setServicesLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setServices([]);
  };


  const handleLocationSelect = async ({ lat, lon, address }) => {

    console.log("Location Selected:", lat, lon);

    // If lat and lon are null/undefined, it means the filter was cleared
    if (!lat || !lon) {
      setSelectedLocation(null);
      setNearbyProviders(null);
      setFilteredCategories(categories); // Reset to all categories
      return;
    }

    setSelectedLocation({ lat, lon, address });

    try {
      // NOTE: Using the hardcoded coordinates from your Postman image for demo. 
      // You should use the `lat` and `lon` passed to this function.
      const apiLat = lat; // 24.5854; 
      const apiLon = lon; // 73.7125;
      const radius = 5;

      const res = await api.get(`/provider/nearby?latitude=${apiLat}&longitude=${apiLon}&radius=${radius}`);

      const nearbyData = res.data?.data || [];
      console.log("Nearby Providers Data:", nearbyData);

      // 1. Update the state with the raw nearby providers list
      setNearbyProviders(nearbyData);

      // 2. Filter the main categories list based on the nearby providers
      const newFilteredCategories = filterCategoriesByProviders(categories, nearbyData);
      setFilteredCategories(newFilteredCategories); // Update the state used for rendering the main page

    } catch (err) {
      console.error("Error filtering by location:", err);
      // In case of error, you might want to clear the filter or show a message
      setNearbyProviders([]);
      setFilteredCategories([]);
    }
  };

  const sanitizeServiceName = (name) => {
    return name
      .split('-')                                   // split at hyphens
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each part
      .join('');                                    // join together
  };

  const sanitizeServiceName1 = (name) => {

    return name
      .split('-')                                   // split at hyphens
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each part
      .join(' ');
  };

  const getImage = (name) => {
    try {
      return require(`../assets/${sanitizeServiceName(name)}.svg`);
    } catch (error) {
      return require("../assets/ii.jpg"); // fallback image
    }
  };


  return (
    <div className="min-h-screen bg-white" style={{ backgroundImage: `url(${bglanding})`, height: "200px" }}>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* <div className="w-full px-6 py-8 pt-12"> */}
  <div className="w-full max-w-10xl mx-auto">

    <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-6">

      {/* Location Filter */}
      <div className="w-full md:flex-1">
        <LocationFilter onLocationSelect={handleLocationSelect} />
      </div>

      {/* Search Bar */}
      <div className="w-full md:flex-1">
        <SearchBar />
      </div>

    </div>

  {/* </div> */}
</div>



        {/* <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
          <img
            src={image}
            alt="Hero"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 flex flex-col items-center justify-center">



            <div className="w-1/2 px-6 py-8">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex-1 min-w-[400px]">
                </div>


              </div>
            </div>

            <h1 className="text-7xl font-semibold text-white mb-2 tracking-tight c opacity-90">
              One Platform
            </h1>

            <h2 className="text-6xl font-semibold text-white tracking-tight mix-blend-color-dodge opacity-90">
              All Services
            </h2>

          </div>
        </div> */}
      </div>

      {/* Popular Services Section */}
      {/* <div className="max-w-7xl mx-auto px-4 py-12 ">
        <h2 className="text-4xl md:text-5xl font-medium mb-16 text-gray-900 text-center tracking-tight">Services Category</h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-2xl h-72 animate-pulse"></div>
            ))}
          </div>
        ) : filteredCategories?.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {selectedLocation
                ? "No services found near the selected location."
                : `No services found matching "${searchQuery}"`
              }
            </p>
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
                    src={getImage(category.category)}
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
      </div> */}

      <div className="max-w-7xl mx-auto px-4 py-5">
    {/* Title is outside the main content card */}
    <h2 className="text-4xl md:text-5xl font-medium mb-16 text-gray-900 text-center tracking-tight">One Platform Connecting You to Every Verified Service</h2>

    {loading ? (
        <div className="grid grid-cols-4 gap-6 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
            {[...Array(10)].map((_, index) => (
                // Keeping the loading state simple but in a 4-column grid
                <div key={index} className="bg-gray-50 rounded-lg h-40 flex flex-col items-center justify-center space-y-3 animate-pulse">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                </div>
            ))}
        </div>
    ) : filteredCategories?.length === 0 ? (
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center py-16">
            <p className="text-gray-500 text-lg">
                {selectedLocation
                    ? "No services found near the selected location."
                    : `No services found matching "${searchQuery}"`
                }
            </p>
        </div>
    ) : (
        // THIS IS THE MAIN CHANGE: A single container acting as the main "card" for all categories
            <div className="flex flex-col items-start p-10 rounded-[10px] bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">


            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
                {filteredCategories.map((category, id) => (
                    // <button
                    //     key={id}
                    //     onClick={() => handleCategoryClick(category.category)}
                    //     // Card styling: no background needed since the parent container is white, centered content, no border/shadow on the individual card to maintain the clean look
                    //     className="flex flex-col items-center justify-start text-center group transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    // >
                    //     {/* Container for the illustration to control size */}
                    //     <div className="w-full max-w-[250px] h-[250px] p-2">
                          
                    //         <img
                    //             src={getImage(category.category)}
                    //             alt={category.category}
                    //             // Illustration should be object-contain to prevent distortion
                    //             className="w-full h-full object-cover "
                    //         />
                    //     </div>
                    //     {/* Category Name styling - matches the design's font style */}
                    //     <div className="mt-3">
                    //         <h3 className="text-gray-800 text-[20px] font-medium whitespace-pre-line leading-snug">
                    //             {/* Use whitespace-pre-line to allow the category names (like "Educational & Training") to wrap exactly as shown in the design */}
                    //             {sanitizeServiceName1(category.category)}
                    //         </h3>
                    //     </div>
                    // </button>
                    <button
    key={id}
    onClick={() => handleCategoryClick(category.category)}
    className="rounded-[500px] flex flex-col items-center justify-start text-center group 
               transition-all duration-200"
>
    {/* Image container */}
    <div className="
        w-full max-w-[250px] h-[200px] p-2 
        relative rounded-[500px] overflow-hidden 
        flex items-center justify-center
    ">
        {/* Actual image */}
        <img
            src={getImage(category.category)}
            alt={category.category}
            className="
                w-full h-full object-contain rounded-2xl
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
            {sanitizeServiceName1(category.category)}
        </h3>
    </div>
</button>

                ))}
            </div>
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
              ) : services.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">
                    {nearbyProviders
                      ? "No providers for this category were found near your location."
                      : "No services found in this category."
                    }
                  </p>
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
                                setSelectedBusinessData({
                                  name: service?.providerDetails?.business_name,
                                  id: service._id, // This is the providerId
                                });

                              }}>
                            Book now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {book && <BookNow businessName={selectedBusinessData.name} onClose={() => {
                    setBook(false);
                  }} services={drop} id={selectedBusinessData.id} />}
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