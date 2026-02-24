import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search as SearchIcon, ShoppingBag, Menu, X } from "lucide-react";

import { useCart } from "../context/CartContext";

function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { cartItems } = useCart();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // This function links Navbar to the /search page
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput}`);
      setSearchInput(""); // Clear input after hitting enter
      setIsMobileMenuOpen(false); // Close the mobile menu automatically so they can see results
    }
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left - Brand */}
          <Link
            to="/"
            className="text-2xl font-black tracking-tighter uppercase text-black z-50"
          >
            VANTAWEAR
          </Link>

          {/* Center - Desktop Search Bar (Hidden on Mobile) */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form
              onSubmit={handleSearch}
              className="relative flex items-center w-full group"
            >
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search drops..."
                className="w-full border-b-2 border-transparent bg-gray-100 py-2 pl-4 pr-10 text-sm font-bold uppercase tracking-widest outline-none placeholder:text-gray-400 focus:bg-white focus:border-black transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 p-1 text-gray-400 group-focus-within:text-black transition-colors hover:scale-110"
              >
                <SearchIcon size={18} />
              </button>
            </form>
          </div>

          {/* Right - Icons */}
          <div className="flex items-center gap-6 z-50">
            <Link
              to="/shop"
              className="hidden md:block text-sm font-bold uppercase tracking-widest hover:text-gray-500 transition-colors"
            >
              Shop
            </Link>

            <Link
              to="/cart"
              className="text-black hover:text-gray-500 transition-colors relative"
            >
              <ShoppingBag size={22} />
              {/* Real Cart Badge */}
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                  {}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              className="md:hidden text-black hover:scale-110 transition-transform"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 pb-6 transition-transform duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Mobile Search Form */}
        <form
          onSubmit={handleSearch}
          className="relative flex items-center w-full mb-12"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search drops..."
            className="w-full border-b-2 border-black bg-transparent py-4 pr-12 text-xl font-black uppercase tracking-tighter outline-none placeholder:text-gray-300"
          />
          <button
            type="submit"
            className="absolute right-0 p-2 text-black hover:scale-110 transition-transform"
          >
            <SearchIcon size={24} />
          </button>
        </form>

        {/* Mobile Navigation Links */}
        <div className="flex flex-col gap-8 text-3xl font-black uppercase tracking-tighter">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-gray-500 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-gray-500 transition-colors"
          >
            Shop All
          </Link>
          <div className="border-t border-gray-200 my-4"></div>
          {/* Example Category Links */}
          <Link
            to="/category/hoodies"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-xl text-gray-500 hover:text-black transition-colors"
          >
            Hoodies
          </Link>
          <Link
            to="/category/tees"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-xl text-gray-500 hover:text-black transition-colors"
          >
            Tees
          </Link>
          <Link
            to="/category/bottoms"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-xl text-gray-500 hover:text-black transition-colors"
          >
            Bottoms
          </Link>
        </div>

        {/* Mobile Footer */}
        <div className="mt-auto pt-8 border-t border-gray-200">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            VantaWear &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
