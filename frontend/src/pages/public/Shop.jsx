import { ChevronDown, Filter, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Imagecard from "../../components/Imagecard";
import api from "../../api/axios";

import Model from "../../assets/model.png";
import femaleModel from "../../assets/femaleModel.png";
import tees from "../../assets/TEES.png";
import monochrome from "../../assets/monochrome.png";
import sweatshirt from "../../assets/sweatshirt.png";
import hoodie from "../../assets/hoodie.png";
import oversized from "../../assets/oversized.png";
import { Link } from "react-router-dom";

function Shop() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();

        if (selectedCategories.length > 0) {
          params.append("category", selectedCategories.join(","));
        }

        if (priceRange === "Under Rs. 5000") params.append("maxPrice", "5000");
        if (priceRange === "Rs. 5000 - Rs. 10000") {
          params.append("minPrice", "5000");
          params.append("maxPrice", "10000");
        }
        if (priceRange === "Over Rs. 10000") params.append("minPrice", "10000");

        params.append("sort", sort);

        const { data } = await api.get(`/products?${params.toString()}`);

        // Handle based on your backend structure
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [selectedCategories, selectedSizes, priceRange, sort]);

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
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        {/* section 3 -> Product Grid (Layout) */}
        <main className="w-full md:w-3/4 p-6 md:p-8">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-gray-200 gap-4">
            <p className="text-gray-500 text-sm font-medium tracking-wide">
              Showing {products.length} results
            </p>

            <div className="relative group">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-transparent border border-gray-300 py-2 pl-4 pr-10 text-sm font-semibold uppercase tracking-widest cursor-pointer outline-none hover:border-black transition-colors rounded-none"
              >
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
          {isLoading ? (
            <div className="h-64 flex items-center justify-center w-full">
              <p className="text-xl font-black uppercase tracking-widest text-gray-500 animate-pulse">
                Fetching Drops...
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center w-full">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">
                No Items Found
              </h2>
              <p className="text-gray-500 uppercase tracking-widest text-sm">
                Try clearing some filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedSizes([]);
                  setPriceRange("");
                }}
                className="mt-6 border-b-2 border-black pb-1 uppercase tracking-widest font-bold text-sm"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {products.map((product) => (
                <Link
                  to={`/products/${product._id}`}
                  key={product._id}
                  className="block"
                >
                  <Imagecard
                    image={product.images[0]}
                    name={product.name}
                    price={`Rs. ${product.price}`}
                  />
                </Link>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {products.length > 0 && !isLoading && (
            <div className="mt-16 flex justify-center pb-24 md:pb-0">
              <button className="px-10 py-4 border-2 border-black text-black font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors duration-300">
                Load More
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Shop;
