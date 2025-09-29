"use client";
import React, { useState } from "react";
import UserProfile from "../components/UserProfile";
import UserOrdersPage from "../components/UserOrders";

export default function UserPage() {
  const [view, setView] = useState<"profile" | "orders">("profile");

  const toggleView = () => {
    setView(view === "profile" ? "orders" : "profile");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div
        onClick={toggleView}
        className="relative w-80 h-10 border rounded cursor-pointer flex items-center"
      >
        <div
          className={`absolute top-1 h-8 transition-all duration-300 ${
            view === "profile" ? "left-0" : "right-0"
          }`}
        />
        <span
          className={`absolute left-2 text-xl font-bold transition-colors duration-300 hover:text-purple-900 ${
            view === "profile" ? "underline text-purple-900" : "text-purple-400"
          }`}
        >
          My profile
        </span>
        <span
          className={`absolute p-1 right-2 text-xl font-bold transition-colors duration-300 hover:text-purple-900 ${
            view === "orders"
              ? "underline text-purple-900"
              : "text-purple-400"
          }`}
        >
          My orders
        </span>
      </div>

      {/* Form */}
      <div className="w-full">
        {view === "profile" ? <UserProfile /> : <UserOrdersPage />}
      </div>
    </div>
  );
}