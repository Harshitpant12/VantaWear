import React, { useState } from "react";
import { X } from "lucide-react";

function Sidebar({
  isOpen,
  closeMenu,
  selectedCategories,
  setSelectedCategories,
  selectedSizes,
  setSelectedSizes,
  priceRange,
  setPriceRange,
}) {
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };
  return (
    <aside
      className={`fixed md:sticky top-0 left-0 w-full md:w-1/4 h-screen md:h-[calc(100vh-100px)] bg-white z-50 md:z-10 border-r border-gray-200 p-6 md:p-8 overflow-y-auto transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-full md:translate-y-0"}`}
    >
      {/* Mobile Header */}
      <div className="flex justify-between items-center mb-10 md:hidden">
        <h2 className="text-xl font-bold uppercase tracking-widest">Filters</h2>
        <button onClick={closeMenu} className="p-2">
          <X size={24} />
        </button>
      </div>

      {/* Category Filtering */}
      <div className="mb-10 border-b border-gray-200 pb-8">
        <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-6">
          Category
        </h3>
        <div className="flex flex-col gap-4">
          {["Hoodies", "Tees", "Bottoms", "Sets", "Outerwear"].map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.toLowerCase())}
                onChange={() => toggleCategory(cat.toLowerCase())}
                className="w-5 h-5 border border-black appearance-none checked:bg-black relative
                           after:content-[''] after:absolute after:top-1/2 after:left-1/2 
                           after:-translate-x-1/2 after:-translate-y-1/2 after:w-2 after:h-2 
                           after:bg-white after:opacity-0 checked:after:opacity-100 transition-colors cursor-pointer"
              />
              <span className="text-gray-600 group-hover:text-black transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Filtering */}
      <div className="mb-10 border-b border-gray-200 pb-8">
        <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-6">
          Size
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`border border-black py-2 text-sm font-semibold transition-colors duration-300 
                ${selectedSizes.includes(size) ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"}
              `}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filtering */}
      <div className="mb-10">
        <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-6">
          Price
        </h3>
        <div className="flex flex-col gap-4">
          {["Under Rs. 5000", "Rs. 5000 - Rs. 10000", "Over Rs. 10000"].map(
            (price) => (
              <label
                key={price}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="price"
                  checked={priceRange === price}
                  onChange={() => setPriceRange(price)}
                  className="w-5 h-5 border border-black rounded-full appearance-none checked:bg-black relative
                           after:content-[''] after:absolute after:top-1/2 after:left-1/2 
                           after:-translate-x-1/2 after:-translate-y-1/2 after:w-2 after:h-2 
                           after:bg-white after:rounded-full after:opacity-0 checked:after:opacity-100 transition-colors cursor-pointer"
                />
                <span className="text-gray-600 group-hover:text-black transition-colors">
                  {price}
                </span>
              </label>
            ),
          )}
          {/* Clear Price Button */}
          {priceRange && (
            <button
              onClick={() => setPriceRange("")}
              className="text-xs text-left text-gray-500 underline mt-2 hover:text-black"
            >
              Clear Price Filter
            </button>
          )}
        </div>
      </div>

      {/* Mobile Apply Button */}
      <button
        onClick={closeMenu}
        className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest md:hidden mt-8"
      >
        Apply Filters
      </button>
    </aside>
  );
}

export default Sidebar;
