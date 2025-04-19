import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the data directory and users file
const dataDir = path.join(__dirname, '..', 'data');
const usersFile = path.join(dataDir, 'users.txt');

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('Created data directory:', dataDir);
}

// Ensure the users file exists
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, '', 'utf8');
  console.log('Created users file:', usersFile);
}

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    console.log('Received registration request with body:', req.body);
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      console.log('Missing required fields:', { name, email, password });
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const users = fs.readFileSync(usersFile, 'utf8');
    if (users.includes(`Email: ${email}`)) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Password hashed successfully');

    // Create user entry
    const userEntry = `
=== New User Registration ===
Time: ${new Date().toLocaleString()}
Name: ${name}
Email: ${email}
Password: ${hashedPassword}
================================
`;

    // Append to file
    fs.appendFileSync(usersFile, userEntry);
    console.log('User data saved to file:', usersFile);

    // Create JWT token
    const token = jwt.sign(
      { name, email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    console.log('JWT token created successfully');

    res.status(201).json({
      token,
      user: { name, email }
    });
    console.log('Registration response sent successfully');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error during registration: ' + error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Read users file
    const users = fs.readFileSync(usersFile, 'utf8');
    const userEntries = users.split('=== New User Registration ===').filter(Boolean);

    // Find user entry
    const userEntry = userEntries.find(entry => entry.includes(`Email: ${email}`));
    if (!userEntry) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Extract hashed password and user details
    const hashedPassword = userEntry.match(/Password: (.*)/)?.[1];
    const name = userEntry.match(/Name: (.*)/)?.[1];

    if (!hashedPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, hashedPassword.trim());
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { name, email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      token,
      user: { name, email, role: 'user' }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login: ' + error.message });
  }
});

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'User routes are working!' });
});

export default router; 