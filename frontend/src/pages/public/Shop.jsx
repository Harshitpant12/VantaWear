import { ChevronDown, Filter, X } from "lucide-react";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Imagecard from "../../components/Imagecard"

import Model from "../../assets/model.png";
import femaleModel from "../../assets/femaleModel.png";
import tees from "../../assets/TEES.png";
import monochrome from "../../assets/monochrome.png";
import sweatshirt from "../../assets/sweatshirt.png";
import hoodie from "../../assets/hoodie.png";
import oversized from "../../assets/oversized.png";

function Shop() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const products = [
    { id: 1, image: oversized, name: "Oversized T-Shirt", price: "Rs. 1200" },
    { id: 2, image: hoodie, name: "Heavyweight Hoodie", price: "Rs. 5900" },
    { id: 3, image: femaleModel, name: "Cargo Pants", price: "Rs. 7900" },
    {
      id: 4,
      image: sweatshirt,
      name: "Essential Sweatshirt",
      price: "Rs. 3400",
    },
    { id: 5, image: monochrome, name: "Monochrome Sets", price: "Rs. 8000" },
    { id: 6, image: Model, name: "Signature Jacket", price: "Rs. 12000" },
    { id: 7, image: tees, name: "Classic Graphic Tee", price: "Rs. 1500" },
    { id: 8, image: hoodie, name: "Zip-Up Hoodie", price: "Rs. 6200" },
    { id: 9, image: oversized, name: "Boxy Fit Tee", price: "Rs. 1400" },
  ];

  return (
    <div className="min-h-screen bg-white relative">
      {/* section 1 -> Header */}
      <div className="w-full bg-black py-16 md:py-24 border-b border-gray-200 flex items-center justify-center">
        <h1 className="text-white font-black text-4xl md:text-6xl uppercase tracking-tighter">
          ALL WEAR
        </h1>
      </div>

      {/* section 2 & 3 Main Layout Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row relative">
        {/* Mobile filter toggle button */}
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="bg-black text-white px-8 py-3 rounded-full font-semibold uppercase tracking-widest text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
          >
            <Filter size={16} /> Filters +
          </button>
        </div>

        {/* section 2 -> Sidebar */}
        <Sidebar
          isOpen={isMobileMenuOpen}
          closeMenu={() => setIsMobileMenuOpen(false)}
        />

        {/* section 3 -> Product Grid (Layout) */}
        <main className="w-full md:w-3/4 p-6 md:p-8">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-gray-200 gap-4">
            <p className="text-gray-500 text-sm font-medium tracking-wide">
              Showing {products.length} results
            </p>

            <div className="relative group">
              <select className="appearance-none bg-transparent border border-gray-300 py-2 pl-4 pr-10 text-sm font-semibold uppercase tracking-widest cursor-pointer outline-none hover:border-black transition-colors rounded-none">
                <option value="newest">Newest Drops</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-black transition-colors"
              />
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {products.map((product) => (
              <Imagecard
                key={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-16 flex justify-center pb-24 md:pb-0"> {/* extra bottom padding on mobile screens so that it is not hidden by filters button */}
            <button className="px-10 py-4 border-2 border-black text-black font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors duration-300">
              Load More
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Shop;
