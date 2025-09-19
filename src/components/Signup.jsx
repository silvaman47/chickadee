import { useState } from 'react';

export default function Signup({ onClose, onSwitchToLogin, onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Add name state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }), // Include name
      });
      const data = await response.json();
      console.log('Signup response:', data); // Debug
      if (response.ok) {
        onSignup(data.token, data.user); // Pass user with name
      } else {
        console.error('Signup failed:', data.msg);
      }
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full">
        <button onClick={onClose} className="float-right text-white">X</button>
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="bg-gray-800 p-3 w-full rounded text-white placeholder-gray-400"
            required
          />
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address" 
            className="bg-gray-800 p-3 w-full rounded text-white placeholder-gray-400" 
            required
          />
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
            className="bg-gray-800 p-3 w-full rounded text-white placeholder-gray-400" 
            required
          />
          <button type="submit" className="bg-red-800 p-3 w-full rounded text-white">Sign Up</button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account? <a href="#" onClick={onSwitchToLogin} className="text-blue-400">Log In</a>
        </p>
      </div>
    </div>
  );
}