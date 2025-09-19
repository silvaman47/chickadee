import { useState } from 'react';

export default function Login({ onClose, onSwitchToSignup, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        onLogin(data.token, data.user);
      } else {
        console.error(data.msg);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="float-right text-white">X</button>
        <h2 className="text-2xl mb-4">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" className="bg-red-800 p-3 w-full rounded text-white">Log In</button>
        </form>
        <p className="text-center text-sm mt-4">
          No account? <a href="#" onClick={onSwitchToSignup} className="text-blue-400">Sign Up</a>
        </p>
      </div>
    </div>
  );
}