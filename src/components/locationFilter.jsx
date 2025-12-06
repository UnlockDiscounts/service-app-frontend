import { useState, useEffect, useCallback } from "react";
import { MapPin } from 'lucide-react';
import axios from "axios";

const LocationFilter = ({ onLocationSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

 // The full placeholder text you want to display
const PHRASE = "Search For LOCATION...";
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
        if (query) {
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
    }, [phase, index, query]); // Dependencies trigger the next step in the sequence

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
    <div className="flex-1 min-w-[400px] relative rounded-[10px] bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <MapPin className="w-6 h-6 text-amber-400" />
      </div>
      <input
        value={query}
        onChange={handleSearch}
        placeholder={placeholder}
        className="w-full pl-14 pr-20 py-4 text-base border-2 border-amber-400 rounded-[10px] focus:outline-none placeholder-amber-500"
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
