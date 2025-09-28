"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, LogOut } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
        <div className="max-w-2xl mx-auto p-6">
      {user && (
        <div className="flex flex-col border p-4 rounded-lg bg-purple-50">
          <h2 className="text-2xl font-bold mb-4 text-purple-900">
            My profile
          </h2>

          <div>
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>

          <button
            onClick={() => router.push("/userOrders")}
            className="flex w-full justify-center items-center px-4 py-2 font-semibold text-purple-900 hover:underline"
          >
            Orders
            <Package className="inline w-5 h-5 ml-1" />
          </button>
          <button
            className="flex w-full justify-center items-center px-4 py-2 font-semibold text-red-600 hover:underline"
          >
            Log out
            <LogOut className="inline w-5 h-5 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
