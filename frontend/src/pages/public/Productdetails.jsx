import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import api from "../../api/axios";
import Imagecard from "../../components/Imagecard";
import { useCart } from "../../context/CartContext";

import Model from "../../assets/model.png";
import hoodie from "../../assets/hoodie.png";
import monochrome from "../../assets/monochrome.png";
import oversized from "../../assets/oversized.png";

function Productdetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]); // this will be used for complete the look section
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const [selectedSize, setSelectedSize] = useState("");
  const [showError, setShowError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("details");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        // fetching the product
        const { data } = await api.get(`/products/${id}`); // the same route we used in backend
        setProduct(data);

        // fetching related products (Complete the look)
        if (data.category) {
          const relatedRes = await api.get(
            `/products?category=${data.category}&limit=4`,
          ); // will implement it properly soon...
          setRelated(relatedRes.data.products.filter((p) => p._id !== id));
        }
      } catch (error) {
        console.error("Error fetching product : ", error);
        setError("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductData();
  }, [id]); // re-render or re-run on id change in url

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }
    setShowError(false);
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // shows for 3 seconds
  };

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? "" : section);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl font-black uppercase tracking-widest text-gray-500 animate-pulse">
          Loading Drop...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">
          Product Not Found
        </h1>
        <Link
          to="/shop"
          className="underline font-bold uppercase tracking-widest text-sm"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      <div
        className={`fixed bottom-8 right-8 z-50 bg-black text-white px-8 py-4 shadow-2xl transition-all duration-500 transform ${
          showToast
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <p className="text-sm font-bold uppercase tracking-widest flex items-center gap-3">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Added to Cart
        </p>
      </div>
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          {/* Modal Container */}
          <div className="bg-white w-full max-w-2xl p-8 md:p-12 relative border-2 border-black shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black hover:scale-110 transition-all"
            >
              <X size={28} />
            </button>

            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
              Size Guide
            </h2>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">
              Heavyweight Hoodie (Inches)
            </p>

            {/* Sizing Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-medium">
                <thead>
                  <tr className="border-b-2 border-black text-xs uppercase tracking-widest text-gray-500">
                    <th className="py-4 pr-6">Size</th>
                    <th className="py-4 px-6">Chest</th>
                    <th className="py-4 px-6">Length</th>
                    <th className="py-4 pl-6">Sleeve</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: "S", chest: "44", length: "26", sleeve: "34" },
                    { size: "M", chest: "46", length: "27", sleeve: "35" },
                    { size: "L", chest: "48", length: "28", sleeve: "36" },
                    { size: "XL", chest: "50", length: "29", sleeve: "37" },
                    { size: "XXL", chest: "52", length: "30", sleeve: "38" },
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 pr-6 font-black">{row.size}</td>
                      <td className="py-4 px-6 text-gray-600">{row.chest}</td>
                      <td className="py-4 px-6 text-gray-600">{row.length}</td>
                      <td className="py-4 pl-6 text-gray-600">{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 uppercase tracking-widest leading-relaxed">
                * Measurements are taken with the garment laying flat. For a
                boxier fit, we recommend going true to size. For an oversized
                fit, size up.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1 & 2 -> Split Screen Layout */}
      <div className="flex flex-col lg:flex-row w-full">
        {/* Left Side: Image Gallery (60%) */}
        <div className="w-full lg:w-[60%] flex flex-col gap-1 md:gap-4 bg-gray-50">
          {product.images?.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`${product.name} View ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          ))}
        </div>

        {/* Right Side: Product Info (40%) */}
        <div className="w-full lg:w-[40%] px-6 py-12 lg:p-16 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto no-scrollbar">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6 cursor-pointer">
            Home / Shop / <span className="text-black">{product.name}</span>
          </p>

          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            {product.name}
          </h1>
          <p className="text-2xl tracking-wide mb-6">{product.price}</p>

          <div className="flex items-center gap-3 mb-10">
            {product.stock_quantity > 0 ? (
              <>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  In Stock
                </span>
              </>
            ) : (
              <>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-red-500">
                  Sold Out
                </span>
              </>
            )}
          </div>

          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest">
                Select Size
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs text-gray-500 underline uppercase tracking-widest hover:text-black transition-colors"
              >
                Size Guide
              </button>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border border-black py-3 text-sm font-semibold transition-colors duration-300 
                    ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-black hover:text-white"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Show error if size is not selected */}
            {showError && (
              <p className="text-red-500 text-xs mt-3 uppercase tracking-widest font-bold">
                * Please select a size
              </p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock_quantity <= 0}
            className={`w-full py-5 font-bold uppercase tracking-widest transition-transform duration-300 mb-12
                ${
                  product.stock_quantity > 0
                    ? "bg-black text-white hover:scale-[1.02] active:scale-95"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
            `}
          >
            {product.stock_quantity > 0 ? "Add to Cart" : "Out of Stock"}
          </button>

          {/* SECTION 3 -> Details & Care */}
          <div className="border-t border-gray-200">
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleAccordion("details")}
                className="w-full py-5 flex justify-between items-center text-sm font-bold uppercase tracking-widest"
              >
                Product Details
                {openAccordion === "details" ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openAccordion === "details" ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleAccordion("materials")}
                className="w-full py-5 flex justify-between items-center text-sm font-bold uppercase tracking-widest"
              >
                Materials & Care {/* will implement them later */}
                {openAccordion === "materials" ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openAccordion === "materials" ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-4 flex flex-col gap-1">
                  <li>400 GSM Heavyweight French Terry Cotton</li>
                  <li>100% Cotton</li>
                  <li>Machine wash cold, lay flat to dry</li>
                </ul>
              </div>
            </div>

            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full py-5 flex justify-between items-center text-sm font-bold uppercase tracking-widest"
              >
                Shipping & Returns
                {openAccordion === "shipping" ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openAccordion === "shipping" ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="text-gray-600 text-sm leading-relaxed">
                  Free shipping on all orders over Rs. 10000. All limited drops
                  are final sale. See our return policy for full details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4 -> Complete The Look */}
      {related.length > 0 && (
        <div className="w-full bg-white py-20 px-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-black text-2xl md:text-3xl font-black uppercase tracking-tighter mb-10 text-center md:text-left">
              Complete The Look
            </h2>
            <div className="flex overflow-x-auto gap-8 pb-8 no-scrollbar snap-x snap-mandatory">
              {related.map((relProduct) => (
                <Link
                  to={`/products/${relProduct._id}`}
                  key={relProduct._id}
                  className="min-w-70 md:min-w-[320px] snap-center block"
                >
                  <Imagecard
                    image={relProduct.images[0]}
                    name={relProduct.name}
                    price={`Rs. ${relProduct.price}`}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Productdetails;
