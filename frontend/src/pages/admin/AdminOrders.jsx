import React, { useState, useEffect } from "react";
import { Package, Search, AlertCircle, CheckCircle } from "lucide-react";

import api from "../../api/axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all orders on load
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders");
        setOrders(data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Check your backend connection.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle Status Update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { order_status: newStatus });
      
      // Update the UI instantly
      setOrders(orders.map((order) => 
        order._id === orderId ? { ...order, order_status: newStatus } : order
      ));
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update order status. Please try again.");
    }
  };

  // Filter orders by search
  const filteredOrders = orders.filter((order) => 
    order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (order.user_id?.email && order.user_id.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
          Order Manager
        </h1>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72 group">
          <input
            type="text"
            placeholder="Search Order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-2 border-gray-300 py-2 pl-10 pr-4 text-sm font-bold outline-none focus:border-black transition-colors uppercase tracking-widest placeholder:text-gray-400"
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
        </div>
      </div>

      {error && (
        <div className="p-4 mb-8 border-2 border-red-500 bg-red-50 text-red-700 font-bold uppercase tracking-widest text-sm flex items-center gap-3">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* The VantaWear Orders Table */}
      <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b-2 border-black bg-gray-50 text-xs uppercase tracking-widest text-gray-500">
                <th className="py-4 px-6 font-bold">Order Details</th>
                <th className="py-4 px-6 font-bold">Customer</th>
                <th className="py-4 px-6 font-bold">Total</th>
                <th className="py-4 px-6 font-bold">Payment</th>
                <th className="py-4 px-6 font-bold text-right">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center font-bold uppercase tracking-widest text-gray-400 animate-pulse">
                    Loading orders...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center font-bold uppercase tracking-widest text-gray-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    
                    {/* Order Details */}
                    <td className="py-4 px-6">
                      <p className="font-black tracking-tight text-black mb-1">
                        #{order._id.slice(-6).toUpperCase()} {/* Show last 6 chars of MongoDB ID for a cleaner look */}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {order.order_items?.length || 0} items
                      </p>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-gray-800">{order.user_id?.name || "Guest"}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        {order.user_id?.email || "N/A"}
                      </p>
                    </td>

                    {/* Total */}
                    <td className="py-4 px-6 font-black text-black">
                      Rs. {order.total_price}
                    </td>
                    
                    {/* Payment Status */}
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${
                        order.payment_status === "Paid" || order.payment_status === "Success"
                          ? "border-green-500 text-green-600 bg-green-50" 
                          : "border-yellow-500 text-yellow-600 bg-yellow-50"
                      }`}>
                        {order.payment_status || "Pending"}
                      </span>
                    </td>

                    {/* Fulfillment Status & Dropdown */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {/* Status Indicator Icon */}
                        {order.order_status === "Delivered" ? (
                          <CheckCircle size={18} className="text-green-500" />
                        ) : order.order_status === "Shipped" ? (
                          <Package size={18} className="text-blue-500" />
                        ) : (
                          <AlertCircle size={18} className="text-yellow-500" />
                        )}

                        {/* Interactive Dropdown */}
                        <select
                          value={order.order_status || "Processing"}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`appearance-none bg-transparent border-b-2 py-1 pl-2 pr-6 text-xs font-bold uppercase tracking-widest outline-none cursor-pointer transition-colors
                            ${order.order_status === "Delivered" ? "border-green-500 text-green-700" :
                              order.order_status === "Shipped" ? "border-blue-500 text-blue-700" :
                              "border-yellow-500 text-yellow-700"}
                          `}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;