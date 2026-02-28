import React, { useState } from "react";
import { Minus, Plus, X, Lock } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

import hoodie from "../../assets/hoodie.png";
import oversized from "../../assets/oversized.png";

function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingThreshold = 10000;
  const progressToFreeShipping = Math.min(
    (subtotal / shippingThreshold) * 100,
    100,
  );

  return (
    <div className="min-h-screen bg-white text-black py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* SECTION 1 -> Page Header */}
        <div className="mb-12 border-b border-gray-200 pb-6">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Your Cart
          </h1>
          <p className="text-gray-500 mt-2 uppercase tracking-widest text-sm font-semibold">
            {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-6">
              Your cart is empty.
            </h2>
            <Link to="/shop">
              <button className="px-10 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          // Cart Layout (60/40 Split)
          <div className="flex flex-col lg:flex-row gap-16 relative">
            {/* SECTION 2 -> Item List (Left Side 60%) */}
            <div className="w-full lg:w-[60%]">
              {cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="flex gap-6 py-6 border-b border-gray-200 relative group"
                >
                  {/* Product Image */}
                  <div className="w-24 h-32 md:w-32 md:h-40 bg-gray-50 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col flex-1 justify-between py-1">
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-tight">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-1">
                        Size: {item.size}
                      </p>
                    </div>

                    {/* Quantity & Price Row */}
                    <div className="flex justify-between items-end mt-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-black w-24 md:w-28 h-10">
                        <button
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="flex-1 flex justify-center items-center hover:bg-black hover:text-white transition-colors h-full"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="flex-1 flex justify-center items-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="flex-1 flex justify-center items-center hover:bg-black hover:text-white transition-colors h-full"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <p className="text-lg font-bold tracking-wide">
                        Rs. {item.price * item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="absolute top-6 right-0 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* SECTION 3 -> Order Summary (Right Side 40%) */}
            <div className="w-full lg:w-[40%]">
              <div className="border-2 border-black p-8 sticky top-24">
                <h2 className="text-xl font-black uppercase tracking-tighter mb-8 pb-4 border-b border-gray-200">
                  Order Summary
                </h2>

                {/* Shipping Progress Bar (Nice touch for premium feel) */}
                <div className="mb-8">
                  {subtotal >= shippingThreshold ? (
                    <p className="text-sm font-bold uppercase tracking-widest text-green-600 mb-2">
                      You've unlocked free shipping!
                    </p>
                  ) : (
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">
                      You're Rs. {shippingThreshold - subtotal} away from free
                      shipping
                    </p>
                  )}
                  <div className="w-full h-1 bg-gray-200">
                    <div
                      className="h-full bg-black transition-all duration-500"
                      style={{ width: `${progressToFreeShipping}%` }}
                    ></div>
                  </div>
                </div>

                {/* Line Items */}
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-gray-600">
                    <span>Estimated Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center border-t border-gray-200 pt-6 mb-8">
                  <span className="text-xl font-black uppercase tracking-tighter">
                    Total
                  </span>
                  <span className="text-2xl font-black tracking-wide">
                    Rs. {subtotal}
                  </span>
                </div>

                {/* Checkout CTA (Call to Action Button) */}
                <Link to="/checkout" className="block w-full mb-6">
                  <button className="w-full bg-black text-white py-5 font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-transform duration-300 flex justify-center items-center gap-2">
                    Proceed to Checkout
                  </button>
                </Link>

                {/* Trust Badges */}
                <div className="flex flex-col items-center gap-2 text-xs text-gray-500 uppercase tracking-widest font-semibold text-center">
                  <div className="flex items-center gap-1">
                    <Lock size={12} /> Secure Checkout
                  </div>
                  <p>Free shipping on orders over Rs. 10000</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
