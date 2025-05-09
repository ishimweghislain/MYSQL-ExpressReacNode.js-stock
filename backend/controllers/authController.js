const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');

exports.register = [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('email').isEmail().withMessage('Invalid email'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password, email } = req.body;
    try {
      const existingUser = await User.findByUsername(username);
      if (existingUser) return res.status(400).json({ message: 'Username already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const userid = await User.create({ username, password: hashedPassword, email });
      res.status(201).json({ message: 'User registered', userid });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },
];

exports.login = [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;
    try {
      const user = await User.findByUsername(username);
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ userid: user.userid }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },
];