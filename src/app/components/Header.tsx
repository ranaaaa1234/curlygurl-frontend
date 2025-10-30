"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, Heart } from "lucide-react";
import Tooltip from "./Tooltip";
import { useCart } from "../components/cart/CartContext";
import UserMenu from "./UserMenu";
import { getFavorites } from "./favorites/favoApi";

interface User {
  id: number;
  name: string;
  email: string;
}

const Header: React.FC = () => {
  const router = useRouter();
  const { cart } = useCart();
  const [totalItems, setTotalItems] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [favo, setFavo] = useState<any[]>([]);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(total);
  }, [cart]);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    window.addEventListener("storage", () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        setUser(null);
      }
    });
  }, []);

  // Listen for storage changes (e.g., login/logout in another tab)
  useEffect(() => {
    const handleStorage = () => {
      const token = localStorage.getItem("token");
      if (token) {
        getFavorites(token)
          .then((data) => setFavo(data))
          .catch((err) => console.error("Error fetching favorites:", err));
      } else {
        setFavo([]);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <header className="p-10 px-10 flex items-center justify-between border-b">
      <h1
        className="text-4xl font-bold text-purple-400 cursor-pointer underline hover:text-purple-900"
        onClick={() => router.push("/")}
      >
        Curly Gurl
      </h1>

      <div className="flex items-center gap-6 relative">
        {user ? (
          <div className="flex items-center gap-6">
            <UserMenu user={user} onLogout={() => setUser(null)} />
            <Tooltip text="View your favorites">
              <button
                aria-label="View favorites"
                onClick={() => router.push("/favorites")}
                className="text-purple-400 hover:text-purple-900"
              >
                <Heart className="w-9 h-9" />
              </button>
            </Tooltip>
          </div>
        ) : (
          <Tooltip text="Log in or register">
            <button
              aria-label="User account"
              onClick={() => router.push("/loginRegister")}
              className="text-purple-400 hover:text-purple-900"
            >
              <User className="w-9 h-9" />
            </button>
          </Tooltip>
        )}

        <Tooltip text="View your cart">
          <button
            aria-label="View cart"
            onClick={() => router.push("/cart")}
            className="text-purple-400 hover:text-purple-900"
          >
            {totalItems > 0 && (
              <span className="absolute left-5 bottom-6 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
            <ShoppingCart className="w-9 h-9" />
          </button>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
