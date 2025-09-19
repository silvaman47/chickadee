import { useState, useEffect } from 'react';

export default function Menu({ addToCart, selectDish }) {
  const [dishes, setDishes] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Chicken');
  const [loading, setLoading] = useState(true);
  const categories = ['Chicken', 'Salads', 'Desserts', 'Sides', 'Drinks'];

  useEffect(() => {
    setLoading(true); // Start loading
    fetch('http://localhost:5000/api/dishes')
      .then(res => res.json())
      .then(data => setDishes(data))
      .catch(err => console.error('Fetch error:', err))
      .finally(() => setLoading(false)); // End loading
  }, []);

  const filteredDishes = dishes.filter(dish => dish.category === activeCategory);

  if (loading) return <div className="p-8 text-center"><div className="loading-spinner"></div></div>;

  return (
    <section className="p-8 bg-black">
      <nav className="flex space-x-4 mb-4">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`text-white hover:text-red-600 ${activeCategory === cat ? 'font-bold underline' : ''}`}
          >
            {cat}
          </button>
        ))}
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredDishes.map((dish, i) => (
          <div key={i} className="bg-gray-900 p-4 rounded">
            <img src={dish.img} alt={dish.name} className="w-full h-32 object-cover mb-2" />
            <h3 className="font-bold">{dish.name}</h3>
            <p className="text-red-600">${dish.price.toFixed(2)}</p>
            <div className="flex space-x-2 mt-2">
              <button onClick={() => addToCart(dish)} className="bg-red-800 px-4 py-1 flex-1">Add to Cart</button>
              <button onClick={() => selectDish(dish)} className="bg-blue-800 px-4 py-1 flex-1">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}