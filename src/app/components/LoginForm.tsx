"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { OctagonAlert } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  

  const validate = () => {
    let valid = true;

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Enter a valid email adress");
      valid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (res.ok) {
        const user = data.user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("storage"));
        router.push("/");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 text-purple-900">Log in</h2>

      <label className="block mb-2">
        Email:
        <input
          placeholder="Your@email.domain"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full mb-1 p-2 border rounded ${
            emailError ? "border-red-500" : ""
          }`}
        />
        {emailError && (
          <p className="flex items-center gap-1 text-red-600 text-sm mb-2"><OctagonAlert className="w-4 h-4" />{emailError}</p>
        )}
      </label>

      <label className="block mb-2">
        Password:
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full mb-1 p-2 border rounded ${
            passwordError ? "border-red-500" : ""
          }`}
        />
        {passwordError && (
          <p className="flex items-center gap-1 text-red-600 text-sm mb-2"><OctagonAlert className="w-4 h-4" />{passwordError}</p>
        )}
      </label>
      {message && (
        <p className="flex items-center gap-1 text-red-600 text-sm mb-2"><OctagonAlert className="w-4 h-4" />{message}</p>
      )}

      <button
        className="w-full bg-purple-400 text-white px-4 py-2 mt-2 rounded-lg shadow hover:bg-purple-900 transition"
        type="submit"
      >
        Log in
      </button>
    </form>
  );
}
