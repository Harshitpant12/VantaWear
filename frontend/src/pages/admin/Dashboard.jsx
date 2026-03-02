import React, { useState, useEffect } from "react";
import {
  BadgeIndianRupee,
  Package,
  ShoppingCart,
  Users,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../api/axios";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/orders/admin-stats");
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-xl font-black uppercase tracking-widest text-gray-400 animate-pulse">
          Loading Data...
        </p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6 text-red-500 font-bold uppercase tracking-widest border-2 border-red-500 bg-red-50">
        {error}
      </div>
    );
  }

  // Generate mock chart data based on recent orders to keep the chart dynamic
  const chartData = stats.recentOrders
    .map((order, index) => ({
      name: `Order ${order._id.slice(-4).toUpperCase()}`,
      Revenue: order.total_price,
    }))
    .reverse(); // Reverse so newest is on the right

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end border-b-2 border-black pb-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">
            Overview
          </h1>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Real-time VantaWear Analytics
          </p>
        </div>
      </div>

      {/* KPI (Key Performance Indicator) Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
          <div className="flex justify-between items-center text-gray-500">
            <span className="text-xs font-bold uppercase tracking-widest">
              Total Revenue
            </span>
            <BadgeIndianRupee size={20} className="text-black" />
          </div>
          <span className="text-3xl font-black uppercase tracking-tighter">
            Rs. {stats.totalRevenue.toLocaleString()}
          </span>
        </div>

        <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
          <div className="flex justify-between items-center text-gray-500">
            <span className="text-xs font-bold uppercase tracking-widest">
              Total Orders
            </span>{" "}
            {/* We may link them to other dashboard pages like /admin/orders */}
            <ShoppingCart size={20} className="text-black" />
          </div>
          <span className="text-3xl font-black uppercase tracking-tighter">
            {stats.totalOrders}
          </span>
        </div>

        <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
          <div className="flex justify-between items-center text-gray-500">
            <span className="text-xs font-bold uppercase tracking-widest">
              Active Products
            </span>
            <Package size={20} className="text-black" />
          </div>
          <span className="text-3xl font-black uppercase tracking-tighter">
            {stats.totalProducts}
          </span>
        </div>

        <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
          <div className="flex justify-between items-center text-gray-500">
            <span className="text-xs font-bold uppercase tracking-widest">
              Total Users
            </span>{" "}
            {/* Including admin or admins*/}
            <Users size={20} className="text-black" />
          </div>
          <span className="text-3xl font-black uppercase tracking-tighter">
            {stats.totalUsers}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-lg font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
            <Activity size={20} /> Recent Revenue Flow
          </h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#6b7280", fontWeight: "bold" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#6b7280", fontWeight: "bold" }}
                  dx={-10}
                />
                <Tooltip
                  cursor={{ fill: "#f9fafb" }}
                  contentStyle={{
                    backgroundColor: "#000",
                    border: "none",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                />
                <Bar
                  dataKey="Revenue"
                  fill="#000"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders List */}
        <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col">
          <h2 className="text-lg font-black uppercase tracking-tighter mb-6 border-b-2 border-black pb-2">
            Live Feed
          </h2>
          <div className="flex flex-col gap-4 grow overflow-y-auto no-scrollbar max-h-72">
            {stats.recentOrders.length === 0 ? (
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 text-center py-10">
                No orders yet
              </p>
            ) : (
              stats.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex flex-col border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-black uppercase">
                      #{order._id.slice(-6).toUpperCase()}
                    </span>
                    <span className="text-sm font-black">
                      Rs. {order.total_price}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border
                      ${order.order_status === "Processing" ? "border-yellow-500 text-yellow-600 bg-yellow-50" : "border-green-500 text-green-600 bg-green-50"}
                    `}
                    >
                      {order.order_status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;