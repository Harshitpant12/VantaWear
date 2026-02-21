import React from "react";
import Model from "../../assets/model.png";
import femaleModel from "../../assets/femaleModel.png";
import Imagecard from "../../components/Imagecard";

function Home() {
  return (
    <>
      {/* section 1 -> Hero Banner */}
      <div className="relative flex flex-col lg:flex-row h-screen w-full overflow-hidden mb-16">
        {/* Left */}
        <div className="lg:flex-1 justify-center items-center bg-amber-300 h-1/2 lg:h-full">
          <img src={Model} alt="" className="w-full h-full object-cover" />
        </div>
        {/* Right */}
        <div className="lg:flex-1 justify-center items-center bg-red-300 h-1/2 lg:h-full">
          <img
            src={femaleModel}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* Center */}
        <div className="absolute inset-0 flex flex-col justify-end lg:justify-center py-16 lg:gap-8 items-center pointer-events-none">
          <h1 className="text-white text-5xl font-bold drop-shadow-lg text-center pointer-events-auto hidden lg:block">
            OWN THE SILENCE
          </h1>
          <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition cursor-pointer hover:scale-105 active:scale-95 pointer-events-auto">
            Shop Now
          </button>
        </div>
      </div>
      {/* section 2 -> Featured Drop */}
      <div className="m-4 flex flex-col gap-5 mb-16">
        <h1 className="text-center text-3xl font-bold">Featured</h1>
        <div className="flex flex-col gap-8 md:gap-0 md:flex-row items-center justify-center">
          <Imagecard image={Model} name="Hoodie" price="Rs. 8000" />
          <Imagecard image={femaleModel} name="Cargo" price="Rs. 10000" />
          <Imagecard image={Model} name="Product 3" price="Rs. 900" />
          <Imagecard image={femaleModel} name="Product 4" price="Rs. 6800" />
        </div>
      </div>
      {/* section 3 -> Why VantaWear */}
      <div className="m-4 flex flex-col gap-5 mb-16">
        <h1 className="text-center text-3xl font-bold">Why VantaWear</h1>
      </div>
    </>
  );
}

export default Home;
