import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Cards from "../../components/Cards/Cards";
import { useNavigate } from "react-router-dom";
import Search from "../../components/Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faLocation } from "@fortawesome/free-solid-svg-icons";
import cities from "../../data/csvjson.json";
import Banner from "../../assets/images/hero.jpg";
import Footer from "../../components/Footer/Footer";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaBalanceScale,
  FaExchangeAlt,
  FaMoneyCheckAlt,
  FaLightbulb,
  FaHandshake,
  FaLaptop,
} from "react-icons/fa";

const Home = () => {
  const [value, setValue] = useState("");
  const [places, setPlaces] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [recommendedproperties, setRecommendedproperties] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const goToPropertyDetails = (_id) => {
    navigate(`/property-details/${_id}`);
  };

  const handlePlaceClick = (data) => {
    navigate(`/buy`, {
      state: data,
    });
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/recommendedProperties`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await response.json();
        setRecommendedproperties(data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };
    fetchPropertyDetails();
  }, []);

  const fetchSuggestions = async (searchValue) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/search?address=${searchValue}`
      );
      const responseData = await response.json();
      const suggestedCities = cities.data
        ?.filter((city) => {
          const regex = new RegExp(searchValue, "i");
          return regex.test(city.city);
        })
        .slice(0, 5);

      setPlaces(suggestedCities);
      setBuildings(() =>
        responseData.map((res) => {
          return {
            id: res._id,
            name: res.name,
            state: res.state,
          };
        })
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

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 500),
    []
  );

  useEffect(() => {
    if (value) {
      debouncedFetchSuggestions(value);
    }
  }, [value, debouncedFetchSuggestions]);

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <div className="absolute w-full z-10 px-4">
        <Navbar />
      </div>
      <div
        className="relative  flex justify-center items-center text-white"
        style={{
          backgroundImage: `url(${Banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "98vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center">
          <h1 className="sm:text-5xl text-3xl font-semibold">
            Find Your Perfecto Home
          </h1>
          <div className="relative inline-block mt-4 sm:mt-6 text-black max-w-3xl w-[70vw]">
            <Search setSearch={setValue} />
            {value && !isLoading && (
              <div className="suggestion-box bg-white max-h-[40vh] overflow-y-scroll border border-gray-300 rounded-lg shadow-md p-4 w-full mt-2 max-w-3xl absolute top-full">
                {places.length > 0 && (
                  <div className="mb-4 text-left">
                    <div className="text-gray-800 font-bold mb-2 flex items-center gap-2">
                      <FontAwesomeIcon icon={faLocation} />
                      Places
                    </div>
                    {places.map((data, index) => (
                      <div
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-100 transition ease-in-out"
                        onClick={() => handlePlaceClick(data)}
                      >
                        <div className="font-semibold">{data?.city}</div>
                        <div className="text-gray-500">{data?.state_id}</div>
                      </div>
                    ))}
                  </div>
                )}

                {buildings.length > 0 && (
                  <div className="mb-4 text-left mt-4">
                    <div className="text-gray-800 font-bold mb-2 flex gap-2 items-center">
                      <FontAwesomeIcon icon={faBuilding} />
                      Buildings
                    </div>
                    {buildings.map((data, index) => (
                      <div
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-100 transition ease-in-out"
                        onClick={() => goToPropertyDetails(data.id)}
                      >
                        <div className="font-semibold">{data.name}</div>
                        <div className="text-gray-500">{data.state}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 md:px-20">
        <div className="py-[90px]">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-black text-2xl md:text-3xl font-semibold text-center">
              Our Mission
            </h2>
            <div className="sm:w-[170px] w-[135px] border-b-4 border-[#f08e80]"></div>
          </div>
          <p className="mt-4 text-lg text-center">
            We're on a mission to transform the real estate industry by:
          </p>
          <div className="sm:mt-6 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaMoneyBillWave className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Empower Buyers</h3>
              <p className="mt-2 text-gray-600">
                Empowering buyers to save money over their homeownership
                journey.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaChartLine className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Maximize Returns</h3>
              <p className="mt-2 text-gray-600">
                Enabling sellers to maximize their returns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaBalanceScale className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Fair & Transparent</h3>
              <p className="mt-2 text-gray-600">
                Creating a fair, transparent, and efficient real estate
                ecosystem.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaExchangeAlt className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Simplify Process</h3>
              <p className="mt-2 text-gray-600">
                Simplifying the entire home buying and selling process.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-black text-2xl md:text-3xl font-semibold text-center">
              Why Choose Perfecto Home?
            </h2>
            <div className="w-[335px] sm:w-[410px] border-b-4 border-[#f08e80] mt-1"></div>
          </div>
          <p className="mt-4 text-lg text-center">
            In today's market, with interest rates above 6.5%, a typical home
            buyer could end up paying over $1 million in interest to a bank over
            the life of their mortgage. <br />
            We believe there's a better way.
          </p>
          <p className="text-lg text-center">
            Our innovative platform disrupts the traditional home purchasing
            market by:
          </p>
          <div className="sm:mt-6 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaMoneyCheckAlt className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Shift Focus</h3>
              <p className="mt-2 text-gray-600">
                Shifting focus away from financial institutions and towards the
                people who matter most - buyers and sellers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaLightbulb className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Creative Financing</h3>
              <p className="mt-2 text-gray-600">
                Offering creative financing solutions that bypass traditional
                banking hurdles.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaHandshake className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Transparency</h3>
              <p className="mt-2 text-gray-600">
                Providing a transparent, efficient process that benefits both
                parties.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaLaptop className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Leverage Technology</h3>
              <p className="mt-2 text-gray-600">
                Leveraging technology to simplify and streamline real estate
                transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-8 lg:px-16 py-10 md:py-12 lg:py-[90px]">
        <h2 className="text-black text-2xl md:text-3xl font-semibold">
          Recommended For You
        </h2>
        <p className="text-sm md:text-lg text-black">
          Listings we think you’ll love.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedproperties?.map((property, index) => (
            <div onClick={() => goToPropertyDetails(property._id)} key={index}>
              <Cards {...property} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
