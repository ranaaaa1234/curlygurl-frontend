"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  LogOut,
  UserCheck,
} from "lucide-react";
import Tooltip from "./Tooltip";
import { useCart } from "../components/cart/CartContext";
import UserMenu from "./UserMenu";
import { getFavorites } from "./favorites/favoApi";
import LogOutBtn from "./LogOutBtn";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(total);
  }, [cart]);

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
    <header className="p-10 px-10 flex items-center justify-between border-b relative">
      <h1
        className="xs:text-3xl md:text-4xl font-bold text-purple-400 cursor-pointer underline hover:text-purple-900"
        onClick={() => router.push("/")}
      >
        Curly Gurl
      </h1>

      <div className="flex items-center gap-6">
        <Tooltip text="View your cart">
          <button
            aria-label="View cart"
            onClick={() => router.push("/cart")}
            className="text-purple-400 hover:text-purple-900 relative"
          >
            {totalItems > 0 && (
              <span className="absolute left-6 bottom-5 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
            <ShoppingCart className="w-9 h-9" />
          </button>
        </Tooltip>

        <div className="hidden md:flex items-center gap-6 relative">
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
        </div>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden text-purple-400 hover:text-purple-900 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-9 h-9" /> : <Menu className="w-9 h-9" />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 w-full bg-white shadow-md border-t flex flex-col items-center py-4 md:hidden z-50">
          {user ? (
            <>
              <button
                onClick={() => {
                  router.push("/userPage");
                  setIsMenuOpen(false);
                }}
                className="w-full flex justify-center items-center gap-2 py-2 text-purple-900 font-semibold hover:bg-purple-50"
              >
                Profile
                <UserCheck className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  router.push("/favorites");
                  setIsMenuOpen(false);
                }}
                className="w-full flex justify-center items-center gap-2 py-2 text-purple-900 font-semibold hover:bg-purple-50"
              >
                Favorites
                <Heart className="w-5 h-5" />
              </button>

              <div className="border-t w-full mt-2 pt-2">
                <LogOutBtn className="w-full flex justify-center items-center gap-2 text-red-600 font-semibold hover:bg-red-50 py-2 transition">
                  Log out
                  <LogOut className="w-5 h-5" />
                </LogOutBtn>
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                router.push("/loginRegister");
                setIsMenuOpen(false);
              }}
              className="w-full flex justify-center items-center gap-2 py-2 text-purple-900 font-semibold hover:bg-purple-50"
            >
              Log in / Register
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
