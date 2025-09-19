const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, date, time, partySize } = req.body;
    const booking = new Booking({ name, email, phone, date, time, partySize });
    await booking.save();
    res.json({ msg: 'Table booked', id: booking._id });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;