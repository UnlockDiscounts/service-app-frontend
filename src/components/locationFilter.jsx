import { useState } from "react";
import axios from "axios";

const LocationFilter = ({ onLocationSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      try {
        const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: { q: value, format: "json", addressdetails: 1, limit: 5 },
        });
        setSuggestions(res.data);
      } catch (err) {
        console.error("Location fetch error:", err);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setSuggestions([]);
    onLocationSelect({
      address: place.display_name,
      lat: parseFloat(place.lat),
      lon: parseFloat(place.lon),
    });
  };

  return (
    <div className="relative w-full md:w-[60%]">
      <input
        value={query}
        onChange={handleSearch}
        placeholder="Search location..."
        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ff8901]"
      />
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-2 shadow-lg max-h-48 overflow-y-auto z-10">
          {suggestions.map((place, idx) => (
            <li
              key={idx}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(place)}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationFilter;
