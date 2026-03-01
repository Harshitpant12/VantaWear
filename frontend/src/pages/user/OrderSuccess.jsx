import React, { useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function OrderSuccess() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation()
  // checking if the user is directed from checkout
  const isAuthorized = location.state?.fromCheckout;
  const orderId = location.state?.orderId;

  // if not kick them back to the shop
  if (!isAuthorized) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center bg-white">
      <CheckCircle size={80} className="text-green-500 mb-8" />

      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
        Order Confirmed
      </h1>

      <p className="text-xl font-black tracking-widest uppercase mb-4">
        {orderId
          ? `Order #${orderId.slice(-6).toUpperCase()}`
          : "Payment Successful"}
      </p>

      <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-12 max-w-md leading-relaxed">
        Your payment was successful. We're getting your drop ready to ship. You
        will receive an email confirmation shortly.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <Link to="/account/orders" className="w-full">
          <button className="w-full py-5 bg-black text-white font-bold uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-transform">
            View Order
          </button>
        </Link>

        <Link to="/shop" className="w-full">
          <button className="w-full py-5 bg-white text-black border-2 border-black font-bold uppercase tracking-widest text-sm hover:bg-gray-50 transition-colors">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
