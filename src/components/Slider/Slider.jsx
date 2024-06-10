import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";


function Slider({ image }) {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
          hasPrev && (
            <button
              type="button"
              onClick={clickHandler}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 ml-4"
              aria-label={labelPrev}
            >
              <FaAngleLeft className="text-black" size={20} />
            </button>
          )
        }
        renderArrowNext={(clickHandler, hasNext, labelNext) =>
          hasNext && (
            <button
              type="button"
              onClick={clickHandler}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 mr-4"
              aria-label={labelNext}
            >
              <FaAngleRight className="text-black" size={20} />
            </button>
          )
        }
      >
         <img src={image} alt="Property" />
      </Carousel>
    </div>
  );
}

export default Slider;
