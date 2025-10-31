"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import LogOutBtn from "./LogOutBtn";
import DeleteAccountBtn from "./DeleteAccount";

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
    <div className="max-w-2xl mx-auto xs:p-2 md:p-6">
      <h1 className="text-3xl font-bold text-purple-900 mb-6 xs:text-center md:text-left">My profile</h1>
      {user && (
        <div className="flex flex-row p-4 border rounded shadow">
          <div className="flex flex-col items-center">
            <User className="xs:w-40 xs:h-40 md:w-60 md:h-60 text-purple-400" />
            <DeleteAccountBtn />
          </div>

          <div className="flex flex-col md:mt-5 w-80 xs:text-md md:text-xl">
            <p className="font-semibold text-purple-400">Name:</p>
            <p className="mb-4 w-full">{user.name}</p>
            <p className="font-semibold text-purple-400">Email:</p>
            <p className="mb-4 w-full">{user.email}</p>
            <div className="flex md:mt-4 items-center xs:text-md md:text-xl text-red-600">
              <LogOutBtn className="font-semibold hover:underline" />
              <LogOut className="xs:w-4 xs:h-4 md:w-6 md:h-6 ml-1" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
