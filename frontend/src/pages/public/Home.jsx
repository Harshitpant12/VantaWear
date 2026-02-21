import React from "react";
import Model from "../../assets/model.png";
import femaleModel from "../../assets/femaleModel.png";

function Home() {
  return (
    <>
      {/* section 1 -> Hero Banner */}
      <div className="relative flex flex-col lg:flex-row min-h-screen">
        {/* Left */}
        <div className="flex-1 flex justify-center items-center bg-amber-300">
          <img src={Model} alt="" className="w-full h-full object-cover" />
        </div>
        {/* Right */}
        <div className="flex-1 flex justify-center items-center bg-red-300">
          <img
            src={femaleModel}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* Center */}
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
          <div className="pointer-events-auto flex flex-col items-center gap-4">
            <h1 className="text-white text-5xl font-bold drop-shadow-lg">
              OWN THE SILENCE
            </h1>
            <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition cursor-pointer">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
