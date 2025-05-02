const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db.cjs'); // Updated require path

const router = express.Router();
const SALT_ROUNDS = 10; // Cost factor for bcrypt hashing

// --- Registration Route --- POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  // Basic validation
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Email, username, and password are required' });
  }

  try {
    // Check if user already exists (by email or username)
    const existingUser = await db.pool.query(
      `SELECT * FROM users WHERE email = $1 OR username = $2`,
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      // Check which one exists
      const existsByEmail = existingUser.rows.some(user => user.email === email);
      const existsByUsername = existingUser.rows.some(user => user.username === username);
      let message = 'User already exists.';
      if (existsByEmail && existsByUsername) {
        message = 'Email and Username already taken.';
      } else if (existsByEmail) {
        message = 'Email already taken.';
      } else {
        message = 'Username already taken.';
      }
      return res.status(409).json({ message }); // 409 Conflict
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert new user into the database
    // Note: Frontend uses 'name', but DB schema requested 'username'. Sticking to username.
    const newUserResult = await db.pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at`,
      [username, email, passwordHash]
    );
    const newUser = newUserResult.rows[0];

    // Generate JWT
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return user info (without password hash) and token
    res.status(201).json({
      token,
      userName: newUser.username, // Match frontend expectation
      email: newUser.email
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Internal server error during registration' });
  }
});

// --- Login Route --- POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Find user by username
    const userResult = await db.pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' }); // Unauthorized
    }

    const user = userResult.rows[0];

    // Compare provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' }); // Unauthorized
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return user info and token
    res.status(200).json({
      token,
      userName: user.username, // Match frontend expectation
      email: user.email
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error during login' });
  }
});

module.exports = router; 