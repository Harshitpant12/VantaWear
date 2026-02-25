import React from "react";
import { TrendingUp, Package, Users, AlertCircle } from "lucide-react";

function Dashboard() {
  // Dummy stats for now until connected to backend
  const stats = [
    { title: "Total Revenue", value: "Rs. 450,000", subtitle: "+12% this month", icon: <TrendingUp size={24} /> },
    { title: "Active Orders", value: "24", subtitle: "12 processing, 12 shipped", icon: <Package size={24} /> },
    { title: "Total Customers", value: "890", subtitle: "+5 new today", icon: <Users size={24} /> },
    { title: "Low Stock Items", value: "3", subtitle: "Requires immediate restock", icon: <AlertCircle size={24} className="text-red-500" /> },
  ];

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8">
        Overview
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                {stat.title}
              </h3>
              {stat.icon}
            </div>
            <p className="text-3xl font-black tracking-tighter mb-1">{stat.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {stat.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders Table Skeleton */}
      <div className="bg-white border-2 border-black p-6">
        <h2 className="text-xl font-black uppercase tracking-tighter mb-6 pb-4 border-b border-gray-200">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black text-xs uppercase tracking-widest text-gray-500">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy Row */}
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 font-bold">#VW-1042</td>
                <td className="py-4 px-4">Harshit Pant</td>
                <td className="py-4 px-4 text-gray-500">Oct 24, 2023</td>
                <td className="py-4 px-4 font-bold">Rs. 11,800</td>
                <td className="py-4 px-4">
                  <span className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                    Processing
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;