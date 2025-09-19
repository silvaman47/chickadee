const express = require('express');
const Dish = require('../models/Dish');
const router = express.Router();

// Get all dishes, optional category filter
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const dishes = await Dish.find(query);
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;