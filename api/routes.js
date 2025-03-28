import { Router } from "express";
import nocache from "nocache";
import logger from "./logger.js";
import pool from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { auth } from "./middleware/auth.js";

const router = Router();

router.use(logger());
router.use(nocache());

// Signup route
router.post("/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 400, message: "Email and password are required" });
    }

    // Check if user already exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 400, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, hashedPassword]
    );

    res.status(201).json({
      message: "User created successfully",
      user: result.rows[0]
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 500, message: "Error creating user" });
  }
});

// Signin route
router.post("/auth/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 400, message: "Email and password are required" });
    }

    // Get user
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 401, message: "Invalid credentials" });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 401, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      }
    });
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ error: 500, message: "Error signing in" });
  }
});

// Protected route example
router.get("/me", auth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 500, message: "Error fetching user data" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      message: "Hello, World!",
      timestamp: result.rows[0].now
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ 
      error: 500,
      message: "Database error occurred" 
    });
  }
});

router.use((req, res, next) => {
  res.status(404).json({
    error: 404,
    message: "Not Found",
  });
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 500,
    message: "Internal Server Error",
  });
});

export default router;
