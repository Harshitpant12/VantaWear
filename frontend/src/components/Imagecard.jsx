import React from "react";
import Model from "../assets/model.png";

function Imagecard(prop) {
  return (
    <div className="group flex flex-col h-96 w-72 px-0.5 pb-4 mx-8 rounded-3xl border-white shadow-2xl cursor-pointer overflow-hidden relative gap-3">
      {/* image */}
      <div>
        <img src={prop.image} alt="" className="h-80 w-auto object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105" />
        {/* subtle dark overlay */}
        <div className="absolute inset-0 bg-black/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      
      {/* name & price */}
      <div className="flex justify-between items-center mx-3 font-semibold">
        <p>{prop.name}</p>
        <p>{prop.price}</p>
      </div>
    </div>
  );
}

export default Imagecard;
