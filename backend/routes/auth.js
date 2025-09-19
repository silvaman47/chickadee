const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put('/me', auth, async (req, res) => {
  try {
    const { email, name } = req.body; // Allow editing email and name for now
    const user = await User.findByIdAndUpdate(req.userId, { email, name }, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json({ msg: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Signup
router.post('/signup', async (req, res) => {
  try {
    console.log('Using JWT_SECRET:', process.env.JWT_SECRET); // Debug
    const { email, password, name } = req.body; // Include name
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User exists' });

    const user = new User({ email, password, name });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email, name } }); // Return name in user data
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;