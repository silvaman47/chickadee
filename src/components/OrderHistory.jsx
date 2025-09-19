import { useState, useEffect } from 'react';

export default function OrderHistory({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch('http://localhost:5000/api/orders', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        } else {
          console.error('Failed to fetch orders:', data.msg);
        }
      } catch (err) {
        console.error('Order fetch error:', err);
      } finally {
        setLoading(false); // End loading
      }
    };

    if (token) fetchOrders();
  }, [token]);

  if (loading) return <div className="p-8 text-center"><div className="loading-spinner"></div></div>;
  if (!orders.length) return <p className="p-8">No orders yet.</p>;

  return (
    <section className="p-8 bg-black">
      <h2 className="text-2xl mb-4">Order History</h2>
      {orders.map((order, i) => (
        <div key={i} className="bg-gray-900 p-4 mb-4 rounded">
          <p>Order ID: {order._id}</p>
          <p>Total: ${order.total}</p>
          <p>Status: {order.status}</p>
          <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <h3 className="mt-2">Items:</h3>
          <ul>
            {order.items.map((item, j) => (
              <li key={j}>{item.name} x{item.qty} (${item.price})</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}