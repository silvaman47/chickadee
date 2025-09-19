const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.json({ msg: 'Contact submitted', id: contact._id });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;