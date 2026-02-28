import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Lock } from "lucide-react";

import api from "../../api/axios";
import { useCart } from "../../context/CartContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { removeFromCart } = useCart();

  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Confirm the payment with Stripe directly
      const { paymentIntent, error: stripeError } = await stripe.confirmPayment(
        {
          elements,
          redirect: "if_required", // Prevents automatic redirect so we can hit our verify route
        },
      );

      if (stripeError) {
        setError(stripeError.message);
        setIsProcessing(false);
        return;
      }

      // If Stripe says it succeeded, hit /verify route to create the Order!
      if (paymentIntent && paymentIntent.status === "succeeded") {
        await api.post("/payment/verify", {
          paymentIntentId: paymentIntent.id,
        });

        // Clear the cart and send a success page
        if (removeFromCart) removeFromCart();
        navigate("/order-success", { replace: true });
      }
    } catch (err) {
      console.error("Payment verification failed:", err);
      setError(
        "Payment verified by Stripe, but order creation failed. Please contact support.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 bg-gray-50 p-6 border-2 border-black"
    >
      <h3 className="text-xl font-black uppercase tracking-tighter mb-4 flex items-center gap-2">
        <Lock size={20} /> Secure Payment
      </h3>

      {/* Stripe's Pre-built UI Component */}
      <PaymentElement className="mb-4" />

      {error && (
        <div className="p-3 bg-red-50 border-2 border-red-500 text-red-700 text-xs font-bold uppercase tracking-widest">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full py-5 font-black uppercase tracking-widest text-lg transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          ${isProcessing ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"}
        `}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    phone: "",
  });

  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Calculate cart total for display
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleShippingChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  // Step 1: Submit Shipping -> Get Client Secret
  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        cartItems: cartItems,
        shippingAddress,
      };

      const { data } = await api.post("/payment/process", payload);
      setClientSecret(data.clientSecret); // This unlocks the Stripe Payment element!
    } catch (err) {
      console.error("Failed to initialize payment:", err);
      setError(err.response?.data?.message || "Failed to initialize payment.");
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/shop")}
          className="border-b-2 border-black font-bold uppercase tracking-widest"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Shipping & Payment */}
      <div>
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-10">
          Checkout
        </h1>

        {error && (
          <div className="p-4 mb-8 border-2 border-red-500 bg-red-50 text-red-700 font-bold uppercase tracking-widest text-sm">
            {error}
          </div>
        )}

        {!clientSecret ? (
          <form
            onSubmit={handleProceedToPayment}
            className="flex flex-col gap-6"
          >
            <h2 className="text-xl font-black uppercase tracking-tighter mb-2 border-b-2 border-black pb-2">
              1. Shipping Details
            </h2>

            <input
              required
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={shippingAddress.fullName}
              onChange={handleShippingChange}
              className="w-full border-b-2 border-gray-300 py-3 font-bold outline-none focus:border-black transition-colors"
            />
            <input
              required
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={shippingAddress.phone}
              onChange={handleShippingChange}
              className="w-full border-b-2 border-gray-300 py-3 font-bold outline-none focus:border-black transition-colors"
            />
            <input
              required
              type="text"
              name="street"
              placeholder="Street Address"
              value={shippingAddress.street}
              onChange={handleShippingChange}
              className="w-full border-b-2 border-gray-300 py-3 font-bold outline-none focus:border-black transition-colors"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                required
                type="text"
                name="city"
                placeholder="City"
                value={shippingAddress.city}
                onChange={handleShippingChange}
                className="w-full border-b-2 border-gray-300 py-3 font-bold outline-none focus:border-black transition-colors"
              />
              <input
                required
                type="text"
                name="state"
                placeholder="State"
                value={shippingAddress.state}
                onChange={handleShippingChange}
                className="w-full border-b-2 border-gray-300 py-3 font-bold outline-none focus:border-black transition-colors"
              />
            </div>

            <input
              required
              type="text"
              name="postalCode"
              placeholder="Postal Code / PIN"
              value={shippingAddress.postalCode}
              onChange={handleShippingChange}
              className="w-full border-b-2 border-gray-300 py-3 font-bold outline-none focus:border-black transition-colors"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full py-5 bg-black text-white font-black uppercase tracking-widest text-lg hover:bg-gray-900 transition-colors"
            >
              {isLoading ? "Securing Session..." : "Proceed to Payment"}
            </button>
          </form>
        ) : (
          /* Only shows after clientSecret is generated */
          <div>
            <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-2">
              <h2 className="text-xl font-black uppercase tracking-tighter text-gray-400">
                1. Shipping Details <span className="text-sm">✓</span>
              </h2>
              <button
                onClick={() => setClientSecret("")}
                className="text-xs font-bold uppercase tracking-widest underline"
              >
                Edit
              </button>
            </div>

            <h2 className="text-xl font-black uppercase tracking-tighter mb-6 border-b-2 border-black pb-2">
              2. Payment Method
            </h2>

            {/* This wraps the form in Stripe's context using the secret we got from the backend */}
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "flat",
                  variables: { colorPrimary: "#000000" },
                },
              }}
            >
              <CheckoutForm clientSecret={clientSecret} />
            </Elements>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-8 border-2 border-black h-fit sticky top-24">
        <h2 className="text-xl font-black uppercase tracking-tighter mb-8 border-b border-gray-200 pb-4">
          Order Summary
        </h2>
        <div className="flex flex-col gap-6 mb-8">
          {cartItems.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-20 h-24 bg-gray-200 border border-black shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col grow">
                <p className="font-black uppercase tracking-tight text-sm">
                  {item.name}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">
                  Qty: {item.quantity}
                </p>
                <p className="mt-auto font-bold">Rs. {item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-black pt-4 flex justify-between items-center">
          <p className="font-black uppercase tracking-widest">Total</p>
          <p className="text-2xl font-black">Rs. {cartTotal}</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
