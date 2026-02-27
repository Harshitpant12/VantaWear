import React, { useState, useEffect } from "react";
import { Save, AlertCircle, CheckCircle } from "lucide-react";
import api from "../../api/axios";

function AdminSettings() {
  const [formData, setFormData] = useState({
    storeName: "VantaWear",
    contactEmail: "support@vantawear.com",
    flatShippingRate: 500,
    freeShippingThreshold: 10000,
    taxPercentage: 18,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // Fetch current settings on load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/settings"); // will create the route for settings page soon or let's see... default one is also good!
        if (data) {
          setFormData(data);
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
        // If it fails like in our case route not built yet, we just use the default state
        setStatus({ type: "error", message: "Using default settings. Wait until the backend has settings model." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatus({ type: "", message: "" });

    try {
      await api.put("/settings", formData);
      setStatus({ type: "success", message: "Store settings updated successfully." });
    } catch (err) {
      console.error("Failed to save settings:", err);
      setStatus({ type: "error", message: "Failed to update settings. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-xl font-black uppercase tracking-widest text-gray-400 animate-pulse">Loading Config...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8">
        Site Configuration
      </h1>

      {status.message && (
        <div className={`p-4 mb-8 border-2 font-bold uppercase tracking-widest text-sm flex items-center gap-3
          ${status.type === "success" ? "border-green-500 bg-green-50 text-green-700" : "border-yellow-500 bg-yellow-50 text-yellow-700"}
        `}>
          {status.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        
        {/* General Info */}
        <div className="bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-black uppercase tracking-tighter mb-6 border-b border-gray-200 pb-4">
            General Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                Store Name
              </label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 py-3 text-lg font-bold outline-none focus:border-black transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                Support Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 py-3 text-lg font-bold outline-none focus:border-black transition-colors"
              />
            </div>
          </div>
        </div>

        {/*Checkout & Shipping */}
        <div className="bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-black uppercase tracking-tighter mb-6 border-b border-gray-200 pb-4">
            Checkout & Shipping Preferences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                Flat Shipping Rate (Rs.)
              </label>
              <input
                type="number"
                name="flatShippingRate"
                min="0"
                value={formData.flatShippingRate}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 py-3 text-lg font-bold outline-none focus:border-black transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                Free Shipping Threshold (Rs.)
              </label>
              <input
                type="number"
                name="freeShippingThreshold"
                min="0"
                value={formData.freeShippingThreshold}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 py-3 text-lg font-bold outline-none focus:border-black transition-colors"
              />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                Orders over this amount ship free.
              </p>
            </div>

            <div className="flex flex-col gap-2 group md:col-span-2 w-full md:w-1/2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                Tax Percentage (%)
              </label>
              <input
                type="number"
                name="taxPercentage"
                min="0"
                max="100"
                value={formData.taxPercentage}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 py-3 text-lg font-bold outline-none focus:border-black transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSaving}
          className={`w-full py-6 font-black uppercase tracking-widest text-lg flex items-center justify-center gap-3 transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            ${isSaving ? "bg-gray-200 text-gray-500 border-2 border-gray-300 cursor-not-allowed" : "bg-black text-white hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] border-2 border-black"}
          `}
        >
          {isSaving ? "Saving Config..." : <><Save size={24} /> Save Configuration</>}
        </button>

      </form>
    </div>
  );
}

export default AdminSettings;