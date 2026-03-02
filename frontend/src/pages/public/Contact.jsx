import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Mail, MapPin, Clock } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulating an API call to backend
    setTimeout(() => {
      toast.success("Message received. We'll be in touch.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16">
      
      {/* Left Column: Info */}
      <div className="flex flex-col justify-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
          Reach Out
        </h1>
        <p className="text-gray-500 font-medium leading-relaxed mb-12 max-w-md">
          Have a question about a recent drop, sizing, or an existing order? Fill out the form and our support team will get back to you within 24 hours.
        </p>

        <div className="flex flex-col gap-8 border-l-4 border-black pl-6">
          <div className="flex items-center gap-4">
            <Mail size={24} className="text-black" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Us</p>
              <p className="font-bold">support@vantawear.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MapPin size={24} className="text-black" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Headquarters</p>
              <p className="font-bold">Hyderabad, India</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Clock size={24} className="text-black" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Support Hours</p>
              <p className="font-bold">Mon - Fri | 10AM - 5PM IST</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: The Form */}
      <div className="bg-gray-50 p-8 md:p-12 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border-b-2 border-gray-300 bg-transparent py-3 font-bold outline-none focus:border-black transition-colors" />
            </div>
            <div className="flex flex-col gap-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">Email</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-b-2 border-gray-300 bg-transparent py-3 font-bold outline-none focus:border-black transition-colors" />
            </div>
          </div>

          <div className="flex flex-col gap-2 group">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">Subject</label>
            <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full border-b-2 border-gray-300 bg-transparent py-3 font-bold outline-none focus:border-black transition-colors" />
          </div>

          <div className="flex flex-col gap-2 group mb-4">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">Message</label>
            <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full border-b-2 border-gray-300 bg-transparent py-3 font-bold outline-none focus:border-black transition-colors resize-none"></textarea>
          </div>

          <button type="submit" disabled={isSubmitting} className={`w-full py-5 font-black uppercase tracking-widest text-lg transition-transform duration-300 border-2 border-black ${isSubmitting ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed" : "bg-black text-white hover:bg-white hover:text-black"}`}>
            {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
          </button>
        </form>
      </div>

    </div>
  );
}

export default Contact;