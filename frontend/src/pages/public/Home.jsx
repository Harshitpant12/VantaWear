import React from "react";
import { Feather, Package, Shirt } from "lucide-react";

import Model from "../../assets/model.png";
import femaleModel from "../../assets/femaleModel.png";
import tees from "../../assets/TEES.png";
import monochrome from "../../assets/monochrome.png";
import sweatshirt from "../../assets/sweatshirt.png";
import hoodie from "../../assets/hoodie.png";
import oversized from "../../assets/oversized.png";
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
        <div className="absolute inset-0 flex flex-col justify-end lg:justify-center py-20 lg:gap-8 items-center pointer-events-none">
          <h1 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter drop-shadow-2xl text-center pointer-events-auto hidden lg:block">
            OWN THE SILENCE
          </h1>
          <button className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm border-2 border-transparent hover:bg-black hover:text-white hover:border-white transition-all duration-300 pointer-events-auto">
            Shop Collection
          </button>
        </div>
      </div>
      {/* section 2 -> Featured Drop */}
      <div className="py-20 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-center text-4xl md:text-5xl font-black uppercase mb-16 tracking-tighter">
            Featured Drops
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
              image={monochrome}
              name="MonoChrome sets"
              price="Rs. 8000"
            />
          </div>
        </div>
      </div>
      {/* section 3 -> Why VantaWear */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-center text-4xl md:text-5xl font-black uppercase mb-16 tracking-tighter text-black">
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
              <h3 className="text-lg font-black uppercase tracking-tight text-black mt-2">
                Premium Heavyweight Cotton
              </h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs">
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
              <h3 className="text-lg font-black uppercase tracking-tight text-black mt-2">
                Designed for Everyday Wear
              </h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs">
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
              <h3 className="text-lg font-black uppercase tracking-tight text-black mt-2">Limited Edition Drops</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs">
                Small batch releases. No restocks. Once it's gone, it's gone.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* section 4 -> Best Sellers */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-4">
            <h1 className="text-black text-4xl md:text-5xl font-black uppercase tracking-tighter">
              BEST SELLERS
            </h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest hidden sm:block">
              Scroll to explore →
            </p>
          </div>

          {/* Carousel Container */}
          <div className="flex overflow-x-auto gap-8 pb-8 no-scrollbar snap-x snap-mandatory">
            <div className="min-w-70 md:min-w-[320px] snap-center bg-white p-4 rounded-sm">
              <Imagecard
                image={oversized}
                name="Oversized T-Shirt"
                price="Rs. 1200"
              />
            </div>
            <div className="min-w-70 md:min-w-[320px] snap-center bg-white p-4 rounded-sm">
              <Imagecard
                image={hoodie}
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
              <Imagecard
                image={sweatshirt}
                name="SweatShirt"
                price="Rs. 3400"
              />
            </div>
            <div className="min-w-70 md:min-w-[320px] snap-center bg-white p-4 rounded-sm">
              <Imagecard
                image={monochrome}
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
            src={tees}
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
            src={femaleModel}
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
      {/* section 6 -> Footer */}
      <footer className="bg-black text-white pt-20 pb-10 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            {/* Left -> NewsLetter */}
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold tracking-tight">
                JOIN THE DROP LIST
              </h3>
              <p className="text-gray-400 max-w-sm">
                Sign up to get early access to new releases and limited edition
                drops.
              </p>
              <form className="flex w-full max-w-md border-b border-gray-700 py-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent flex-1 outline-none text-sm placeholder:text-gray-600"
                />
                <button
                  type="submit"
                  className="text-sm font-bold hover:text-gray-400 transition-colors"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>

            {/* Right -> Links */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Explore
                </h4>
                <ul className="flex flex-col gap-2 text-sm">
                  <li className="hover:text-gray-400 cursor-pointer transition">
                    Shop
                  </li>
                  <li className="hover:text-gray-400 cursor-pointer transition">
                    About
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Support
                </h4>
                <ul className="flex flex-col gap-2 text-sm">
                  <li className="hover:text-gray-400 cursor-pointer transition">
                    Contact
                  </li>
                  <li className="hover:text-gray-400 cursor-pointer transition">
                    Privacy Policy
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom -> VantaWear Logo */}
          <div className="pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-2xl font-black tracking-tighter">
              VANTAWEAR
            </span>
            <p className="text-[10px] text-gray-600 tracking-widest uppercase">
              &copy; {new Date().getFullYear()} VantaWear. All rights reserved.
              HARSHIT PANT
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
