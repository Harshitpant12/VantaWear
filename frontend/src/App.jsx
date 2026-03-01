import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/AdminLayout";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import { CartProvider } from "./context/CartContext";

import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import AdminProducts from "./pages/admin/AdminProducts";
import EditProduct from "./pages/admin/EditProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";

import Home from "./pages/public/Home";
import Shop from "./pages/public/Shop";
import Productdetails from "./pages/public/Productdetails";
import Category from "./pages/public/Category";
import Search from "./pages/public/Search";
import Cart from "./pages/public/Cart";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Checkout from "./pages/user/Checkout";
import OrderSuccess from "./pages/user/OrderSuccess";
import OrderHistory from "./pages/user/OrderHistory";
import OrderDetails from "./pages/user/OrderDetails";
import Profile from "./pages/user/Profile";

function App() {
  return (
    <>
      <CartProvider>
        <Toaster position="bottom-right" toastOptions={{ style: { borderRadius: '0', background: '#000', color: '#fff', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '12px', letterSpacing: '0.1em' } }} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<Productdetails />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          {/* Authenitcation */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Authenticated User */}
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/account/orders" element={<OrderHistory />} />
            <Route path="/account/orders/:id" element={<OrderDetails />} />
            <Route path="/account/profile" element={<Profile />} />
          </Route>
          {/* Admin */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/product/new" element={<AddProduct />} />
              <Route path="/admin/product/edit/:id" element={<EditProduct />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
          </Route>
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
