"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

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
      <h1 className="text-3xl font-bold text-purple-900 mb-6">My profile</h1>
      {user && (
        <div className="flex flex-row p-4 border rounded shadow">
          <div>
            <User className="w-60 h-60 text-purple-400" />
          </div>
          <div className="flex flex-col mt-5 w-80 items-center justify-center text-xl text-purple-900">
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <button className="flex justify-center items-center mx-auto mt-20 font-semibold text-red-600 hover:underline">
              Log out
              <LogOut className="inline w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
