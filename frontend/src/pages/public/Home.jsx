import React from "react";
import { Feather, MoveRightIcon, Package, Shirt } from "lucide-react";

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
      <div className="py-20 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-center text-3xl md:text-4xl font-bold mb-16 tracking-wide">
            Featured
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <Imagecard
              image={femaleModel}
              name="Cargo pants"
              price="Rs. 10000"
            />
            <Imagecard
              image={Model}
              name="Heavyweight Hoodie"
              price="Rs. 5900"
            />
            <Imagecard
              image={femaleModel}
              name="MonoChrome sets"
              price="Rs. 8000"
            />
          </div>
        </div>
      </div>
      {/* section 3 -> Why VantaWear */}
      <div className="py-20 px-6 bg-white">
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
                className="text-black group-hover:scale-110 transition duration-300"
              />
              <h3 className="text-xl font-semibold">
                Premium Heavyweight Cotton
              </h3>
              <p className="text-gray-600 max-w-xs">
                Crafted from 400 GSM heavyweight cotton for structure,
                durability, and a premium feel.
              </p>
            </div>
            {/* Col 2 */}
            <div className="flex flex-col items-center gap-6 group transition duration-300">
              <Shirt
                size={40}
                strokeWidth={1.5}
                className="text-black group-hover:scale-110 transition duration-300"
              />
              <h3 className="text-xl font-semibold">
                Designed for Everyday Wear
              </h3>
              <p className="text-gray-600 max-w-xs">
                Built for movement. Tailored for comfort. Designed to elevate
                everyday essentials.
              </p>
            </div>
            {/* Col 3 */}
            <div className="flex flex-col items-center gap-6 group transition duration-300">
              <Package
                size={40}
                strokeWidth={1.5}
                className="text-black group-hover:scale-110 transition duration-300"
              />
              <h3 className="text-xl font-semibold">Limited Edition Drops</h3>
              <p className="text-gray-600 max-w-xs">
                Small batch releases. No restocks. Once it's gone, it's gone.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* section 4 -> Best Sellers */}
      <div className="py-20 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h1 className="text-black text-3xl md:text-4xl font-bold tracking-wide">
              Best Sellers
            </h1>
            <p className="text-gray-600 hidden sm:block">Scroll to explore →</p>
          </div>

          {/* Carousel Container */}
          <div className="flex overflow-x-auto gap-8 pb-8 no-scrollbar snap-x snap-mandatory">
            <div className="min-w-70 md:min-w-[320px] snap-center bg-white p-4 rounded-sm">
              <Imagecard
                image={Model}
                name="Oversized T-Shirt"
                price="Rs. 1200"
              />
            </div>
            <div className="min-w-70 md:min-w-[320px] snap-center bg-white p-4 rounded-sm">
              <Imagecard
                image={Model}
                name="Oversized Hoodie"
                price="Rs. 5200"
              />
            </div>
            <div className="min-w-70 md:min-w-[320px] snap-center bg-white p-4 rounded-sm">
              <Imagecard
                image={femaleModel}
                name="Cargo Pants"
                price="Rs. 7900"
              />
            </div>
            <div className="min-w-70 md:min-w-[320px] snap-center bg-white p-4 rounded-sm">
              <Imagecard image={Model} name="SweathShirt" price="Rs. 9400" />
            </div>
            <div className="min-w-70 md:min-w-[320px] snap-center bg-white p-4 rounded-sm">
              <Imagecard
                image={femaleModel}
                name="MonoChrome Sets"
                price="Rs. 6700"
              />
            </div>
            <div className="min-w-70 md:min-w-[320px] snap-center bg-white p-4 rounded-sm">
              <Imagecard
                image={Model}
                name="Out of name :("
                price="Rs. 00(free) :)"
              />
            </div>
          </div>
        </div>
      </div>
      {/* section 5 -> Category Preview */}
      <div className="flex flex-col md:flex-row w-full h-[150vh] md:h-[80vh] overflow-hidden">
        {/* Category -> Hoodies */}
        <div className="relative flex-1 group overflow-hidden cursor-pointer border-b md:border-b-0 md:border-r border-gray-900">
          <img
            src={Model}
            alt="Hoodies"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex flex-col items-center justify-center">
            <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              HOODIES
            </h2>
            <button className="text-white border-b-2 border-white pb-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 uppercase tracking-widest">
              Explore Collection
            </button>
          </div>
        </div>
        {/* Category -> Tees */}
        <div className="relative flex-1 group overflow-hidden cursor-pointer border-b md:border-b-0 md:border-r border-gray-900">
          <img
            src={femaleModel}
            alt="Tees"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex flex-col items-center justify-center">
            <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              TEES
            </h2>
            <button className="text-white border-b-2 border-white pb-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 uppercase tracking-widest">
              Explore Collection
            </button>
          </div>
        </div>
        {/* Category -> Bottoms */}
        <div className="relative flex-1 group overflow-hidden cursor-pointer border-b md:border-b-0 md:border-r border-gray-900">
          <img
            src={Model}
            alt="Bottoms"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex flex-col items-center justify-center">
            <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              BOTTOMS
            </h2>
            <button className="text-white border-b-2 border-white pb-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 uppercase tracking-widest">
              Explore Collection
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

export default Home;
