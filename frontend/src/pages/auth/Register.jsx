import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await register(name, email, password);
      // Once registered, they are automatically logged in via Context. Send them to shop!
      navigate("/shop", { replace: true }); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-white px-6 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            Join The Drop
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
            Create an account for early access.
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
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b-2 border-gray-300 py-3 text-lg font-bold outline-none focus:border-black transition-colors"
            />
          </div>

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
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b-2 border-gray-300 py-3 pr-10 text-lg font-bold outline-none focus:border-black transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              Must be at least 8 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 font-bold uppercase tracking-widest transition-transform duration-300
              ${isSubmitting ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:scale-[1.02] active:scale-95"}
            `}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-gray-200 pt-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-black underline hover:text-gray-600 transition-colors">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;