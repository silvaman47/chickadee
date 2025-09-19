import { useState } from 'react';

export default function Cart({ items, updateQuantity, removeItem, token }) {
  console.log('Cart received token:', token);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('credit-card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // New state for errors
  const subtotal = items.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const delivery = 2.00;
  const total = subtotal + delivery;

  const handleOrder = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    console.log('Form submitted', e.target.elements['full-name'].value);
    const orderDetails = {
      items: items.map(item => ({ name: item.name, qty: item.qty, price: item.price })),
      subtotal: subtotal.toFixed(2),
      delivery: delivery.toFixed(2),
      total: total.toFixed(2),
      name: e.target.elements['full-name'].value,
      address: e.target.elements['address'].value,
      phone: e.target.elements['phone'].value,
      paymentMethod: selectedPayment,
    };

    setLoading(true);
    try {
      console.log('Token before fetch:', token);
      const authHeader = `Bearer ${token}`;
      console.log('Authorization header:', authHeader);
      console.log('Sending order:', orderDetails);

      const paymentSuccess = await new Promise(resolve => {
        setTimeout(() => resolve(Math.random() > 0.1), 1000); // 10% failure rate
      });

      if (!paymentSuccess) {
        throw new Error(`Payment failed with ${selectedPayment}`);
      }

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': authHeader },
        body: JSON.stringify(orderDetails),
      });
      const data = await response.json();
      console.log('Order response:', data);
      if (response.ok && window.confirm(`Confirm your order with ${selectedPayment}?`)) {
        setOrderId(data.orderId);
        setShowConfirmation(true);
        removeItem({ name: 'all' });
      }
    } catch (err) {
      console.error('Order error:', err);
      setError(err.message); // Set error message
    } finally {
      setLoading(false);
    }
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setOrderId(null);
  };

  const selectPayment = (method) => {
    setSelectedPayment(method);
  };

  const retryOrder = () => {
    setError(null); // Clear error to retry
    handleOrder(new Event('submit')); // Trigger handleOrder again
  };

  return (
    <section className="p-8 bg-black">
      <h2 className="text-2xl mb-4">Your Cart</h2>
      {items.map((item, i) => (
        <div key={i} className="flex justify-between items-center mb-2 bg-gray-900 p-2 rounded">
          <img src={item.img} alt={item.name} className="w-12 h-12 mr-2" />
          <span>{item.name}</span>
          <div className="flex items-center">
            <button onClick={() => updateQuantity(item, -1)} className="bg-red-800 px-2">-</button>
            <span className="mx-2">{item.qty || 1}</span>
            <button onClick={() => updateQuantity(item, 1)} className="bg-red-800 px-2">+</button>
          </div>
          <span>${(item.price * (item.qty || 1)).toFixed(2)}</span>
          <button onClick={() => removeItem(item)} className="text-red-600 ml-4">Remove</button>
        </div>
      ))}
      <div className="mt-4">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Delivery: ${delivery.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
      <form onSubmit={handleOrder} className="mt-4 space-y-2">
        <input type="text" name="full-name" placeholder="Full Name" className="bg-gray-800 p-2 w-full text-white" required />
        <input type="text" name="address" placeholder="Address" className="bg-gray-800 p-2 w-full text-white" required />
        <input type="tel" name="phone" placeholder="Phone" className="bg-gray-800 p-2 w-full text-white" required />
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => selectPayment('credit-card')}
            className={`bg-blue-600 px-4 py-2 ${selectedPayment === 'credit-card' ? 'ring-2 ring-white' : ''}`}
          >
            Credit Card
          </button>
          <button
            type="button"
            onClick={() => selectPayment('apple-pay')}
            className={`bg-blue-600 px-4 py-2 ${selectedPayment === 'apple-pay' ? 'ring-2 ring-white' : ''}`}
          >
            Apple Pay
          </button>
          <button
            type="button"
            onClick={() => selectPayment('google-pay')}
            className={`bg-blue-600 px-4 py-2 ${selectedPayment === 'google-pay' ? 'ring-2 ring-white' : ''}`}
          >
            Google Pay
          </button>
        </div>
        <button type="submit" disabled={loading} className="bg-red-800 px-4 py-2 w-full mt-2 rounded">
          {loading ? <div className="loading-spinner inline-block"></div> : 'Place Order'}
        </button>
        {error && (
          <div className="text-red-600 mt-2">
            {error}
            <button onClick={retryOrder} className="bg-gray-600 ml-2 px-2 py-1 rounded">Retry</button>
          </div>
        )}
      </form>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeConfirmation}>
          <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl mb-4">Order Confirmed!</h2>
            <p>Your order ID is: {orderId}</p>
            <p>Thank you. Your order will be delivered soon via {selectedPayment}.</p>
            <button onClick={closeConfirmation} className="bg-red-800 px-4 py-2 mt-4 rounded">Close</button>
          </div>
        </div>
      )}
    </section>
  );
}