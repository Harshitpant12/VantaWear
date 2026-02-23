import { Filter } from "lucide-react";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

function Shop() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white relative">
      {/* section 1 -> Header */}
      <div className="w-full bg-white py-16 md:py-24 border-b border-gray-200 flex items-center justify-center">
        <h1 className="text-black font-black text-4xl md:text-6xl uppercase tracking-tighter">
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
          <div className="h-[800px] border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400"> {/* We may use h-200 will find out soon*/}
            Here will be the section 3 soon...
          </div>
        </main>
      </div>
    </div>
  );
}

export default Shop;
