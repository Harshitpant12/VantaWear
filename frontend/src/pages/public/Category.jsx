import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Filter, ChevronDown } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Imagecard from "../../components/Imagecard";

import sweatshirt from "../../assets/sweatshirt.png";
import oversized from "../../assets/oversized.png";
import hoodie from "../../assets/hoodie.png";
import femaleModel from "../../assets/femaleModel.png";

// Dummy data
const categoryProducts = [
  { id: 1, image: oversized, name: "Oversized T-Shirt", price: "Rs. 1200" },
  { id: 2, image: hoodie, name: "Heavyweight Hoodie", price: "Rs. 5900" },
  { id: 3, image: femaleModel, name: "Cargo Pants", price: "Rs. 7900" },
  { id: 4, image: sweatshirt, name: "Essential Sweatshirt", price: "Rs. 3400" },
];

function Category() {
  const { slug } = useParams(); // Grabs the category name from the URL (e.g. 'hoodies')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Format the slug to look clean (e.g. 'heavyweight-hoodies' -> 'HEAVYWEIGHT HOODIES')
  const displayTitle = slug ? slug.replace(/-/g, " ") : "CATEGORY";

  return (
    <div className="min-h-screen bg-white relative">
      
      {/* SECTION 1 -> Hero Banner */}
      <div className="relative w-full h-[40vh] md:h-[50vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image (later this will be changed based on the category) */}
        <img 
          src={sweatshirt} 
          alt={displayTitle} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Category Title */}
        <div className="relative z-10 text-center px-6 mt-16">
          <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-lg">
            {displayTitle}
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-semibold uppercase tracking-widest mt-4">
            Heavyweight essentials built for the cold.
          </p>
        </div>
      </div>

      {/* SECTION 2 -> Main Layout Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row relative">
        
        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="bg-black text-white px-8 py-3 rounded-full font-semibold uppercase tracking-widest text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
          >
            <Filter size={16} /> Filters +
          </button>
        </div>

        {/* Sidebar Filters Component reused from Shop page */}
        <Sidebar 
          isOpen={isMobileMenuOpen} 
          closeMenu={() => setIsMobileMenuOpen(false)} 
        />

        {/* SECTION 3 -> Category Grid Area */}
        <main className="w-full md:w-3/4 p-6 md:p-8">
          
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-gray-200 gap-4">
            <p className="text-gray-500 text-sm font-medium tracking-wide uppercase">
              {categoryProducts.length} Drops Available
            </p>
            
            <div className="relative group">
              <select className="appearance-none bg-transparent border border-gray-300 py-2 pl-4 pr-10 text-sm font-semibold uppercase tracking-widest cursor-pointer outline-none hover:border-black transition-colors rounded-none">
                <option value="newest">Newest Drops</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-black transition-colors" />
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {categoryProducts.map((product) => (
              <Imagecard
                key={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>

          <div className="mt-16 flex justify-center pb-24 md:pb-0">
            <button className="px-10 py-4 border-2 border-black text-black font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors duration-300">
              Load More
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}

export default Category;