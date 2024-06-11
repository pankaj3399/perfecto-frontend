import { useState, useEffect, useCallback } from "react";
import cities from "../../data/csvjson.json";

const useSearch = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');
  const [places, setPlaces] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = async (searchValue) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/search?address=${searchValue}`);
      const responseData = await response.json();
      const suggestedCities = cities.data?.filter((city) => {
        const regex = new RegExp(searchValue, "i");
        return regex.test(city.city);
      }).slice(0, 5);

      setPlaces(suggestedCities);
      setBuildings(() =>
        responseData.map((res) => ({
          id: res._id,
          name: res.name,
          state: res.state,
        }))
      );
    } catch (error) {
      console.error("Error performing search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

  useEffect(() => {
    if (value) {
      debouncedFetchSuggestions(value);
    }
  }, [value, debouncedFetchSuggestions]);

  return {
    value,
    setValue,
    suggestions,
    places,
    buildings,
    isLoading,
    setIsLoading,
  };
};

export default useSearch;
