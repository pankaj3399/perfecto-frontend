import React from "react";

const Cards = ({
  image,
  price,
  address,
  beds,
  baths,
  sqft,
  comingSoon,
}) => {

  return (
    <div
      className="relative w-auto overflow-hidden shadow-lg cursor-pointer"
    >
      <img className="w-full h-full object-cover" src={image} alt="Property" />
      {comingSoon && (
        <div className="absolute m-2 top-0 left-0 bg-black text-white text-sm font-bold px-2 py-1">
          PERFECTO COMING SOON
        </div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-20 text-white p-4 flex flex-col justify-end">
        <div className="text-[24px] font-bold">${price?.toLocaleString()}</div>
        <div className="flex gap-[30px] items-end">
          <div className="text-sm text-start">{address}</div>
          <div className="text-[14px]">
            <span className="mr-2">{beds} Beds</span>
            <span className="mr-2">{baths} Baths</span>
            <span>{sqft} Sq. Ft.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
