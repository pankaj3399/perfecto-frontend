import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useSearch from "../../components/UseSearch/useSearch";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Button/Button";
import { setUser } from "../../feature/user/userSlice";
import axios from "axios";
import AddressModal from "../Modal/AddressModal";
import { set } from "lodash";

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

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const { value, setValue, places, buildings, isLoading, updatedProperties } = useSearch({ searchedValue, properties });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setIsMobileMenuOpen(false);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }


  /**
 * This function is used to get the cookie value by name
 * @param {string} name - cookie name
 */
  function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");

      if (name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }

    return null;
  }

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

  const handleLogout = () => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [key] = cookie.trim().split('=');
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
    dispatch(setUser({ email: '', full_name: '', role: '' }));
  }

  useEffect(() => {
    const access_token = getCookie("access_token");
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            }
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          dispatch(setUser(response.data));
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      className={`bg-transparent p-4 flex justify-between items-center ${isHome ? "text-black" : "text-white"
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

      <div className="hidden md:flex space-x-4">
        <a
          className={`hover:text-[#800080] text-[16px] font-semibold cursor-pointer ${isHome ? "text-white hover:bg-[white] p-2" : "text-black my-auto"
            }`}
          onClick={() => navigate("/buy")}
        >
          Buy
        </a>
        <a
          target="_blank"
          className={`hover:text-[#800080] text-[16px] font-semibold cursor-pointer ${isHome ? "text-white hover:bg-[white] p-2" : "text-black my-auto"
            }`}
          href="https://arcmortgage.floify.com/r/perfecto-homes"
        >
          Perfecto Buyer Apply
        </a>
        <a
          target="_blank"
          className={`hover:text-[#800080] text-[16px] font-semibold cursor-pointer ${isHome ? "text-white hover:bg-[white] p-2" : "text-black my-auto"
            }`}
          href="https://www.azibo.com/rent-payments"
        >
          Existing Owner Payment
        </a>
        {
          user?.full_name ? (
            <div className="space-x-4 flex">
              <span className={`text-[16px] font-semibold ${isHome ? "text-white p-2" : "text-black my-auto"}`}>Welcome, {user?.full_name.split(" ")[0]}</span>
              <Button
                className={`p-2 h-10 ${isHome ? "text-black" : "text-white"}`}
                variant={`${isHome ? "white" : ""}`}
                children="Logout"
                onClick={handleLogout}
              />
            </div>
          ) : (
            <div className="space-x-4 flex">
              <Button
                className={`p-2 h-10 ${isHome ? "text-black" : "text-white"}`}
                variant={`${isHome ? "white" : ""}`}
                children="Login"
                onClick={() => navigate("/login")}
              />

              <Button
                className={`p-2 h-10 ${isHome ? "text-black" : "text-white"}`}
                variant={`${isHome ? "white" : ""}`}
                children="Signup"
                onClick={() => navigate("/signup")}
              />
            </div>
          )
        }
        {
          user?.role === "agent" &&
          <Button
            className={`p-2 h-10 text-sm lg:text-base ${isHome ? "text-black" : "text-white"}`}
            variant={`${isHome ? "white" : ""}`}
            children="Submit Address"
            onClick={openModal}
          />
        }
      </div>
      <AddressModal isOpen={isModalOpen} closeModal={closeModal} />
      <div className="md:hidden flex items-center mt-[10px]">
        <button
          onClick={toggleMobileMenu}
          className="text-[24px] font-semibold text-[#800080] rounded"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-white text-black z-50 transition-transform transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
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
          {/* <div>
            <p>Welcome, {user?.full_name}</p>
          </div> */}{
            user?.full_name &&
            <span className={`text-[16px] font-semibold text-black my-auto`}>Welcome, {user?.full_name.split(" ")[0]}</span>
          }
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
            Perfecto Buyer Apply
          </a>
          <a
            target="_blank"
            className="block text-black hover:text-[#800080] text-[16px] font-semibold cursor-pointer"
            href="https://www.azibo.com/rent-payments"
          >
            Existing Owner Payment
          </a>
          {
            user?.full_name ? (
              <Button
                className="p-2"
                children="Logout"
                onClick={handleLogout}
              />
            ) : (
              <>
                <Button
                  className="p-2 h-10"
                  children="Login"
                  onClick={() => navigate("/login")}
                />

                <Button
                  className="p-2 h-10"
                  children="Signup"
                  onClick={() => navigate("/signup")}
                />
              </>
            )
          }
          {
            user?.role === "agent" &&
            <Button
              className="p-2"
              children="Submit Address"
              onClick={openModal}
            />
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
