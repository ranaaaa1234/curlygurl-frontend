"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (res.ok) {
        // Decode token or get user info from backend response
        const user = data.user;
        console.log("Saving user:", user);
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
          className="w-full mb-4 p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Password:
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>
      <button
        className="w-full bg-purple-400 text-white px-4 py-2 mt-2 rounded-lg shadow hover:bg-purple-900 transition"
        type="submit"
      >
        Log in
      </button>

      {message && <p className="mt-3 text-center text-sm">{message}</p>}
    </form>
  );
}
