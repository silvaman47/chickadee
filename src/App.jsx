import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import DishDetail from './components/DishDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import Booking from './components/Booking';
import OrderHistory from './components/OrderHistory';
import Profile from './components/Profile';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); // Load token on mount

 useEffect(() => {
    console.log('Token updated in App:', token); // Debug token state
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: decoded.userId, email: decoded.email || 'User' });
    }
  }, [token]);

  const addToCart = (item) => {
    const existing = cartItems.find(i => i.name === item.name);
    if (existing) {
      updateQuantity(item, 1);
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
  };

  const updateQuantity = (item, delta) => {
    setCartItems(cartItems.map(i => 
      i.name === item.name ? { ...i, qty: Math.max(1, i.qty + delta) } : i
    ));
  };

  const removeItem = (item) => {
    if (item.name === 'all') {
      setCartItems([]);
    } else {
      setCartItems(cartItems.filter(i => i.name !== item.name));
    }
  };

  const openLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const openSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const openBooking = () => {
    setShowLogin(false);
    setShowSignup(false);
    setShowBooking(true);
  };

  const selectDish = (dish) => {
    setSelectedDish(dish);
  };

const handleLogin = (token, userData) => {
  console.log('Login token received in App:', token);
  localStorage.setItem('token', token);
  setToken(token);
  setUser(userData); // Use passed userData directly
  setShowLogin(false);
};

const handleSignup = (token, userData) => {
  console.log('Signup token received in App:', token);
  localStorage.setItem('token', token);
  setToken(token);
  setUser(userData);
  setShowSignup(false);
};

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header openLogin={openLogin} user={user} logout={logout} />
      <div id="home"><Hero openBooking={openBooking} /></div>
      <div id="menu"><Menu addToCart={addToCart} selectDish={selectDish} /></div>
      <div id="profile"><Profile token={token} /></div>
      <DishDetail dish={selectedDish} addToCart={addToCart} />
      <Cart items={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} token={token} />
      <OrderHistory token={token} />
      {showLogin && <Login onClose={() => setShowLogin(false)} onSwitchToSignup={openSignup} onLogin={handleLogin} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} onSwitchToLogin={openLogin} onSignup={handleSignup} />}
      {showBooking && <Booking onClose={() => setShowBooking(false)} />}
      <div id="about">
        <section className="p-8">
          <h2 className="text-2xl mb-4">About Us</h2>
          <p>We serve fresh, healthy chicken meals with quality ingredients. Started in 2020, we're all about flavor without the guilt.</p>
        </section>
      </div>
      <div id="contact">
  <section className="p-8 bg-gray-900">
    <h2 className="text-2xl mb-4">Contact</h2>
    <p>Email: info@healthychicken.com</p>
    <p>Phone: (123) 456-7890</p>
    <form 
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = {
          name: e.target.elements['contact-name'].value,
          email: e.target.elements['contact-email'].value,
          message: e.target.elements['contact-message'].value,
        };
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          alert('Contact submitted successfully!');
          e.target.reset();
        } else {
          console.error('Contact error:', data.msg);
        }
      }} 
      className="space-y-4 mt-4"
    >
      <input type="text" name="contact-name" placeholder="Name" className="bg-gray-800 p-2 w-full" required />
      <input type="email" name="contact-email" placeholder="Email" className="bg-gray-800 p-2 w-full" required />
      <textarea name="contact-message" placeholder="Message" className="bg-gray-800 p-2 w-full h-24" required></textarea>
      <button type="submit" className="bg-red-800 px-4 py-2">Send</button>
    </form>
  </section>
  
</div>

    </div>
    
  );
}

export default App;