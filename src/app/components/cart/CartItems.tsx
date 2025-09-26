"use client";

import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";
import { FrownIcon, Plus, Minus, X } from "lucide-react";

const CartItems = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  const handleOrder = async () => {
    const res = await fetch("http://localhost:4000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });

    if (res.ok) {
      clearCart();
      router.push("/confirmation");
    } else {
      alert("Order failed");
    }
  };


  return (
    <section className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-900">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="bg-purple-100 p-6 rounded-lg text-center">
          <div className="flex justify-center items-center gap-2 mb-3">
            <FrownIcon className="w-6 h-6 text-red-600" />
            <p className="text-red-600 font-semibold">
              Oh no, your cart is empty
            </p>
          </div>
          <button
            className="font-bold underline text-purple-900 hover:text-purple-700"
            onClick={() => router.push("/")}
          >
            Go shopping
          </button>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
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
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex border rounded">
                    <button className="px-2 py-1 text-purple-600 hover:bg-purple-100"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button className="px-2 py-1 text-purple-600 hover:bg-purple-100"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                </div>
              </li>
            ))}
          </ul>

          {/* Total */}
          <div className="mt-6 text-right">
            <p className="text-xl font-semibold text-purple-900">
              Total: {total} kr
            </p>
            <button
              onClick={handleOrder}
              className="mt-4 bg-purple-900 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700 transition"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default CartItems;
