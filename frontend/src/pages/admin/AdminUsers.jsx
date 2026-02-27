import React, { useState, useEffect } from "react";
import { Search, Shield, Trash2, User, AlertCircle } from "lucide-react";

import api from "../../api/axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all users on load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/users");
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load customers. Check your backend connection.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete the account for "${name}"?`);
    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${id}`);
      
      // Instantly remove it from the UI
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Error deleting user. Please try again.");
    }
  };

  // Filter users by search (Name or Email)
  const filteredUsers = users.filter((user) => 
    (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
          Customers
        </h1>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72 group">
          <input
            type="text"
            placeholder="Search Name or Email..."
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

      {/* The VantaWear Users Table */}
      <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b-2 border-black bg-gray-50 text-xs uppercase tracking-widest text-gray-500">
                <th className="py-4 px-6 font-bold">User</th>
                <th className="py-4 px-6 font-bold">Email</th>
                <th className="py-4 px-6 font-bold">Joined</th>
                <th className="py-4 px-6 font-bold">Role</th>
                <th className="py-4 px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center font-bold uppercase tracking-widest text-gray-400 animate-pulse">
                    Loading customer data...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center font-bold uppercase tracking-widest text-gray-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    
                    {/* User Name & Avatar Placeholder */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-500">
                        <User size={16} />
                      </div>
                      <span className="font-black tracking-tight text-black">{user.name}</span>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-6 font-semibold text-gray-600">
                      {user.email}
                    </td>

                    {/* Joined Date */}
                    <td className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    
                    {/* Role Badge */}
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border flex w-max items-center gap-1 ${
                        user.role === "admin" 
                          ? "border-black text-white bg-black" 
                          : "border-gray-300 text-gray-600 bg-gray-50"
                      }`}>
                        {user.role === "admin" && <Shield size={10} />}
                        {user.role || "user"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => handleDeleteUser(user._id, user.name)}
                        disabled={user.role === "admin"} // Prevent accidentally deleting other admins if there is!
                        className={`p-2 transition-colors ${
                          user.role === "admin" 
                            ? "text-gray-300 cursor-not-allowed" 
                            : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                        }`}
                      >
                        <Trash2 size={18} />
                      </button>
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

export default AdminUsers;