"use client";
import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  message = "Are you sure?",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-100 text-center">
        <p className="mb-4 font-medium">{message}</p>
        <div className="flex justify-center gap-2">
          <button
            onClick={onConfirm}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-800 transition"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="mt-4 bg-purple-400 text-white px-4 py-2 rounded shadow hover:bg-purple-900 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
