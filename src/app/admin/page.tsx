"use client";

import React, { useEffect, useState } from "react";

interface OrderItem {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  total: number;
  created_at: string;
  items: OrderItem[];
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/admin/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>
      {orders.map(order => (
        <div key={order.id} className="border p-4 mb-4 rounded shadow">
          <h2 className="font-bold">Order #{order.id}</h2>
          <p>Date: {new Date(order.created_at).toLocaleString()}</p>
          <p>Total: {order.total} kr</p>
          <ul className="mt-2">
            {order.items.map(item => (
              <li key={item.product_id}>
                {item.name} x {item.quantity} - {item.price} kr
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
