import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Cards from "../../components/Cards/Cards";
import ClusterMap from "../../components/ClusterMap/ClusterMap";
import Filters from "../../components/Filters/Filters";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import cities from "../../data/csvjson.json"

const BuyPage = () => {
  const location = useLocation();
  const property = location.state;
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState(property?.city ?? null);
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();
  const [lng, setLng] = useState(-71.057083)
  const [lat, setLat] = useState(42.361145)

  useEffect(() => {
      handleSubmitClick();
  }, []);

  const navigate = useNavigate();

  const goToPropertyDetails = (_id) => {
    navigate(`/property-details/${_id}`);
  };

  const handleSubmitClick = useCallback(
    async (
      minPrice,
      maxPrice,
      minBath,
      maxBath,
      minBeds,
      maxBeds,
      minSqft,
      maxSqft,
      minLot,
      maxLot,
      minYearBuilt,
      maxYearBuilt,
      statuses
    ) => {
      const buildParams = (params) => {
        let result = {};
        for (const key in params) {
          if (params[key] !== null && params[key] !== undefined && params[key] !== "") {
            result[key] = params[key];
          }
        }
        return result;
      };

      const params = buildParams({
        // address: search,
        city: search,
        minPrice,
        maxPrice,
        minBaths: minBath,
        maxBaths: maxBath,
        minBeds,
        maxBeds,
        minSqft,
        maxSqft,
        minLotSize: minLot,
        maxLotSize: maxLot,
        minYearBuilt,
        maxYearBuilt,
      });

      const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

      const statusQueryString = statuses && statuses.length > 0
        ? statuses.map(status => `status=${encodeURIComponent(status)}`).join('&')
        : '';

      const finalQueryString = [queryString, statusQueryString].filter(Boolean).join('&');

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/search?${finalQueryString}`);
        const data = response.data;
        setProperties((prevProperties) => {
          if (JSON.stringify(prevProperties) !== JSON.stringify(data)) {
            return data;
          }
          return prevProperties;
        });
        if(search && search.length>0){
          const suggestedCities = cities.data?.filter((city)=>{
            const regex = new RegExp(search, 'i');
            return regex.test(city.city);
          })
          setLat(suggestedCities[0].lat || 42.361145)
          setLng(suggestedCities[0].lng || -71.057083)
        }else{
          setLat(property?.lat)
          setLng(property?.lng)
        }
      } catch (error) {
        console.log(error);
      }
    },
    [search]
  );


  useEffect(() => {
    if (minPrice || maxPrice) {
      handleSubmitClick(minPrice, maxPrice);
    }
  }, [minPrice, maxPrice]);

  // const isValidLatLng = (lat, lng) => {
  //   return (
  //     typeof lat === "number" &&
  //     typeof lng === "number" &&
  //     !isNaN(lat) &&
  //     !isNaN(lng)
  //   );
  // };
  // const defaultLocation = { lat: 42.361145, lng: -71.057083 }; //boston

  // const mapLat = parseFloat(property?.lat || properties[0]?.latitude);
  // const mapLng = parseFloat(property?.lng || properties[0]?.longitude);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="w-full z-10 px-4 border-b">
        <Navbar
          searchedValue={search}
          setSearch={setSearch}
          onSearch={handleSubmitClick}
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 sm:px-[90px] px-[24px] my-[32px] gap-[24px] sm:h-auto">
        <div>
          <ClusterMap
            latitude={
              lat
            }
            longitude={
              lng
            }
            properties={properties}
          />{" "}
        </div>
        <div>
          <div className="py-2">
            <h2 className="text-[24px] font-medium">
              Explore This Neighborhood
            </h2>
            <Filters
              onSubmit={handleSubmitClick}
              setMaxPrice={setMaxPrice}
              setMinPrice={setMinPrice}
            />
          </div>
          <div className="flex-1 overflow-y-auto h-[calc(100vh-150px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sticky overflow-y-auto">
              {properties?.map((property, index) => (
                <div
                  onClick={() => goToPropertyDetails(property._id)}
                  key={index}
                >
                  <Cards {...property } />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default BuyPage;
