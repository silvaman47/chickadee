const mongoose = require('mongoose');
const Dish = require('./models/Dish');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const seedDishes = async () => {
  await Dish.deleteMany({});
  const dishes = [
    { name: 'Crispy Fried Chicken', price: 5.50, description: 'Juicy fried chicken with spices.', ingredients: ['Chicken', 'Flour', 'Spices'], category: 'Chicken', img: '/crispychicken.jpg' },
    { name: 'Chicken Caesar Salad', price: 7.20, description: 'Fresh salad with grilled chicken.', ingredients: ['Chicken', 'Lettuce', 'Parmesan'], category: 'Salads', img: '/chickensalad.jpg' },
    { name: 'BBQ Chicken Wings', price: 6.40,description: 'Sublime Wings Marinated With BBQ Sauce.', ingredients: ['Wings', 'Flour', 'Sauce'], category: 'Chicken', img: '/bbqchicken.jpg', category: 'Chicken' },
    { name: 'Classic Cheesecake', price: 4.30,description: 'Exquisite Slice of Cheese.', ingredients: ['Cheese', 'Flour', 'Cherry'], category: 'Desserts', img: '/cheesecake.jpg', category: 'Desserts' },
    { name: 'Fresh Lemonade', price: 2.10,description: 'Freshly Squeezed Lemon Juice.', ingredients: ['Lime', 'Sugar', 'Lemons'], category: 'Drinks', img: '/lemonade.jpg', category: 'Drinks' },
    { name: 'Roasted Vegetable Mix', price: 3.90, description: 'Finely Tossed Salad.', ingredients: ['Mayonnaise', 'Cabbage', 'Lettuce'], category: 'Sides',img: '/roastedveggies.jpg', category: 'Sides' },
    // Toss in a couple more for balance
    { name: 'Grilled Chicken Breast', price: 8.50, description: 'Chicken Grilled to Perfection.', ingredients: ['Chicken', 'Herbs', 'Spices'], category: 'Chicken', img: '/grilledchickenbreast.jpg', category: 'Chicken' },
    { name: 'Greek Salad', price: 6.00, description: 'Salad From The Greek Gods.', ingredients: ['Cabbage', 'Lettuce', 'Spices'], category: 'Salad', img: '/greeksalad.jpg', category: 'Salads' },
    // Add the rest from your menu
  ];
  await Dish.insertMany(dishes);
  console.log('Seeded');
  process.exit();
};

seedDishes();