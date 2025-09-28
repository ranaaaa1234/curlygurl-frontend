"use client";
import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    console.log("Backend response:", data);
    setMessage(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 text-purple-900">Register</h2>
      Name:
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      Email:
      <input
        placeholder="Your@email.domain"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      Password:
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        className="w-full bg-purple-400 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-900 transition"
        type="submit"
      >
        Register
      </button>
      <p>{message}</p>
    </form>
  );
}
