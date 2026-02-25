import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  PlusSquare, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut 
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function AdminLayout() {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Products", path: "/admin/products", icon: <Package size={20} /> },
    { name: "Add Product", path: "/admin/product/new", icon: <PlusSquare size={20} /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingCart size={20} /> },
    { name: "Customers", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ]; // will implement them one by one

  return (
    <div className="min-h-screen flex bg-gray-50 text-black">
      
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex h-screen sticky top-0">
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
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {/* This <Outlet /> renders whatever page is currently selected */}
          <Outlet /> 
        </div>
      </main>

    </div>
  );
}

export default AdminLayout;