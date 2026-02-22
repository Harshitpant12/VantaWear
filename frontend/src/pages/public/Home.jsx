import React from "react";
import { Feather, Package, Shirt } from "lucide-react";

import Model from "../../assets/model.png";
import femaleModel from "../../assets/femaleModel.png";
import Imagecard from "../../components/Imagecard";

function Home() {
  return (
    <>
      {/* section 1 -> Hero Banner */}
      <div className="relative flex flex-col lg:flex-row h-screen w-full overflow-hidden mb-16">
        {/* Left */}
        <div className="lg:flex-1 justify-center items-center h-1/2 lg:h-full">
          <img src={femaleModel} className="w-full h-full object-cover" />
        </div>
        {/* Right */}
        <div className="lg:flex-1 justify-center items-center h-1/2 lg:h-full">
          <img src={Model} className="w-full h-full object-cover" />
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
      <div className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-center text-3xl md:text-4xl font-bold mb-16 tracking-wide">
            Featured
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <Imagecard image={Model} name="Hoodie" price="Rs. 8000" />
            <Imagecard image={femaleModel} name="Cargo" price="Rs. 10000" />
            <Imagecard image={Model} name="Black Hoodie" price="Rs. 900" />
          </div>
        </div>
      </div>
      {/* section 3 -> Why VantaWear */}
      <div className="py-20 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-center text-3xl md:text-4xl font-bold mb-16 tracking-wide">
            Why VantaWear
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {/* Col 1 */}
            <div className="flex flex-col items-center gap-6 group transition duration-300">
              <Feather
                size={40}
                strokeWidth={1.5}
                className="text-white group-hover:scale-110 transition duration-300"
              />
              <h3 className="text-xl font-semibold">
                Premium Heavyweight Cotton
              </h3>
              <p className="text-gray-400 max-w-xs">
                Crafted from 400 GSM heavyweight cotton for structure,
                durability, and a premium feel.
              </p>
            </div>
            {/* Col 2 */}
            <div className="flex flex-col items-center gap-6 group transition duration-300">
              <Shirt
                size={40}
                strokeWidth={1.5}
                className="text-white group-hover:scale-110 transition duration-300"
              />
              <h3 className="text-xl font-semibold">
                Designed for Everyday Wear
              </h3>
              <p className="text-gray-400 max-w-xs">
                Built for movement. Tailored for comfort. Designed to elevate
                everyday essentials.
              </p>
            </div>
            {/* Col 3 */}
            <div className="flex flex-col items-center gap-6 group transition duration-300">
              <Package
                size={40}
                strokeWidth={1.5}
                className="text-white group-hover:scale-110 transition duration-300"
              />
              <h3 className="text-xl font-semibold">Limited Edition Drops</h3>
              <p className="text-gray-400 max-w-xs">
                Small batch releases. No restocks. Once it's gone, it's gone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
