import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, Package, PlusSquare, ShoppingCart, 
  Users, Settings, LogOut, Menu, X 
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function AdminLayout() {
  const location = useLocation();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Products", path: "/admin/products", icon: <Package size={20} /> },
    { name: "Add Product", path: "/admin/product/new", icon: <PlusSquare size={20} /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingCart size={20} /> },
    { name: "Customers", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-black">
      
      {/* Only visible on small screens */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 p-4 sticky top-0 z-40">
        <h2 className="text-xl font-black uppercase tracking-tighter">
          VANTA ADMIN
        </h2>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1 hover:scale-110 transition-transform"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`md:hidden fixed inset-0 z-30 bg-white transition-transform duration-300 ease-in-out pt-20 flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <nav className="flex-1 flex flex-col gap-2 px-6">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black mb-4 inline-block transition-colors">
            ← Back to Store
          </Link>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                className={`flex items-center gap-4 px-4 py-4 font-bold uppercase tracking-widest text-sm transition-colors border-2 ${isActive ? "bg-black text-white border-black" : "border-transparent text-gray-500 hover:border-black hover:text-black"}`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-gray-200">
          <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 w-full font-bold uppercase tracking-widest text-sm text-red-500 hover:text-red-700 transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* DESKTOP SIDEBAR (Hidden on mobile) */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex h-screen sticky top-0">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-black uppercase tracking-tighter">
            VANTA ADMIN
          </h2>
          <Link to="/" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black mt-1 inline-block transition-colors">
            ← Back to Store
          </Link>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 font-bold uppercase tracking-widest text-xs transition-colors
                  ${isActive ? "bg-black text-white" : "text-gray-500 hover:bg-gray-100 hover:text-black"}
                `}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left font-bold uppercase tracking-widest text-xs text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto w-full">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <Outlet /> 
        </div>
      </main>

    </div>
  );
}

export default AdminLayout;