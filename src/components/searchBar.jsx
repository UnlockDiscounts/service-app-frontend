import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const navigate = useNavigate();

   // The full placeholder text you want to display
  const PHRASE = "Search For Services...";
  const PHRASE_LENGTH = PHRASE.length;
  
  // Standard delay between characters (e.g., 100ms)
  const CHAR_DELAY = 100; 
  // Multiplier to make erasing slightly faster than typing
  const ERASE_SPEED_MULTIPLIER = 2; 
  // Pause duration after a full cycle (3 seconds)
  const PAUSE_DURATION = 1000; 
  
  // State machine phases
  const PHASES = {
      TYPING: 'TYPING',
      PAUSING_TYPED: 'PAUSING_TYPED',
      ERASING: 'ERASING',
      PAUSING_ERASED: 'PAUSING_ERASED',
  };
  
  const [placeholder, setPlaceholder] = useState('');
      const [phase, setPhase] = useState(PHASES.TYPING);
      const [index, setIndex] = useState(0);
  
      useEffect(() => {
          let timeoutId;
  
          // 1. If the user starts typing, stop the animation immediately.
          if (searchQuery) {
              setPlaceholder(PHRASE);
              return;
          }
  
          switch (phase) {
              case PHASES.TYPING:
                  if (index < PHRASE_LENGTH) {
                      // Add one character
                      timeoutId = setTimeout(() => {
                          setPlaceholder(PHRASE.substring(0, index + 1));
                          setIndex(index + 1);
                      }, CHAR_DELAY);
                  } else {
                      // Typing finished, move to pause
                      setPhase(PHASES.PAUSING_TYPED);
                  }
                  break;
  
              case PHASES.PAUSING_TYPED:
                  // Wait for the full pause duration
                  timeoutId = setTimeout(() => {
                      setPhase(PHASES.ERASING);
                  }, PAUSE_DURATION);
                  break;
  
              case PHASES.ERASING:
                  if (index > 0) {
                      // Remove one character
                      timeoutId = setTimeout(() => {
                          setPlaceholder(PHRASE.substring(0, index - 1));
                          setIndex(index - 1);
                      }, CHAR_DELAY * ERASE_SPEED_MULTIPLIER); // Use the multiplier for speed control
                  } else {
                      // Erasing finished, move to pause
                      setPhase(PHASES.PAUSING_ERASED);
                  }
                  break;
  
              case PHASES.PAUSING_ERASED:
                  // Wait for a brief moment before restarting the typing cycle
                  timeoutId = setTimeout(() => {
                      setPhase(PHASES.TYPING);
                  }, CHAR_DELAY * 2); // Short pause before starting over
                  break;
                  
              default:
                  break;
          }
  
          return () => clearTimeout(timeoutId); // Clean up the timer
      }, [phase, index, searchQuery]); // Dependencies trigger the next step in the sequence

  const handleSearch = async (value) => {

   let formattedValue = value.toLowerCase().trim();

  // Replace all spaces with dashes
  formattedValue = formattedValue.replace(/\s+/g, "-");

  // Now use formattedValue to hit the backend
  console.log("Final backend value:", formattedValue);  
  
  setSearchQuery(value);

  if (value.trim() === "") {
    setFilteredCategories([]);
    return;
  }

  try {
    const res = await axios.get(
      `https://service-app-backend-1.onrender.com/api/provider/search?query=${formattedValue}`
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
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full pl-14 pr-20 py-4 text-base border-2 border-amber-500 rounded-xl focus:outline-none amber-placeholder"
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
