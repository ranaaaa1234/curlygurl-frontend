"use client";

import React from "react";
import CartItems from "../components/cart/CartItems";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CartPage = () => {
  return (
    <>
      <Header />
      <CartItems />
      <Footer />
    </>
  );
};

export default CartPage;
