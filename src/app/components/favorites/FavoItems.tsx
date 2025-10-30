"use client";

import { useFavo } from "./FavoContext";
import { useRouter } from "next/navigation";
import { X, ArrowLeft, ShoppingCart, HeartOff } from "lucide-react";
import ConfirmModal from "../deleteModal/DeleteConfirmModal";
import { useState } from "react";
import Tooltip from "../Tooltip";

const FavoItems = () => {
  const { favo, removeFromFavo, clearFavo } = useFavo();
  const router = useRouter();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    itemId: string | null;
  }>({
    isOpen: false,
    itemId: null,
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const openModal = (id: string) => setModalState({ isOpen: true, itemId: id });
  const closeModal = () => setModalState({ isOpen: false, itemId: null });

  const confirmDelete = () => {
    if (modalState.itemId) removeFromFavo(modalState.itemId);
    closeModal();
  };

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-3 text-purple-900">Your Cart</h2>

      {favo.length === 0 ? (
        <div className="flex flex-col border p-4 rounded-lg text-center bg-purple-50">
          <div className="flex justify-center items-center gap-2 mb-3">
            <HeartOff className="w-6 h-6 text-red-600" />
            <p className="text-red-600 font-semibold">
              You have no favorite items yet
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
            Explore more products
          </button>

          <ul className="space-y-4">
            {favo.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-sm hover:border-purple-900"
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

                    <button className="px-2 py-1 underline font-semibold text-purple-400 hover:text-purple-900 flex items-center gap-1">
                        Add to cart</button>
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
        </>
      )}
    </section>
  );
};

export default FavoItems;
