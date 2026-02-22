import React from "react";

function Imagecard(prop) {
  return (
    <div className="flex flex-col items-center min-h-96 w-full max-w-xs mx-auto group  pb-4 rounded-3xl border border-gray-100 shadow-2xl cursor-pointer overflow-hidden relative gap-6 transition duration-300">
      {/* image */}
      <img
        src={prop.image}
        className="w-full h-80 object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
      />
      {/* name & price */}
      <div className="flex justify-between items-center w-full px-4 font-semibold">
        <p>{prop.name}</p>
        <p>{prop.price}</p>
      </div>
    </div>
  );
}

export default Imagecard;
