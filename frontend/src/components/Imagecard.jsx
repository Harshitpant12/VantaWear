import React from "react";

function Imagecard({ name, image, price, dark = false }) {
  return (
    <div className="flex flex-col w-full group cursor-pointer relative">
      {/* image */}
      <div className="relative w-full aspect-4/5 overflow-hidden bg-gray-50 mb-4">
        <img
          src={image}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
      </div>
      {/* name & price */}
      <div className="flex justify-between items-start w-full">
        <h3
          className={`text-sm font-black uppercase tracking-tight transition-colors ${dark ? " text-white group-hover:text-gray-300" : " text-black group-hover:text-gray-500"}`}
        >
          {name}
        </h3>
        <p
          className={`text-sm font-bold whitespace-nowrap ml-4 ${dark ? "text-gray-400" : "text-gray-500"}`}
        >
          {price}
        </p>
      </div>
    </div>
  );
}

export default Imagecard;
