const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Tweak for prod
app.use(express.json());

// DB Connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB connection error:', err));

// Routes
// ... existing imports and middleware ...

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dishes', require('./routes/dishes'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/contact', require('./routes/contact')); // Add this
app.use('/api/bookings', require('./routes/bookings')); // Add this

// ... rest of the file ...

// Seed some dishes if needed – run once
// const seedDishes = require('./seed'); seedDishes();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));