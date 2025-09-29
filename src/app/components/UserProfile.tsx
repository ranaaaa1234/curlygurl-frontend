"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import LogOutBtn from "./LogOutBtn";

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
    console.log("Stored user:", storedUser);
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
          <div className="flex flex-col mt-5 w-80 text-xl">
            <p className="font-semibold">Name:</p>
            <p className="p-1 mb-4 w-full">{user.name}</p>
            <p className="font-semibold">Email:</p>
            <p className="p-1 mb-4 w-full">{user.email}</p>
            <div className="mt-4 text-xl text-red-600">
              <LogOutBtn className="font-semibold hover:underline" />
              <LogOut className="inline w-6 h-6 ml-1" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
