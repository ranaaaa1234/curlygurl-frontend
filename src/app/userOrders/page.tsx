"use client";
import { use, useEffect, useState } from "react";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  total: number;
  date: string;
  items: OrderItem[];
}

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = () => {
    const token = localStorage.getItem("token")?.trim();
    if (!token) return;

    fetch("http://localhost:4000/user-orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-purple-900 mb-6">My orders</h1>

      {orders.length === 0 ? (
        <p>You have no orders</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="mb-6 p-4 border rounded shadow bg-white hover:border-purple-900"
          >
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Date:</strong> {order.date}
            </p>

            <table className="w-full border-collapse border border-gray-300 mt-2">
              <thead>
                <tr className="bg-purple-100">
                  <th className="border p-2">Product</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item: any, i: number) => (
                  <tr key={i}>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">{item.price} kr</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-2 text-right font-bold text-purple-400">
              Total: {order.total} kr
            </p>
          </div>
        ))
      )}
    </div>
  );
}
