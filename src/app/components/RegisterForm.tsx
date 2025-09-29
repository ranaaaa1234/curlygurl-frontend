"use client";
import { useState } from "react";
import { OctagonAlert } from "lucide-react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let valid = true;

    if (!name) {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("User registered successfully, you can now log in!");
        setSuccess(true); 
        setName(""); 
        setEmail("");
        setPassword("");
      } else {
        setSuccess(false);
        if (data.message.includes("Email already exists")) {
          setEmailError(data.message);
        } else {
          setMessage(data.message || "Registration failed");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setSuccess(false);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 text-purple-900">Register</h2>

      <label className="block mb-2">
        Name:
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full mb-1 p-2 border rounded ${
            nameError ? "border-red-500" : ""
          }`}
        />
        {nameError && (
          <p className="flex items-center gap-1 text-red-600 text-sm mb-2">
            <OctagonAlert className="w-4 h-4" />
            {nameError}
          </p>
        )}
      </label>

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
          <p className="flex items-center gap-1 text-red-600 text-sm mb-2">
            <OctagonAlert className="w-4 h-4" />
            {emailError}
          </p>
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
          <p className="flex items-center gap-1 text-red-600 text-sm mb-2">
            <OctagonAlert className="w-4 h-4" />
            {passwordError}
          </p>
        )}
      </label>

      {message && (
        <p
          className={`flex items-center gap-1 text-sm mb-2 ${
            success ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <button
        className="w-full bg-purple-400 text-white px-4 py-2 mt-2 rounded-lg shadow hover:bg-purple-900 transition"
        type="submit"
      >
        Register
      </button>
    </form>
  );
}
