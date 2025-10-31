"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function UserPage() {
  const [view, setView] = useState<"login" | "register">("login");
  const router = useRouter();

  const toggleView = () => {
    setView(view === "login" ? "register" : "login");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div
        onClick={toggleView}
        className="relative w-48 h-10 border rounded cursor-pointer flex items-center"
      >
        <div
          className={`absolute top-1 h-8 transition-all duration-300 ${
            view === "login" ? "left-0" : "right-0"
          }`}
        />
        <span
          className={`absolute left-2 text-xl font-bold transition-colors duration-300 hover:text-purple-900 ${
            view === "login" ? "underline text-purple-900" : "text-purple-200"
          }`}
        >
          Log in
        </span>
        <span
          className={`absolute p-1 right-2 text-xl font-bold transition-colors duration-300 hover:text-purple-900 ${
            view === "register"
              ? "underline text-purple-900"
              : "text-purple-200"
          }`}
        >
          Register
        </span>
      </div>

      {/* Form */}
      <div className="sm:mt-8 mb-8 w-96 p-6 bg-white sm:rounded sm:shadow">
        {view === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
