import React, { useState } from "react";
import Select from "../Select/Select";
import Button from "../Button/Button";

function Filters({ onSubmit, setMinPrice, setMaxPrice }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState({
    minPrice: null,
    maxPrice: null,
    minBath: null,
    maxBath: null,
    minBeds: null,
    maxBeds: null,
    minSqft: null,
    maxSqft: null,
    minLot: null,
    maxLot: null,
    minYearBuilt: null,
    maxYearBuilt: null
  });
  const [statuses, setStatuses] = useState([])

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleChange = (e) => {
    e.preventDefault()
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value
    });
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    let yearOptions = [];
    for (let year = 1954; year <= currentYear; year++) {
      yearOptions.push({ value: year.toString(), label: year.toString() });
    }
    return yearOptions;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(
      filterValues.minPrice, filterValues.maxPrice,
      filterValues.minBath, filterValues.maxBath,
      filterValues.minBeds, filterValues.maxBeds,
      filterValues.minSqft, filterValues.maxSqft,
      filterValues.minLot, filterValues.maxLot,
      filterValues.minYearBuilt, filterValues.maxYearBuilt,
      statuses
    );
    if(showFilters)setShowFilters(false); 
  };

  const handleSelectStatus = (type) =>{
    if(statuses.includes(type)){
      const newList = statuses.filter((item)=>item!==type)
      setStatuses(newList)
    }else{
      setStatuses((prev)=>[...prev,type])
    }
  }

  const handleMaxPriceChange = (e) =>{
    e.preventDefault();
    setMaxPrice(e.target.value)
  }

  const handleMinPriceChange = (e) =>{
    e.preventDefault();
    setMinPrice(e.target.value)
  }

  return (
    <div>
      <div className="flex gap-4 items-center p-4 bg-gray-100 rounded-md shadow-sm">
        <Select
          options={[
            { value: 1000000, label: "$10000k" },
            { value: 2000000, label: "$20000k" },
            { value: 3000000, label: "$30000k"},
            { value: 4000000, label: "$40000k"},
            { value: 5000000, label: "$50000k"}
          ]}
          name="minPrice"
          placeholder="$ No Min"
          className="w-full border rounded-md p-2"
          // onChange={handleChange}
          handleChange={handleMinPriceChange}
        />
        <span className="text-gray-500">-</span>
        <Select
          options={[
            { value: 1000000, label: "$10000k" },
            { value: 2000000, label: "$20000k" },
            { value: 3000000, label: "$30000k"},
            { value: 4000000, label: "$40000k"},
            { value: 5000000, label: "$50000k"}
          ]}
          name="maxPrice"
          placeholder="$ No Max"
          className="w-full border rounded-md p-2"
          // onChange={handleChange}
          handleChange={handleMaxPriceChange}
        />
        <Button
          className="border p-2 rounded-md"
          variant="white"
          onClick={handleFilterClick}
          placeholder="Filter"
        />
      </div>
      {showFilters && (
        <div className="absolute sm:mt-0 mt-10 bg-opacity-50 flex justify-center items-center z-50" style={{ right: 0, left: 0, top: '5%', marginRight: 'auto', marginLeft: 'auto' }}>
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-2xl font-bold">Filters</h2>
              <button
                className="text-xl font-bold text-gray-600 hover:text-gray-900"
                onClick={handleFilterClick}
              >
                &times;
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label className="font-medium text-lg mb-2">Beds</label>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                  <Select
                    options={[
                      { value: 1, label: "1" },
                      { value: 2, label: "2" },
                      { value: 3, label: "3" },
                    ]}
                    name="minBeds"
                    placeholder="No Min"
                    className="w-full border rounded-md p-2"
                    // onChange={handleChange}
                    handleChange={handleChange}
                    value={filterValues.minBeds}
                  />
                  <Select
                    options={[
                      { value: 1, label: "1" },
                      { value: 2, label: "2" },
                      { value: 3, label: "3" },
                    ]}
                    name="maxBeds"
                    placeholder="No Max"
                    className="w-full border rounded-md p-2"
                    // onChange={handleChange}
                    handleChange={handleChange}
                    value={filterValues.maxBeds}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-lg mb-2">Baths</label>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                  <Select
                    options={[
                      { value: 1, label: "1" },
                      { value: 2, label: "2" },
                      { value: 3, label: "3" },
                    ]}
                    name="minBath"
                    placeholder="No Min"
                    className="w-full border rounded-md p-2"
                    // onChange={handleChange}
                    handleChange={handleChange}
                    value={filterValues.minBath}
                  />
                  <Select
                    options={[
                      { value: 1, label: "1" },
                      { value: 2, label: "2" },
                      { value: 3, label: "3" },
                    ]}
                    name="maxBath"
                    placeholder="No Max"
                    className="w-full border rounded-md p-2"
                    // onChange={handleChange}
                    handleChange={handleChange}
                    value={filterValues.maxBath}
                  />
                </div>
              </div>
              <div className="flex flex-col col-span-2">
                <label className="font-medium text-lg mb-2">Listing Status</label>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 border p-4 rounded-md">
                  {[
                    "Coming Soon",
                    "Active",
                    "Pending",
                    "Sold",
                  ].map((type) => (
                    <label
                      key={type}
                      className="flex items-center whitespace-nowrap text-gray-700"
                    >
                      <input
                        type="checkbox"
                        className="mr-2 cursor-pointer"
                        checked={statuses.includes(type)}
                        onChange={()=>handleSelectStatus(type)}
                      />{" "}
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 mb-6">
              <div className="flex flex-col">
                <label className="font-medium text-lg mb-2">Square Feet</label>
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    options={[
                      { value: 1000, label: "1000 sqft" },
                      { value: 2000, label: "2000 sqft" },
                      { value: 3000, label: "3000 sqft" },
                    ]}
                    name="minSqft"
                    placeholder="No Min"
                    className="w-full border rounded-md p-2"
                    // onChange={handleChange}
                    handleChange={handleChange}
                    value={filterValues.minSqft}
                  />
                  <Select
                    options={[
                      { value: 1000, label: "1000 sqft" },
                      { value: 2000, label: "2000 sqft" },
                      { value: 3000, label: "3000 sqft" },
                    ]}
                    name="maxSqft"
                    placeholder="No Max"
                    className="w-full border rounded-md p-2"
                    // onChange={handleChange}
                    handleChange={handleChange}
                    value={filterValues.maxSqft}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-lg mb-2">Lot Size</label>
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    options={[
                      { value: 1, label: "1 acre" },
                      { value: 2, label: "2 acres" },
                      { value: 3, label: "3 acres" },
                    ]}
                    name="minLot"
                    placeholder="No Min"
                    className="w-full border rounded-md p-2"
                    // onChange={handleChange}
                    handleChange={handleChange}
                    value={filterValues.minLot}
                  />
                  <Select
                    options={[
                      { value: 1, label: "1 acre" },
                      { value: 2, label: "2 acres" },
                      { value: 3, label: "3 acres" },
                    ]}
                    name="maxLot"
                    placeholder="No Max"
                    className="w-full border rounded-md p-2"
                    // onChange={handleChange}
                    handleChange={handleChange}
                    value={filterValues.maxLot}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-lg mb-2">Year Built</label>
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    options={generateYearOptions()}
                    name="minYearBuilt"
                    placeholder="No Min"
                    className="w-full border rounded-md p-2"
                    // onChange={handleChange}
                    handleChange={handleChange}
                    value={filterValues.minYearBuilt}
                  />
                  <Select
                    options={generateYearOptions()}
                    name="maxYearBuilt"
                    placeholder="No Max"
                    className="w-full border rounded-md p-2"
                    // onChange={handleChange}
                    handleChange={handleChange}
                    value={filterValues.maxYearBuilt}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end border-t pt-4">
              <Button className="p-4" onClick={handleSubmit}>Search</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters;
