import React from "react";
import { Route, Routes } from "react-router-dom";

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
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
