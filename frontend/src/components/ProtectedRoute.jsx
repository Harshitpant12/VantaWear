import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl font-black uppercase tracking-widest text-gray-500 animate-pulse">
          Authenticating...
        </p>
      </div>
    );
  }

  // If there is no logged-in user, redirect to login page.
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user exists, render the child routes (like Checkout)
  return <Outlet />;
}

export default ProtectedRoute;