"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, ArrowLeft, OctagonXIcon } from "lucide-react";
import Tooltip from "../Tooltip";
import { useCart } from "../cart/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  size: string;
  image: string;
  quantity: number;
}

interface ProductsProps {
  query: string;
  onClearQuery: () => void;
}

const Products: React.FC<ProductsProps> = ({ query, onClearQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/login`)
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

  const filtered = query
    ? products.filter((p) => p.name.toLowerCase().includes(query))
    : products;

  if (loading) return <p>Loading products...</p>;

  return (
    <section className="max-w-5xl p-10 mx-auto px-4">
      <h2 className="text-4xl mb-10 text-center text-purple-900 font-semibold">
        Explore our products
      </h2>
      {filtered.length === 0 && (
        <div className="flex flex-row gap-1 justify-center items-center ">
          <OctagonXIcon className="w-5 h-5 text-red-600" />
          <p className="text-red-600 font-bold">Products not found</p>
        </div>
      )}
      {query && (
        <button
          onClick={onClearQuery}
          className="mb-6 flex items-center gap-1 text-purple-400 font-bold hover:text-purple-900"
        >
          <ArrowLeft className="w-5 h-5" />
          View all products
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="border border-purple-50 rounded p-4 shadow hover:shadow-lg transition hover:border-purple-900"
          >
            <img
              src={`http://localhost:4000${product.image}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-6 mx-auto"
            />
            <h2 className="text-xl text-gray-700 font-semibold">
              {product.name}
            </h2>
            <p className="font-semibold text-sm text-gray-500">
              {product.size}
            </p>

            <div className="flex flex-row justify-between mt-1">
              <p className="text-purple-400 font-bold">{product.price} kr</p>

              <Tooltip text="Add to cart">
                <button onClick={() => addToCart(product )}>
                  <ShoppingCart className="w-6 h-6 text-purple-400 hover:text-purple-700" />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
