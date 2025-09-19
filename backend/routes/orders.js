const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth'); // We'll add this
const router = express.Router();

// Create order (use auth middleware)
router.post('/', auth, async (req, res) => {
  try {
    const { items, subtotal, total, name, address, phone, paymentMethod } = req.body;
    const order = new Order({
      userId: req.userId, // From JWT
      items,
      subtotal,
      total,
      name,
      address,
      phone,
      paymentMethod,
    });
    await order.save();
    res.json({ msg: 'Order placed', orderId: order._id });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get user orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;