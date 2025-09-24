"use client";

import React, { useState } from "react";
import Searchbar from "../Searchbar";
import Products from "./Products";

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Searchbar onSearch={setSearchQuery} />
      <Products query={searchQuery} onClearQuery={() => setSearchQuery("")} />
    </>
  );
};

export default ProductsPage;
