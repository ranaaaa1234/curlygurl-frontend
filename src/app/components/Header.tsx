"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import Tooltip from "./Tooltip";
import { useCart } from "../components/cart/CartContext";

const Header: React.FC = () => {
  const router = useRouter();
  const { cart } = useCart();
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(total);
  }, [cart]);

  return (
    <header className="p-10 flex items-center justify-between bg-white shadow">
      <Link href="/">
        <h1 className="text-3xl font-bold text-purple-400 cursor-pointer hover:text-purple-900">
          Curly Gurl
        </h1>
      </Link>
      <Link href="/admin">
        <h1 className="text-3xl font-bold text-purple-400 cursor-pointer hover:text-purple-900">
          admin
        </h1>
      </Link>

      <Tooltip text="View your cart">
        <button
          aria-label="View cart"
          onClick={() => router.push("/cart")}
          className="text-purple-400 hover:text-purple-700"
        >
          {totalItems > 0 && (
            <span className="absolute left-5 bottom-6 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalItems}
            </span>
          )}
          <ShoppingCart className="w-8 h-8" />
        </button>
      </Tooltip>
    </header>
  );
};

export default Header;
