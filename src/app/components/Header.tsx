"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import Tooltip from "./Tooltip";


const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header className="p-10 flex items-center justify-between bg-white shadow">
      <Link href="/">
        <h1 className="text-3xl font-bold text-purple-400 cursor-pointer">
          Curly Gurl
        </h1>
      </Link>

      <Tooltip text="View your cart">
        <button
          aria-label="View cart"
          onClick={() => router.push("/cart")}
          className="text-purple-400 hover:text-purple-700"
        >
          <ShoppingBag className="w-8 h-8" />
        </button>
      </Tooltip>
    </header>
  );
};

export default Header;
