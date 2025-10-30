"use client";

import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";
import { FrownIcon, Plus, Minus, X, ArrowLeft } from "lucide-react";
import ConfirmModal from "../deleteModal/DeleteConfirmModal";
import { useState } from "react";

const CartItems = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const router = useRouter();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    itemId: string | null;
  }>({
    isOpen: false,
    itemId: null,
  });

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleOrder = async () => {
    if (!API_URL) return alert("API URL not set");

    const token = localStorage.getItem("token")?.trim();
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      console.log("Backend response:", data);

      if (res.ok) {
        clearCart();
        router.push("/confirmation");
      } else {
        alert("Order failed");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Order failed");
    }
  };

  const openModal = (id: string) => setModalState({ isOpen: true, itemId: id });
  const closeModal = () => setModalState({ isOpen: false, itemId: null });

  const confirmDelete = () => {
    if (modalState.itemId) removeFromCart(modalState.itemId);
    closeModal();
  };

  const updateQuantityConfirm = (id: string, quantity: number) => {
    if (quantity <= 0) {
      openModal(id);
    } else {
      updateQuantity(id, quantity);
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-3 text-purple-900">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="flex flex-col border p-4 rounded text-center bg-purple-50">
          <div className="flex justify-center items-center gap-2 mb-3">
            <FrownIcon className="w-6 h-6 text-red-600" />
            <p className="text-red-600 font-semibold">
              Oh no, your cart is empty
            </p>
          </div>
          <button
            className="flex flex-row gap-1 items-center justify-center font-bold text-purple-400 hover:text-purple-900"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="w-5 h-5" />
            Go shopping
          </button>
        </div>
      ) : (
        <>
          <button
            className="flex flex-row gap-1 items-center font-bold text-purple-400 hover:text-purple-900 mb-3"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="w-5 h-5" />
            Continue shopping
          </button>

          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border rounded p-4 bg-white shadow-sm hover:border-purple-900"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`${API_URL}${item.image}`}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-bold text-purple-900">{item.name}</p>
                    <p className="font-semibold text-sm text-gray-500">
                      {item.size}
                    </p>
                    <p className="font-bold text-sm text-purple-400">
                      {item.price} kr
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() => openModal(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex border rounded">
                    <button
                      className="px-2 py-1 text-purple-600 hover:bg-purple-100"
                      onClick={() =>
                        updateQuantityConfirm(item.id, item.quantity - 1)
                      }
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="flex w-8 justify-center items-center">
                      {item.quantity}
                    </span>
                    <button
                      className="px-2 py-1 text-purple-600 hover:bg-purple-100"
                      onClick={() =>
                        updateQuantityConfirm(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <ConfirmModal
            isOpen={modalState.isOpen}
            onConfirm={confirmDelete}
            onCancel={closeModal}
            message="Are you sure you want to remove this item?"
          />

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold text-purple-400">
              Total: {total} kr
            </p>

            {/*          <form className="p-4 text-start border shadow rounded mt-4">
              <label className="flex flex-col mb-3">
                Email:
                <input type="email" className="border p-2 rounded" />
              </label>

              <div className="flex gap-4">
                <label className="flex flex-col mb-3 w-full">
                  First name:
                  <input type="text" className="border p-2 rounded" />
                </label>
                <label className="flex flex-col mb-3 w-full">
                  Last name:
                  <input type="text" className="border p-2 rounded" />
                </label>
              </div>

              <label className="flex flex-col mb-3">
                Adress:
                <input type="text" className="border p-2 rounded" />
              </label>

              <div className="flex gap-4">
                <label className="flex flex-col mb-3 w-full">
                  Postal code:
                  <input type="text" className="border p-2 rounded" />
                </label>
                <label className="flex flex-col mb-3 w-full">
                  City:
                  <input type="text" className="border p-2 rounded" />
                </label>
              </div>
              <button
                onClick={handleOrder}
                className="w-full mt-4 bg-purple-400 text-white px-4 py-2 border rounded shadow hover:bg-purple-900 transition"
              >
                Place order
              </button>
            </form> */}
            <button
              onClick={handleOrder}
              className="mt-4 bg-purple-400 text-white px-4 py-2 border rounded shadow hover:bg-purple-900 transition"
            >
              Place order
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default CartItems;
