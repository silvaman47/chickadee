export default function DishDetail({ dish, addToCart }) {
  if (!dish) {
    return (
      <section className="p-8 bg-black">
        <h2 className="text-2xl mb-4">Dish Detail</h2>
        <p>Select a dish from the menu to see details.</p>
      </section>
    );
  }

  return (
    <section className="p-8 bg-black">
      <h2 className="text-2xl mb-4">Dish Detail</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <img src={dish.img} alt={dish.name} className="w-full md:w-1/2 h-64 object-cover rounded" />
        <div className="w-full md:w-1/2">
          <h3 className="text-3xl font-bold mb-2">{dish.name}</h3>
          <p className="mb-4">{dish.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {dish.ingredients.map((ing, i) => (
              <span key={i} className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm">{ing}</span>
            ))}
          </div>
          <p className="text-red-600 text-2xl mb-4">${dish.price.toFixed(2)}</p>
          <button onClick={() => addToCart(dish)} className="bg-red-800 px-6 py-2 rounded">Add to Cart</button>
        </div>
      </div>
    </section>
  );
}