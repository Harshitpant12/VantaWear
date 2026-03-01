import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search as SearchIcon, X, User, ShoppingBag, ChevronRight, LogOut } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem("vantaRecentSearches") || "[]");
    setRecentSearches(savedSearches);

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e, query = searchInput) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      // Save to local storage (keep max 5)
      const updatedSearches = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("vantaRecentSearches", JSON.stringify(updatedSearches));
      
      setSearchInput(""); 
      setIsSearchFocused(false); 
      setIsSidebarOpen(false);
      navigate(`/search?q=${query}`);
    }
  };

  const removeRecentSearch = (e, queryToRemove) => {
    e.stopPropagation(); // Prevent the search from triggering when clicking the X
    const updatedSearches = recentSearches.filter((q) => q !== queryToRemove);
    setRecentSearches(updatedSearches);
    localStorage.setItem("vantaRecentSearches", JSON.stringify(updatedSearches));
  };

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
    navigate("/");
  };

  // Hide Navbar completely on Admin Routes
  const isAdminRoute = location.pathname.toLowerCase().startsWith("/admin");
  if (isAdminRoute) return null;

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200 px-4 md:px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
          
          {/* Left - Brand */}
          <Link to="/" className="shrink-0 z-50 flex items-center text-black hover:text-gray-600 transition-colors">
            {/* Mobile Logo: VW */}
            <span className="md:hidden text-2xl font-black tracking-tighter uppercase">
              VW
            </span>
            
            {/* Desktop Logo: VANTAWEAR */}
            <span className="hidden md:block text-2xl font-black tracking-tighter uppercase">
              VANTAWEAR
            </span>
          </Link>

          {/* Center Search Bar */}
          <div className="flex-1 max-w-xl relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative flex items-center w-full group">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search drops..."
                className="w-full border-b-2 border-gray-200 bg-gray-50 py-2 pl-4 pr-10 text-xs md:text-sm font-bold uppercase tracking-widest outline-none placeholder:text-gray-400 focus:bg-white focus:border-black transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 p-1 text-gray-400 group-focus-within:text-black transition-colors"
              >
                <SearchIcon size={18} />
              </button>
            </form>

            {/* Recent Searches Dropdown */}
            {isSearchFocused && recentSearches.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-2 py-2 z-50">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 pb-2 mb-2 border-b border-gray-100">
                  Recent Searches
                </p>
                {recentSearches.map((search, index) => (
                  <div key={index} className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer group" onClick={(e) => handleSearch(e, search)}>
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-600 group-hover:text-black">{search}</span>
                    <button onClick={(e) => removeRecentSearch(e, search)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right - Profile Icon Only */}
          <div className="flex items-center gap-6 shrink-0">
            <Link to="/shop" className="hidden md:block text-sm font-bold uppercase tracking-widest hover:text-gray-500 transition-colors">
              Shop
            </Link>

            <button onClick={() => setIsSidebarOpen(true)} className="text-black hover:scale-110 transition-transform relative">
              <User size={24} />
              {/* If user have items in cart, show a small dot on the profile icon to notify them! */}
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} 
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-100 bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-black">
          <h2 className="text-xl font-black uppercase tracking-tighter">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="hover:scale-110 transition-transform">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          
          {/* Auth & Cart Section */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Account</p>
            
            {user ? (
              <Link to="/account/profile" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between py-3 font-bold uppercase tracking-widest text-sm hover:text-gray-500 transition-colors">
                My Profile <ChevronRight size={16} />
              </Link>
            ) : (
              <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between py-3 font-bold uppercase tracking-widest text-sm hover:text-gray-500 transition-colors">
                Sign In / Register <ChevronRight size={16} />
              </Link>
            )}

            <Link to="/cart" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between py-3 font-bold uppercase tracking-widest text-sm hover:text-gray-500 transition-colors">
              <div className="flex items-center gap-2">
                My Cart 
                <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full">{totalItems}</span>
              </div>
              <ChevronRight size={16} />
            </Link>
            
            {user && (
              <Link to="/account/orders" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between py-3 font-bold uppercase tracking-widest text-sm hover:text-gray-500 transition-colors">
                Order History <ChevronRight size={16} />
              </Link>
            )}
          </div>

          <div className="w-full h-px bg-gray-200"></div>

          {/* Navigation Section */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Explore</p>
            <Link to="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between py-3 font-bold uppercase tracking-widest text-sm hover:text-gray-500 transition-colors">
              Home <ChevronRight size={16} />
            </Link>
            <Link to="/shop" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between py-3 font-bold uppercase tracking-widest text-sm hover:text-gray-500 transition-colors">
              Shop All Drops <ChevronRight size={16} />
            </Link>
            <div className="pl-4 flex flex-col gap-2 border-l-2 border-gray-100 ml-2 mt-2">
              <Link to="/category/hoodies" onClick={() => setIsSidebarOpen(false)} className="py-2 font-bold uppercase tracking-widest text-xs text-gray-500 hover:text-black transition-colors">Hoodies</Link>
              <Link to="/category/tees" onClick={() => setIsSidebarOpen(false)} className="py-2 font-bold uppercase tracking-widest text-xs text-gray-500 hover:text-black transition-colors">Tees</Link>
              <Link to="/category/bottoms" onClick={() => setIsSidebarOpen(false)} className="py-2 font-bold uppercase tracking-widest text-xs text-gray-500 hover:text-black transition-colors">Bottoms</Link>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200"></div>

          {/* Info Section */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Support</p>
            <Link to="/about" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between py-3 font-bold uppercase tracking-widest text-sm hover:text-gray-500 transition-colors">
              About Us <ChevronRight size={16} />
            </Link>
            <Link to="/contact" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between py-3 font-bold uppercase tracking-widest text-sm hover:text-gray-500 transition-colors">
              Contact Us <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Footer Area of Sidebar */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          {user ? (
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs hover:text-red-700 transition-colors w-full">
              <LogOut size={16} /> Log Out
            </button>
          ) : (
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 text-center">
              VantaWear &copy; {new Date().getFullYear()}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;