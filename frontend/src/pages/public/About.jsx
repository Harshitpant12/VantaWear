import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="w-full bg-black py-24 md:py-32 px-6 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-white font-black text-5xl md:text-7xl uppercase tracking-tighter text-center">
          Against The Grain
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* The Brand Story */}
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter border-b-2 border-black pb-4">
            The VantaWear Ethos
          </h2>
          <p className="text-gray-600 leading-relaxed font-medium">
            VantaWear isn't just a clothing brand; it's a rejection of fast fashion and mass production. We believe in the power of minimalism, heavy-duty materials, and structural silhouettes. 
          </p>
          <p className="text-gray-600 leading-relaxed font-medium">
            Every drop is strictly limited. We source premium 400 GSM heavyweight cotton to ensure that our garments don't just look aggressive—they survive the elements and get better with age. No restocks. No compromises.
          </p>
          <Link to="/shop" className="mt-4 inline-block w-max border-b-2 border-black pb-1 font-bold uppercase tracking-widest text-sm hover:text-gray-500 hover:border-gray-500 transition-colors">
            Explore the Collection
          </Link>
        </div>

        {/* The Founder Story */}
        <div className="bg-gray-50 p-8 md:p-12 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            The Founder
          </p>
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">
            Harshit Pant
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Operating at the intersection of precision software engineering and raw streetwear culture. As a computer science engineer, the focus has always been on building scalable, architecturally sound systems. VantaWear is the physical manifestation of that exact same philosophy.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Whether it's writing clean, efficient code or designing a perfectly draped heavyweight hoodie, the goal remains the same: strip away the noise and deliver an unapologetically premium experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;