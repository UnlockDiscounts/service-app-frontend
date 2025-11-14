import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (value) => {
  setSearchQuery(value);

  if (value.trim() === "") {
    setFilteredCategories([]);
    return;
  }

  try {
    const res = await axios.get(
      `https://service-app-backend-1.onrender.com/api/provider/search?query=${value}`
    );

    const data = res.data;
   
    if (data.success && Array.isArray(data.data)) {
      console.log(data);
      setFilteredCategories(data.data);
    } else {
      setFilteredCategories([]);
    }
  } catch (err) {
    console.error("Error fetching search results:", err);
    setFilteredCategories([]);
  }
};
const handleCardClick = (id) => {


    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("Please Login / Sign Up first to Book a service");
      return;
    }

    navigate(`/individualListing/${id}`);

  };

  return (
    <div className="flex-1 min-w-[400px] relative">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="w-6 h-6 text-amber-500" />
      </div>

      <input
        type="text"
        placeholder="Search for Services"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full pl-14 pr-12 py-4 text-base border-2 border-amber-400 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
      />

      {/* Dropdown */}
      {searchQuery.trim() !== "" && filteredCategories.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {filteredCategories.map((item) => (
            <div
              key={item._id}
              className="px-4 py-3 hover:bg-amber-50 cursor-pointer flex justify-between"
              onClick={() => {
                setSearchQuery(item.name);
                setFilteredCategories([]);
                handleCardClick(item._id);
                
              }}
            >
              <span className="font-medium text-gray-800">{item.name}</span>
              <span className="text-sm text-gray-500">
                ⭐ {item.averageRating ?? 0}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
