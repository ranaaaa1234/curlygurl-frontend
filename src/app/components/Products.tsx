"use client";

import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  size: string;
  image: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <section className="max-w-5xl p-10 mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-purple-50 rounded p-4 shadow hover:shadow-lg transition hover:border-purple-900"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded mb-2"
          />
          <h2 className="text-xl text-gray-700 font-semibold">
            {product.name}
          </h2>

          <div className="flex flex-row justify-between">
            <p className="text-gray-600">{product.size}</p>
            <p className="text-purple-500 font-bold">{product.price} kr</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Products;
