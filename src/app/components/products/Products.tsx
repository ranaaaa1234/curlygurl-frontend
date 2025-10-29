"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, ArrowLeft, OctagonXIcon, Heart } from "lucide-react";
import Tooltip from "../Tooltip";
import { useCart } from "../cart/CartContext";
import { useFavo } from "../favorites/FavoContext";

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
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const { favo, addToFavo, removeFromFavo } = useFavo();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!API_URL) {
      setError("API URL not set");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, [API_URL]);

  const filtered = Array.isArray(products)
    ? query
      ? products.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : products
    : [];

  if (loading)
    return (
      <p className="text-center text-gray-600 p-10">Loading products...</p>
    );
  if (error) return <p className="text-red-600">{error}</p>;

const handleToggleFavo = (product: Product) => {
    const isInFavo = favo.some((item) => item.id === product.id);
    if (isInFavo) {
      removeFromFavo(product.id);
    } else {
      addToFavo(product);
    }
  };

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
        {filtered.map((product) => {
          const isFavorited = favo.some((item) => item.id === product.id);
          return (
            <div
              key={product.id}
              className="border border-purple-50 rounded p-4 shadow hover:shadow-lg transition hover:border-purple-900"
            >
              <img
                src={`${API_URL}${product.image}`}
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
                <div className="flex flex-row gap-3 items-center">
                  <Tooltip text={isFavorited ? "Already favorited" : "Add to favorites"}>
                    <button onClick={() => addToFavo(product)}>
                      <Heart
                        className={`w-6 h-6 ${
                          isFavorited
                            ? "text-purple-900"
                            : "text-purple-400 hover:text-purple-900"
                        }`}
                      />
                    </button>
                  </Tooltip>
                  <Tooltip text="Add to cart">
                    <button onClick={() => addToCart(product)}>
                      <ShoppingCart className="w-6 h-6 text-purple-400 hover:text-purple-700" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
