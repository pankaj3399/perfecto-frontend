import React, { useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";


const Navbar = ({searchedValue, setSearch, onSearch}) => {
  // const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === `/`;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  // const toggleDropdown = (dropdown) => {
  //   setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  // };

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
              onClick={() => {
                navigate("/");
              }}
            >
              PERFECTO
            </div>
          ) : (
            <div className="flex gap-8">
              <h3
                className="text-[28px] hidden sm:block font-semibold text-black"
                onClick={() => {
                  navigate("/");
                }}
              >
                PERFECTO
              </h3>
              <div className="relative inline-block mt-2 sm:mt-0">
                <input
                  className="p-2 sm:p-2 sm:w-[350px] w-[200px] text-black focus:outline-none border text-[14px]"
                  type="text"
                  placeholder="City, Address"
                  value={searchedValue}
                  onChange={(e)=>setSearch(e.target.value)}
                />
                <button className="absolute top-1/2 transform -translate-y-1/2 bg-[#800080] hover:bg-[#9b59b6] p-[11px] sm:p-[11px] sm:mt-[-1.5px]" onClick={()=>onSearch()}> 
                  <FaSearch className="text-white" />
                </button>
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
          onClick={() => {
            navigate("/buy");
          }}
        >
          Buy
        </a>
        {/* <a
          href="#"
          className={`hover:text-[#800080] text-[16px] font-semibold ${
            isHome ? "text-white" : "text-black"
          }`}
        >
          Rent
        </a>
        <a
          href="#"
          className={`hover:text-[#800080] text-[16px] font-semibold ${
            isHome ? "text-white" : "text-black"
          }`}
        >
          Sell
        </a> */}
        {/* <div className="relative group">
          <a
            href="#"
            className={`hover:text-[#800080] flex items-center justify-center gap-2 text-[16px] font-semibold ${
              isHome ? "text-white" : "text-black"
            }`}
          >
            Compass Exclusives <FaChevronDown />
          </a>
          <div className="absolute left-0 mt-2 w-48 bg-white text-black hidden group-hover:block">
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">
              Exclusive 1
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">
              Exclusive 2
            </a>
          </div>
        </div> */}
        {/* <div className="relative group">
          <a
            href="#"
            className={`hover:text-[#800080] flex items-center justify-center gap-2 text-[16px] font-semibold ${
              isHome ? "text-white" : "text-black"
            }`}
          >
            New Development <FaChevronDown />
          </a>
          <div className="absolute left-0 mt-2 w-48 bg-white text-black hidden group-hover:block">
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">
              Development 1
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">
              Development 2
            </a>
          </div>
        </div> */}
        {/* <div className="relative group">
          <a
            href="#"
            className={`hover:text-[#800080] flex items-center justify-center gap-2 text-[16px] font-semibold ${
              isHome ? "text-white" : "text-black"
            }`}
          >
            Agents <FaChevronDown />
          </a>
          <div className="absolute left-0 mt-2 w-48 bg-white text-black hidden group-hover:block">
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">
              Agent 1
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">
              Agent 2
            </a>
          </div>
        </div>
        <a
          href="#"
          className={`hover:text-[#800080] text-[16px] font-semibold ${
            isHome ? "text-white" : "text-black"
          }`}
        >
          Register/Sign In
        </a> */}
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
                onClick={() => {
                  navigate("/");
                }}
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
            className="block text-black hover:hover:text-[#800080] text-[16px] font-semibold cursor-pointer"
            onClick={() => {
              navigate("/buy");
            }}
          >
            Buy
          </a>
          {/* <a
            href="#"
            className="block text-black hover:hover:text-[#800080] text-[16px] font-semibold"
          >
            Rent
          </a>
          <a
            href="#"
            className="block text-black hover:hover:text-[#800080] text-[16px] font-semibold"
          >
            Sell
          </a> */}
          {/* <div className="relative">
            <button
              onClick={() => toggleDropdown("compassExclusives")}
              className="sm:block w-full text-left text-black hover:hover:text-[#800080] flex items-center justify-between text-[16px] font-semibold"
            >
              Compass Exclusives <FaChevronDown />
            </button>
            {activeDropdown === "compassExclusives" && (
              <div className="mt-2 space-y-2">
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Exclusive 1
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Exclusive 2
                </a>
              </div>
            )}
          </div> */}
          {/* <div className="relative">
            <button
              onClick={() => toggleDropdown("newDevelopment")}
              className="sm:block w-full text-left text-black hover:hover:text-[#800080] flex items-center justify-between text-[16px] font-semibold"
            >
              New Development <FaChevronDown />
            </button>
            {activeDropdown === "newDevelopment" && (
              <div className="mt-2 space-y-2">
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Development 1
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Development 2
                </a>
              </div>
            )}
          </div> */}
          {/* <div className="relative">
            <button
              onClick={() => toggleDropdown("agents")}
              className="sm:block w-full text-left text-black hover:text-[#800080] flex items-center justify-between text-[16px] font-semibold"
            >
              Agents <FaChevronDown />
            </button>
            {activeDropdown === "agents" && (
              <div className="mt-2 space-y-2">
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Agent 1
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Agent 2
                </a>
              </div>
            )}
          </div> */}
          {/* <a
            href="#"
            className="block text-black hover:text-[#800080] text-[16px] font-semibold"
          >
            Register/Sign In
          </a> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
