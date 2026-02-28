import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import api from "../../api/axios";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data.order);
      } catch (err) {
        console.error("Failed to fetch order details:", err);
        setError(
          "Could not load order details. It may not exist or belong to you.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-xl font-black uppercase tracking-widest text-gray-400 animate-pulse">
          Loading Details...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-red-500 font-bold uppercase tracking-widest mb-6 border-2 border-red-500 p-4 bg-red-50">
          {error || "Order not found."}
        </p>
        <Link to="/account/orders">
          <button className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm hover:-translate-y-1 transition-transform">
            Back to Orders
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b-2 border-black pb-6 gap-6">
        <div>
          <Link
            to="/account/orders"
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Back to History
          </Link>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2">
            Order #{order._id.slice(-6).toUpperCase()}
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
            {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>

        {/* Status Badges */}
        <div className="flex flex-col items-end gap-2">
          <div
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest border-2 flex items-center gap-2
            ${
              order.order_status === "Delivered"
                ? "border-green-500 text-green-700 bg-green-50"
                : order.order_status === "Shipped"
                  ? "border-blue-500 text-blue-700 bg-blue-50"
                  : "border-yellow-500 text-yellow-700 bg-yellow-50"
            }
          `}
          >
            {order.order_status === "Delivered" ? (
              <CheckCircle size={14} />
            ) : (
              <Package size={14} />
            )}
            Status: {order.order_status}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left : Items List */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-black uppercase tracking-tighter mb-6">
            Items in your Drop
          </h2>

          <div className="flex flex-col gap-6">
            {order.order_items.map((item, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white"
              >
                <div className="w-24 h-32 md:w-32 md:h-40 bg-gray-100 shrink-0 border border-black">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col grow justify-center">
                  <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-1">
                    {item.name}
                  </h3>
                  {/* If you save size in your order_items, display it here */}
                  {item.size && (
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                      Size: {item.size}
                    </p>
                  )}

                  <div className="mt-auto flex justify-between items-end">
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-600">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-xl font-black">
                      Rs. {item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right : Order Summary & Info */}
        <div className="flex flex-col gap-8">
          {/* Shipping Address */}
          <div className="bg-white p-6 md:p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-lg font-black uppercase tracking-tighter mb-6 flex items-center gap-2 border-b border-gray-200 pb-4">
              <MapPin size={20} /> Shipping Address
            </h2>
            <div className="text-sm font-bold tracking-wide text-gray-600 leading-relaxed uppercase">
              <p className="text-black mb-1">
                {order.shipping_address?.fullName}
              </p>
              <p>{order.shipping_address?.street}</p>
              <p>
                {order.shipping_address?.city}, {order.shipping_address?.state}{" "}
                {order.shipping_address?.postalCode}
              </p>
              <p>{order.shipping_address?.country}</p>
              <p className="mt-4 pt-4 border-t border-gray-100">
                Phone: {order.shipping_address?.phone}
              </p>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white p-6 md:p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-lg font-black uppercase tracking-tighter mb-6 flex items-center gap-2 border-b border-gray-200 pb-4">
              <CreditCard size={20} /> Payment Summary
            </h2>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-gray-600">
                <span>Subtotal</span>
                <span>Rs. {order.total_price}</span>{" "}
                {/* will adjust it if adding separate shipping costs in our Database */}
              </div>
              <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-gray-600">
                <span>Shipping</span>
                <span>Included</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t-2 border-black">
              <span className="text-xl font-black uppercase tracking-tighter">
                Total
              </span>
              <span className="text-2xl font-black tracking-wide">
                Rs. {order.total_price}
              </span>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Payment Status
              </span>
              <span
                className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest border
                ${order.payment_status === "Success" ? "border-green-500 text-green-700 bg-green-50" : "border-yellow-500 text-yellow-700 bg-yellow-50"}
              `}
              >
                {order.payment_status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
