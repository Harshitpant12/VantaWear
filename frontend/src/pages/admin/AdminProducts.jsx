import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Plus, AlertCircle } from "lucide-react";
import api from "../../api/axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products on load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetching with a high limit for the admin dashboard
        const { data } = await api.get("/products?limit=50");
        setProducts(data.products || data);
      } catch (err) {
        console.error("Error fetching admin products:", err);
        setError("Failed to load drops. Check your connection.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle Delete Product
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete "${name}"?`);
    if (!confirmDelete) return;

    try {
      // Hit your backend delete route
      await api.delete(`/products/${id}`);
      
      // Instantly remove it from the UI without refreshing the page
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Error deleting product. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
          Manage Drops
        </h1>
        <Link to="/admin/product/new">
          <button className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold uppercase tracking-widest text-sm hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
            <Plus size={18} />
            Add New Drop
          </button>
        </Link>
      </div>

      {error && (
        <div className="p-4 mb-8 border-2 border-red-500 bg-red-50 text-red-700 font-bold uppercase tracking-widest text-sm flex items-center gap-3">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* The VantaWear Data Table */}
      <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b-2 border-black bg-gray-50 text-xs uppercase tracking-widest text-gray-500">
                <th className="py-4 px-6 font-bold">Image</th>
                <th className="py-4 px-6 font-bold">Name</th>
                <th className="py-4 px-6 font-bold">Price</th>
                <th className="py-4 px-6 font-bold">Stock</th>
                <th className="py-4 px-6 font-bold">Category</th>
                <th className="py-4 px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center font-bold uppercase tracking-widest text-gray-400 animate-pulse">
                    Loading inventory...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center font-bold uppercase tracking-widest text-gray-400">
                    No drops found. Start creating.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    
                    {/* Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="w-12 h-16 bg-gray-200 border border-gray-300 overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-bold">N/A</div>
                        )}
                      </div>
                    </td>

                    {/* Product Details */}
                    <td className="py-4 px-6 font-black tracking-tight">{product.name}</td>
                    <td className="py-4 px-6 font-semibold text-gray-600">Rs. {product.price}</td>
                    
                    {/* Stock Status */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex w-max whitespace-nowrap px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${
                        product.stock_quantity > 10 ? "border-green-500 text-green-600 bg-green-50" : 
                        product.stock_quantity > 0 ? "border-yellow-500 text-yellow-600 bg-yellow-50" : 
                        "border-red-500 text-red-600 bg-red-50"
                      }`}>
                        {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : "Sold Out"}
                      </span>
                    </td>

                    <td className="py-4 px-6 font-bold uppercase tracking-widest text-xs text-gray-500">
                      {product.category}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {/* Edit Button */}
                        <Link to={`/admin/product/edit/${product._id}`}>
                          <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors">
                            <Edit size={18} />
                          </button>
                        </Link>
                        
                        {/* Delete Button */}
                        <button 
                          onClick={() => handleDelete(product._id, product.name)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
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

export default AdminProducts;