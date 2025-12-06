import { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const LocationSelector = ({ address, setAddress, setLatitude, setLongitude }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setAddress(query);

    if (query.length > 2) {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      setSuggestions(res.data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setAddress(place.display_name);
    setLatitude(place.lat);
    setLongitude(place.lon);
    setSelectedPosition([place.lat, place.lon]);
    setSuggestions([]);
  };

  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      setSelectedPosition([latitude, longitude]);
      setAddress(`Current Location (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`);
    });
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={address}
        onChange={handleSearch}
        placeholder="Search your business location"
        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8901]"
      />

      {suggestions.length > 0 && (
        <ul className="border rounded-md bg-white max-h-40 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(s)}
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={handleUseCurrentLocation}
        className="mt-2 px-3 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300 border border-gray-300"
      >
        Use My Current Location
      </button>

      {selectedPosition && (
         <div style={{ position: "relative", zIndex: 0 }}>
        <MapContainer
          center={selectedPosition}
          zoom={15}
          style={{ height: "300px", width: "100%", marginTop: "10px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={selectedPosition}></Marker>
        </MapContainer>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
