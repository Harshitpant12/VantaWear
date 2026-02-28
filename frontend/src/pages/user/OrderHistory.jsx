import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ArrowRight, Clock, CheckCircle } from "lucide-react";
import api from "../../api/axios";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        // will hit a specific route that only returns the logged-in user's orders
        const { data } = await api.get("/orders/myorders");
        setOrders(data.orders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Could not load your order history. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-xl font-black uppercase tracking-widest text-gray-400 animate-pulse">
          Loading Orders...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12 border-b-2 border-black pb-6">
        Order History
      </h1>

      {error ? (
        <div className="p-4 border-2 border-red-500 bg-red-50 text-red-700 font-bold uppercase tracking-widest text-sm">
          {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Package size={64} className="text-gray-300 mb-6" />
          <h2 className="text-2xl font-black uppercase tracking-widest mb-4">No Orders Yet</h2>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-8">
            You haven't placed any drops yet.
          </p>
          <Link to="/shop">
            <button className="px-10 py-5 bg-black text-white font-bold uppercase tracking-widest text-sm hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="bg-white border-2 border-black p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
            >
              {/* Order Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-black uppercase tracking-tight">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h3>
                  
                  {/* Status Badge */}
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border flex items-center gap-1
                    ${order.order_status === "Delivered" ? "border-green-500 text-green-700 bg-green-50" : 
                      order.order_status === "Shipped" ? "border-blue-500 text-blue-700 bg-blue-50" : 
                      "border-yellow-500 text-yellow-700 bg-yellow-50"}
                  `}>
                    {order.order_status === "Delivered" ? <CheckCircle size={10} /> : <Clock size={10} />}
                    {order.order_status}
                  </span>
                </div>
                
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>

                {/* Quick Item Preview (Shows first item image if available) */}
                <div className="flex items-center gap-4">
                  {order.order_items && order.order_items[0] && (
                    <div className="w-16 h-20 bg-gray-100 border border-gray-300 shrink-0">
                      <img src={order.order_items[0].image} alt="Item" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-sm">
                      {order.order_items?.length} {order.order_items?.length === 1 ? "Item" : "Items"}
                    </p>
                    <p className="text-lg font-black mt-1">Rs. {order.total_price}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link to={`/account/orders/${order._id}`} className="w-full md:w-auto mt-4 md:mt-0">
                <button className="w-full md:w-auto px-6 py-4 border-2 border-black font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-colors">
                  View Details <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;