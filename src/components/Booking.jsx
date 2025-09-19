import { useState } from 'react';

export default function Booking({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      alert('Table booked successfully!');
      onClose();
    } else {
      console.error('Booking error:', data.msg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="float-right text-white">X</button>
        <h2 className="text-2xl mb-4">Book a Table</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            className="bg-gray-800 p-3 w-full rounded text-white placeholder-gray-400"
            required
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            className="bg-gray-800 p-3 w-full rounded text-white placeholder-gray-400"
            required
          />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Phone"
            className="bg-gray-800 p-3 w-full rounded text-white placeholder-gray-400"
            required
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="bg-gray-800 p-3 w-full rounded text-white"
            required
          />
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="bg-gray-800 p-3 w-full rounded text-white"
            required
          />
          <input
            type="number"
            value={formData.partySize}
            onChange={(e) => setFormData({ ...formData, partySize: parseInt(e.target.value) || 1 })}
            min="1"
            className="bg-gray-800 p-3 w-full rounded text-white"
            required
          />
          <button type="submit" className="bg-red-800 p-3 w-full rounded text-white">Book Table</button>
        </form>
      </div>
    </div>
  );
}