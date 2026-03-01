import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

function Footer() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Hide footer on admin and auth routes (just like the Navbar)
  const isAdminRoute = location.pathname.toLowerCase().startsWith("/admin");
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";

  if (isAdminRoute || isAuthRoute) {
    return null;
  }

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);

    // Later we can change this to: await api.post('/newsletter/subscribe', { email }) which currently we don't have
    setTimeout(() => {
      toast.success("You're on the list. Keep an eye on your inbox.");
      setEmail("");
      setIsSubscribing(false);
    }, 1500);
  };

  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 border-t border-gray-900 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          {/* Left -> NewsLetter */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold tracking-tight">JOIN THE DROP LIST</h3>
            <p className="text-gray-400 max-w-sm">
              Sign up to get early access to new releases and limited edition drops.
            </p>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md border-b border-gray-700 py-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-transparent flex-1 outline-none text-sm placeholder:text-gray-600"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="text-sm font-bold hover:text-gray-400 transition-colors disabled:text-gray-600"
              >
                {isSubscribing ? "ADDING..." : "SUBSCRIBE"}
              </button>
            </form>
          </div>

          {/* Right -> Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Explore</h4>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <Link to="/shop" className="hover:text-gray-400 transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/category/hoodies" className="hover:text-gray-400 transition-colors">
                    Hoodies
                  </Link>
                </li>
                <li>
                  <Link to="/category/tees" className="hover:text-gray-400 transition-colors">
                    Tees
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Support</h4>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <Link to="/account/profile" className="hover:text-gray-400 transition-colors">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to="/account/orders" className="hover:text-gray-400 transition-colors">
                    Order Tracking
                  </Link>
                </li>
                <li className="hover:text-gray-400 cursor-pointer transition-colors">
                  Contact Us
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom -> VantaWear Logo */}
        <div className="pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-2xl font-black tracking-tighter">VANTAWEAR</span>
          <p className="text-[10px] text-gray-600 tracking-widest uppercase text-center md:text-right">
            &copy; {new Date().getFullYear()} VantaWear. All rights reserved.<br />
            HARSHIT PANT
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;