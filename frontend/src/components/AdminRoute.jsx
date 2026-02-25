import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl font-black uppercase tracking-widest text-gray-500 animate-pulse">
          Verifying Access...
        </p>
      </div>
    );
  }

  // Check if user exists AND if their role is admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // If they are an admin, render the nested routes
  return <Outlet />;
}

export default AdminRoute;