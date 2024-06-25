import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useSearch from "../../components/UseSearch/useSearch";

const Navbar = ({
  searchedValue,
  setSearch,
  onPlaceSelect,
  properties,
  setProperties,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === `/`;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isValueChanging, setIsValueChanging] = useState(false);

  const { value, setValue, places, buildings, isLoading, updatedProperties } =
    useSearch({ searchedValue, properties });

  // useEffect(()=>{
  //   if(setSearch)setSearch(value)
  // },[value])
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePlaceClick = (data) => {
    // setValue("");
    navigate(`/buy`, {
      state: data,
    });
    if (setSearch) setSearch(value);
    setProperties(updatedProperties);
    onPlaceSelect(data);
    setIsValueChanging(false);
  };

  const goToPropertyDetails = (propertyId) => {
    navigate(`/property-details/${propertyId}`);
  };

  const onSearch = (data) => {
    setIsValueChanging(false);
    if (setSearch) setSearch(value);
    onPlaceSelect(data);
  };

  const handleSearchInputChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    setIsValueChanging(true);
  };

  return (
    <nav
      className={`bg-transparent p-4 flex justify-between items-center ${
        isHome ? "text-black" : "text-white"
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className="cursor-pointer">
          {isHome ? (
            <div
              className="text-[28px] font-semibold text-white"
              onClick={() => navigate("/")}
            >
              PERFECTO
            </div>
          ) : (
            <div className="flex gap-8">
              <h3
                className="text-[28px] hidden sm:block font-semibold text-black"
                onClick={() => navigate("/")}
              >
                PERFECTO
              </h3>
              <div className="relative inline-block mt-2 sm:mt-0">
                <input
                  className="p-2 sm:p-2 sm:w-[350px] w-[200px] text-black focus:outline-none border text-[14px]"
                  type="text"
                  placeholder="City, Address"
                  value={value}
                  onChange={handleSearchInputChange}
                />
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 bg-[#800080] hover:bg-[#9b59b6] p-[11px] sm:p-[11px] sm:mt-[-1.5px]"
                  onClick={onSearch}
                >
                  <FaSearch className="text-white" />
                </button>
                {value && !isLoading && isValueChanging && (
                  <div className="suggestion-box text-black bg-white max-h-[40vh] overflow-y-scroll border border-gray-300 rounded-lg shadow-md p-4 w-full mt-2 absolute top-full z-[1000]">
                    {places.length > 0 && (
                      <div className="mb-4 text-left">
                        <div className="text-gray-800 font-bold mb-2 flex items-center gap-2">
                          <FaSearch />
                          Places
                        </div>
                        {places.map((data, index) => (
                          <div
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-100 transition ease-in-out"
                            onClick={() => handlePlaceClick(data)}
                          >
                            <div className="font-semibold">{data?.city}</div>
                            <div className="text-gray-500">
                              {data?.state_id}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {buildings.length > 0 && (
                      <div className="mb-4 text-left mt-4">
                        <div className="text-gray-800 font-bold mb-2 flex gap-2 items-center">
                          <FaSearch />
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
          )}
        </div>
      </div>

      <div className="hidden md:flex space-x-8">
        <a
          className={`hover:text-[#800080] text-[16px] font-semibold cursor-pointer ${
            isHome ? "text-white hover:bg-[white] p-2" : "text-black"
          }`}
          onClick={() => navigate("/buy")}
        >
          Buy
        </a>
        <a
          target="_blank"
          className={`hover:text-[#800080] text-[16px] font-semibold cursor-pointer ${
            isHome ? "text-white hover:bg-[white] p-2" : "text-black"
          }`}
          href="https://arcmortgage.floify.com/r/perfecto-homes"
        >
          Perfecto Lending Partner
        </a>
        <a
          target="_blank"
          className={`hover:text-[#800080] text-[16px] font-semibold cursor-pointer ${
            isHome ? "text-white hover:bg-[white] p-2" : "text-black"
          }`}
          href="https://www.azibo.com/rent-payments"
        >
          Existing Buyers
        </a>
      </div>
      <div className="md:hidden flex items-center mt-[10px]">
        <button
          onClick={toggleMobileMenu}
          className="text-[24px] font-semibold text-[#800080] rounded"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-white text-black z-50 transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <div className="cursor-pointer">
            <h3
              className="sm:text-[14px] block font-semibold text-black"
              onClick={() => navigate("/")}
            >
              PERFECTO
            </h3>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="text-[16px] font-semibold"
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          <a
            className="block text-black hover:text-[#800080] text-[16px] font-semibold cursor-pointer"
            onClick={() => navigate("/buy")}
          >
            Buy
          </a>
          <a
            target="_blank"
            className="block text-black hover:text-[#800080] text-[16px] font-semibold cursor-pointer"
            href="https://arcmortgage.floify.com/r/perfecto-homes"
          >
            Perfecto Lending Partner
          </a>
          <a
            target="_blank"
            className="block text-black hover:text-[#800080] text-[16px] font-semibold cursor-pointer"
            href="https://www.azibo.com/rent-payments"
          >
            Existing Buyers
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
