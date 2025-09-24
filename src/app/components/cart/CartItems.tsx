"use client";

import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";
import { FrownIcon } from "lucide-react";

const CartItems = () => {
  const { cart, removeFromCart, clearCart } = useCart();
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
    <section className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">Your cart</h2>
      {cart.length === 0 ? (
        <div>
          <div className="flex flex-row gap-1 items-center">
            <p className="text-red-600">Your cart is empty</p>
            <FrownIcon className="w-5 h-5 text-red-600" />
          </div>
          <button
            className="font-bold underline text-purple-400 hover:text-purple-900"
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
                className="flex border justify-between items-center"
              >
                <div className="flex flex-row">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded mb-2"
                  />

                  <div className="flex flex-col">
                    <p className="font-semibold">{item.name}</p>
                    <p>{item.size}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="text-xl font-semibold">Total: {total} kr</p>
            <button
              onClick={handleOrder}
              className="mt-4 bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-600"
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
