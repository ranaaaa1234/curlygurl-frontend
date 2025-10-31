"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, FrownIcon } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const fetchOrders = () => {
    const token = localStorage.getItem("token")?.trim();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!token) return;

    fetch(`${API_URL}/user-orders`, {
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
    <div className="max-w-2xl mx-auto xs:p-2 md:p-6">
      <h1 className="text-3xl font-bold text-purple-900 mb-6 xs:text-center md:text-left">My orders</h1>

      {orders.length === 0 ? (
         <div className="flex flex-col border p-4 rounded text-center bg-purple-50">
          <div className="flex justify-center items-center gap-2 mb-3">
            <FrownIcon className="w-6 h-6 text-red-600" />
            <p className="text-red-600 font-semibold">
              You have no orders yet
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
        orders.map((order) => (
          <div
            key={order.id}
            className="mb-6 p-4 border rounded shadow bg-white hover:border-purple-900"
          >
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Order was placed:</strong> {order.date}
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
