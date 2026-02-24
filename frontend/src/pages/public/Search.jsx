import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search as SearchIcon, ChevronDown } from "lucide-react";
import Imagecard from "../../components/Imagecard";

import hoodie from "../../assets/hoodie.png";
import monochrome from "../../assets/monochrome.png";
import oversized from "../../assets/oversized.png";
import tees from "../../assets/TEES.png";

// Dummy Data
const allProducts = [
  { id: 1, image: oversized, name: "Oversized T-Shirt", price: "Rs. 1200", category: "tees" },
  { id: 2, image: monochrome, name: "Monochrome Sets", price: "Rs. 8000", category: "sets" },
  { id: 3, image: hoodie, name: "Heavyweight Hoodie", price: "Rs. 5900", category: "hoodies" },
  { id: 4, image: tees, name: "Classic Graphic Tee", price: "Rs. 1500", category: "tees" },
];

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);

  // Filter products based on the search query (basic logic for demonstration)
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) || 
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  // Update the URL when the user tries a new search from the empty state
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput });
    }
  };

  // Sync local input state if URL changes externally
  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  return (
    <div className="min-h-screen bg-white text-black relative">
      
      {/* section 1 -> Search Header */}
      <div className="w-full py-16 md:py-24 border-b border-gray-200 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter wrap-break-word max-w-4xl">
          {query ? `RESULTS FOR "${query}"` : "SEARCH"}
        </h1>
        {query && (
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-6">
            {filteredProducts.length} {filteredProducts.length === 1 ? "Item" : "Items"} Found
          </p>
        )}
      </div>

      {/* section 2 -> Search Results or Empty State */}
      <div className="w-full max-w-350 mx-auto p-6 md:p-12">
        
        {filteredProducts.length > 0 ? (
          <>
            {/* Top Bar for Results */}
            <div className="flex justify-end mb-8 pb-4 border-b border-gray-200">
              <div className="relative group">
                <select className="appearance-none bg-transparent border border-gray-300 py-2 pl-4 pr-10 text-sm font-semibold uppercase tracking-widest cursor-pointer outline-none hover:border-black transition-colors rounded-none">
                  <option value="relevance">Most Relevant</option>
                  <option value="newest">Newest Drops</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-black transition-colors" />
              </div>
            </div>

            {/* Grid Layout (4 columns since there is no sidebar) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <Imagecard
                  key={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
              ))}
            </div>
          </>
        ) : (
          
          /* section 3 -> Empty State */
          <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-8">
              Nothing Found.
            </h2>
            
            {/* Try Again Search Bar */}
            <form 
              onSubmit={handleSearchSubmit}
              className="w-full max-w-md relative flex items-center mb-12"
            >
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Try another keyword..."
                className="w-full border-b-2 border-black bg-transparent py-4 pr-10 text-lg md:text-xl font-medium outline-none placeholder:text-gray-400"
              />
              <button type="submit" className="absolute right-0 p-2 hover:scale-110 transition-transform">
                <SearchIcon size={24} className="text-black" />
              </button>
            </form>

            <Link to="/shop">
              <button className="px-10 py-4 border-2 border-black text-black font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors duration-300">
                Back to Shop
              </button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default Search;