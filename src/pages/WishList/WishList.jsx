import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Cards from "../../components/Cards/Cards";

function WishList() {
  // Dummy data for the cards
  const dummyData = [
    {
      image:
        "https://www.compass.com/m/6db15aba5bd9203e944e62d9f16905e3c653b815_img_0_ce4f6/640x480.webp",
      price: 500000,
      address: "123 Main St, Springfield",
      beds: 3,
      baths: 2,
      sqft: 1500,
      comingSoon: true,
    },
    {
      image:
        "https://www.compass.com/m/c43df6c28dd86417eefcb075b31db236b89cb4aa_img_0_8e974/640x480.webp",
      price: 750000,
      address: "456 Elm St, Springfield",
      beds: 4,
      baths: 3,
      sqft: 2000,
      comingSoon: false,
    },
    {
      image:
        "https://www.compass.com/m/0/c8bb4f44-3a6a-4046-8303-4b0e2e697738/1500x1000.webp",
      price: 1000000,
      address: "789 Oak St, Springfield",
      beds: 5,
      baths: 4,
      sqft: 3000,
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="w-full z-10 px-4 border-b">
        <Navbar />
      </div>
      <div className="px-4 md:px-8 lg:px-16 py-6">
        <h2 className="text-black text-2xl md:text-3xl font-semibold">
          My Wishlisted Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {dummyData.map((data, index) => (
            <Cards
              key={index}
              image={data.image}
              price={data.price}
              address={data.address}
              beds={data.beds}
              baths={data.baths}
              sqft={data.sqft}
              comingSoon={data.comingSoon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishList;
