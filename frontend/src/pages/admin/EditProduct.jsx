import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  UploadCloud,
  CheckCircle,
  AlertCircle,
  X,
  ArrowLeft,
} from "lucide-react";
import api from "../../api/axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "hoodies",
    stock_quantity: "",
  });

  // Image states separated into "Already in DB" and "New Uploads"
  const [existingImages, setExistingImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImagePreviewUrls, setNewImagePreviewUrls] = useState([]);

  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setFormData({
          name: data.name,
          price: data.price,
          description: data.description,
          category: data.category || "hoodies",
          stock_quantity: data.stock_quantity,
          isFeatured: data.isFeatured || false,
        });
        setExistingImages(data.images || []);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setStatus({ type: "error", message: "Failed to load drop details." });
      } finally {
        setIsFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Remove an image that is already in the database
  const removeExistingImage = (indexToRemove) => {
    setExistingImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  // Handle adding NEW images
  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setNewImageFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setNewImagePreviewUrls((prev) => [...prev, ...newPreviews]);

    e.target.value = null;
  };

  // Remove a NEW image before it gets uploaded
  const removeNewImage = (indexToRemove) => {
    setNewImageFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
    setNewImagePreviewUrls((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      let finalImageUrls = [...existingImages]; // Start with what we kept

      // If they added NEW images, upload them to Cloudinary first
      if (newImageFiles.length > 0) {
        const base64Images = await Promise.all(
          newImageFiles.map(convertToBase64),
        );
        const uploadRes = await api.post("/upload", { images: base64Images });

        const newUploadedUrls = uploadRes.data;
        // Combine old retained images + newly uploaded images
        finalImageUrls = [...finalImageUrls, ...newUploadedUrls];
      }

      const productPayload = {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        category: formData.category,
        stock_quantity: Number(formData.stock_quantity),
        isFeatured: formData.isFeatured,
        images: finalImageUrls,
      };

      // Hit your PUT route to update the product
      await api.put(`/products/${id}`, productPayload);

      setStatus({ type: "success", message: "Drop successfully updated." });

      // Clear the "new" files since they are now part of the "existing" DB images
      setNewImageFiles([]);
      setNewImagePreviewUrls([]);
      setExistingImages(finalImageUrls);
    } catch (error) {
      console.error("Error updating product:", error);
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to update drop.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-xl font-black uppercase tracking-widest text-gray-400 animate-pulse">
          Loading Data...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/admin/products")}
          className="p-2 border-2 border-transparent hover:border-black transition-colors rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
          Edit Drop
        </h1>
      </div>

      {status.message && (
        <div
          className={`p-4 mb-8 border-2 font-bold uppercase tracking-widest text-sm flex items-center gap-3
          ${status.type === "success" ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700"}
        `}
        >
          {status.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        {/* SECTION: Basic Info */}
        <div className="bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-black uppercase tracking-tighter mb-6 border-b border-gray-200 pb-4">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 group md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 py-3 text-lg font-bold outline-none focus:border-black transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                Price (Rs.)
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 py-3 text-lg font-bold outline-none focus:border-black transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 py-3 text-lg font-bold outline-none focus:border-black transition-colors cursor-pointer uppercase tracking-widest bg-transparent"
              >
                <option value="hoodies">Hoodies</option>
                <option value="tees">Tees</option>
                <option value="bottoms">Bottoms</option>
                <option value="sets">Sets</option>
                <option value="outerwear">Outerwear</option>
              </select>
            </div>
            {/* Feature Toggle */}
            <div className="flex flex-col justify-center mt-2 group">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="w-6 h-6 border-2 border-black appearance-none checked:bg-black transition-colors cursor-pointer"
                  />
                  {/* Custom Checkmark that only appears when checked */}
                  {formData.isFeatured && (
                    <svg
                      className="absolute w-4 h-4 text-white left-1 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <span className="text-sm font-black uppercase tracking-widest text-black block">
                    Feature on Homepage
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Will display in the "Featured Drops" section
                  </span>
                </div>
              </label>
            </div>

            <div className="flex flex-col gap-2 group md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                Description
              </label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 py-3 text-sm font-semibold outline-none focus:border-black transition-colors resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* SECTION: Inventory & Media */}
        <div className="bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-black uppercase tracking-tighter mb-6 border-b border-gray-200 pb-4">
            Inventory & Media
          </h2>

          <div className="flex flex-col gap-2 group mb-10 w-full md:w-1/2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock_quantity"
              required
              min="0"
              value={formData.stock_quantity}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 py-3 text-lg font-bold outline-none focus:border-black transition-colors"
            />
          </div>

          {/* Existing Images Grid */}
          {existingImages.length > 0 && (
            <div className="mb-8">
              <label className="text-xs font-bold uppercase tracking-widest text-black mb-4 block">
                Current Images
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {existingImages.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-4/5 border-2 border-black group"
                  >
                    <img
                      src={url}
                      alt={`Existing ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Images Box */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              Add New Images
            </label>
            <label className="w-full border-2 border-dashed border-gray-300 hover:border-black p-8 flex flex-col items-center justify-center cursor-pointer transition-colors group bg-gray-50">
              <UploadCloud
                size={32}
                className="text-gray-400 group-hover:text-black mb-3 transition-colors"
              />
              <span className="text-sm font-bold uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">
                Click to browse files
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleNewImageChange}
                className="hidden"
              />
            </label>

            {/* New Image Previews */}
            {newImagePreviewUrls.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                {newImagePreviewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-4/5 border border-green-500 group shadow-[2px_2px_0px_0px_rgba(34,197,94,1)]"
                  >
                    <img
                      src={url}
                      alt={`New Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-2 right-2 bg-white text-black p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-6 font-black uppercase tracking-widest text-lg transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            ${isLoading ? "bg-gray-200 text-gray-500 border-2 border-gray-300 cursor-not-allowed" : "bg-black text-white hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] border-2 border-black"}
          `}
        >
          {isLoading ? "Updating Drop..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;