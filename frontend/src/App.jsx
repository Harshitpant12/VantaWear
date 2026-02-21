import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/public/Home";
import Shop from "./pages/public/Shop";
import Productdetails from "./pages/public/Productdetails";
import Category from "./pages/public/Category";
import Search from "./pages/public/Search";
import Cart from "./pages/public/Cart";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Productdetails />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
