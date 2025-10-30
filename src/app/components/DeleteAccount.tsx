"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteAccountBtn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-account`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("storage"));
        router.push("/");
      }
    } catch (err) {
      console.error("Error deleting account:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`${
        loading ? "cursor-not-allowed" : "text-xs hover:underline"
      } text-red-600 transition`}
    >
      {loading ? "Deleting..." : "Delete my account"}
    </button>
  );
};

export default DeleteAccountBtn;
