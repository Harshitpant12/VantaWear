import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      toast.success("Successfully logged in.");
      
      // If they are an admin, immediately send them to the dashboard
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } 
      // If they came from a specific page (like Checkout), send them back. Otherwise, default to the Shop page instead of Home.
      else {
        const destination = (from === "/" || from === "/login") ? "/shop" : from;
        navigate(destination, { replace: true });
      }
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-6 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            Welcome Back
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
            Log in to access your drops.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div className="p-4 border-2 border-red-500 bg-red-50 text-red-600 text-sm font-bold uppercase tracking-widest text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2 group">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-gray-300 py-3 text-lg font-bold outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2 group mb-4 relative">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-gray-300 py-3 text-lg font-bold outline-none focus:border-black transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-black transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 font-bold uppercase tracking-widest transition-transform duration-300
              ${isSubmitting ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:scale-[1.02] active:scale-95"}
            `}
          >
            {isSubmitting ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-gray-200 pt-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-black underline hover:text-gray-600 transition-colors">
              Create One
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;