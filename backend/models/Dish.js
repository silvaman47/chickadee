const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  ingredients: [String],
  category: { type: String, required: true },
  img: { type: String, required: true }, // URL or path
}, { timestamps: true });

module.exports = mongoose.model('Dish', dishSchema);