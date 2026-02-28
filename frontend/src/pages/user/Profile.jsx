import React, { useState, useEffect } from "react";
import { User, Lock, CheckCircle, AlertCircle, Shield, MapPin, Eye, EyeOff } from "lucide-react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth(); 

  // Combined State matching your backend controller perfectly
  const [profileData, setProfileData] = useState({
    name: "",
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // UI States
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "", section: "" });

  // Password Visibility States
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Pre-fill user data when component mounts
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        fullName: user.address?.fullName || "",
        phone: user.address?.phone || "",
        street: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        postalCode: user.address?.postalCode || "",
        country: user.address?.country || "India",
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // --- HANDLE PROFILE UPDATE ---
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    setStatus({ type: "", message: "", section: "" });

    try {
      await api.put("/users/profile", profileData);
      setStatus({ type: "success", message: "Profile & Address updated.", section: "profile" });
    } catch (error) {
      console.error("Profile update failed:", error);
      setStatus({ 
        type: "error", 
        message: error.response?.data?.message || "Failed to update profile.", 
        section: "profile" 
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // --- HANDLE PASSWORD UPDATE ---
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "", section: "" });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setStatus({ type: "error", message: "New passwords do not match.", section: "password" });
    }

    // Backend consistency check: 8 characters
    if (passwordData.newPassword.length < 8) {
      return setStatus({ type: "error", message: "Password must be at least 8 characters.", section: "password" });
    }

    setIsUpdatingPassword(true);

    try {
      await api.put("/users/password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setStatus({ type: "success", message: "Password securely updated.", section: "password" });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" }); 
      setShowCurrentPassword(false);
      setShowNewPassword(false);
    } catch (error) {
      console.error("Password update failed:", error);
      setStatus({ 
        type: "error", 
        message: error.response?.data?.message || "Failed to update password.", 
        section: "password" 
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      <div className="flex items-center gap-4 mb-12 border-b-2 border-black pb-6">
        <div className="w-16 h-16 bg-black text-white flex items-center justify-center shrink-0">
          <User size={32} />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            My Profile
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mt-1 flex items-center gap-2">
            {user?.role === "admin" && <Shield size={14} className="text-black" />}
            {user?.role === "admin" ? "Administrator Account" : "Customer Account"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* --- PROFILE & ADDRESS FORM (LEFT SIDE) --- */}
        <div>
          <h2 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
            <MapPin size={20} /> Personal & Delivery Info
          </h2>

          {status.section === "profile" && status.message && (
            <div className={`p-4 mb-6 border-2 font-bold uppercase tracking-widest text-xs flex items-center gap-3
              ${status.type === "success" ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700"}
            `}>
              {status.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {status.message}
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className="flex flex-col gap-6 p-6 md:p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
            
            <div className="flex flex-col gap-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                Email Address (Read Only)
              </label>
              <input 
                type="email" 
                disabled 
                value={user?.email || ""} 
                className="w-full border-b-2 border-gray-200 bg-gray-50 text-gray-400 py-3 px-3 text-sm font-bold outline-none cursor-not-allowed" 
              />
            </div>

            <div className="flex flex-col gap-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                Account Name (Required)
              </label>
              <input type="text" name="name" required value={profileData.name} onChange={handleProfileChange} className="w-full border-b-2 border-gray-300 py-3 text-sm font-bold outline-none focus:border-black transition-colors px-1" />
            </div>

            <div className="border-t border-gray-200 pt-6 mt-2">
              <p className="text-xs font-black uppercase tracking-widest text-black mb-4">Default Shipping Details</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="fullName" placeholder="Receiver's Full Name" value={profileData.fullName} onChange={handleProfileChange} className="w-full border-b-2 border-gray-300 py-3 text-sm font-bold outline-none focus:border-black transition-colors px-1" />
                <input type="text" name="phone" placeholder="Phone Number" value={profileData.phone} onChange={handleProfileChange} className="w-full border-b-2 border-gray-300 py-3 text-sm font-bold outline-none focus:border-black transition-colors px-1" />
              </div>
              
              <input type="text" name="street" placeholder="Street Address" value={profileData.street} onChange={handleProfileChange} className="w-full border-b-2 border-gray-300 py-3 mt-4 text-sm font-bold outline-none focus:border-black transition-colors px-1" />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input type="text" name="city" placeholder="City" value={profileData.city} onChange={handleProfileChange} className="w-full border-b-2 border-gray-300 py-3 text-sm font-bold outline-none focus:border-black transition-colors px-1" />
                <input type="text" name="state" placeholder="State" value={profileData.state} onChange={handleProfileChange} className="w-full border-b-2 border-gray-300 py-3 text-sm font-bold outline-none focus:border-black transition-colors px-1" />
                <input type="text" name="postalCode" placeholder="Postal Code" value={profileData.postalCode} onChange={handleProfileChange} className="w-full border-b-2 border-gray-300 py-3 text-sm font-bold outline-none focus:border-black transition-colors px-1" />
                <input type="text" name="country" placeholder="Country" value={profileData.country} onChange={handleProfileChange} className="w-full border-b-2 border-gray-300 py-3 text-sm font-bold outline-none focus:border-black transition-colors px-1" />
              </div>
            </div>

            <button type="submit" disabled={isUpdatingProfile} className={`w-full py-4 mt-4 font-black uppercase tracking-widest text-sm transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${isUpdatingProfile ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:-translate-y-1 active:translate-y-0"}`}>
              {isUpdatingProfile ? "Saving..." : "Save Details"}
            </button>
          </form>
        </div>

        {/* --- PASSWORD UPDATE FORM (RIGHT SIDE) --- */}
        <div>
          <h2 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
            <Lock size={20} /> Security
          </h2>
          
          {status.section === "password" && status.message && (
            <div className={`p-4 mb-6 border-2 font-bold uppercase tracking-widest text-xs flex items-center gap-3
              ${status.type === "success" ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700"}
            `}>
              {status.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {status.message}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-6 p-6 md:p-8 border-2 border-black bg-gray-50">
            
            {/* Current Password (With Toggle) */}
            <div className="flex flex-col gap-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                Current Password
              </label>
              <div className="relative">
                <input 
                  type={showCurrentPassword ? "text" : "password"} 
                  required 
                  value={passwordData.currentPassword} 
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} 
                  className="w-full border-b-2 border-gray-300 py-3 pr-10 text-sm font-bold bg-transparent outline-none focus:border-black transition-colors px-1" 
                  placeholder="Enter current password" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New Password (With Toggle) */}
            <div className="flex flex-col gap-2 group mt-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                New Password
              </label>
              <div className="relative">
                <input 
                  type={showNewPassword ? "text" : "password"} 
                  required 
                  value={passwordData.newPassword} 
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} 
                  className="w-full border-b-2 border-gray-300 py-3 pr-10 text-sm font-bold bg-transparent outline-none focus:border-black transition-colors px-1" 
                  placeholder="Must be at least 8 characters" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password (No Toggle) */}
            <div className="flex flex-col gap-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                Confirm New Password
              </label>
              <input 
                type="password" 
                required 
                value={passwordData.confirmPassword} 
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} 
                className="w-full border-b-2 border-gray-300 py-3 text-sm font-bold bg-transparent outline-none focus:border-black transition-colors px-1" 
                placeholder="Type new password again" 
              />
            </div>

            <button type="submit" disabled={isUpdatingPassword} className={`w-full py-4 mt-2 font-black uppercase tracking-widest text-sm transition-transform duration-300 ${isUpdatingPassword ? "bg-gray-200 text-gray-500 border-2 border-gray-300 cursor-not-allowed" : "bg-white text-black border-2 border-black hover:bg-gray-100"}`}>
              {isUpdatingPassword ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Profile;