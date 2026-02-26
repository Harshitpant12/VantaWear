import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";

import Home from "./pages/public/Home";
import Shop from "./pages/public/Shop";
import Productdetails from "./pages/public/Productdetails";
import Category from "./pages/public/Category";
import Search from "./pages/public/Search";
import Cart from "./pages/public/Cart";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<Productdetails />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          {/* Authenitcated */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Admin */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              {/* will build these next! */}
              {/* <Route path="/admin/products" element={<AdminProducts />} /> */}
              <Route path="/admin/product/new" element={<AddProduct />} />
            </Route>
          </Route>
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
