const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, university } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    university
  });

  if (user) {
    req.session.user = {
      id: user._id,
      email: user.email
    };
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    req.session.user = {
      id: user._id,
      email: user.email
    };
    res.json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  if (!req.session.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }

  const user = await User.findById(req.session.user.id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  res.json(user);
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500);
      throw new Error('Logout failed');
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser
};