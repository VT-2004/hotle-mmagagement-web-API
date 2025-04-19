import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the data directory and messages file
const dataDir = path.join(__dirname, '..', 'data');
const contactFile = path.join(dataDir, 'contacts.txt');

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('Created data directory:', dataDir);
}

// Ensure the messages file exists
if (!fs.existsSync(contactFile)) {
  fs.writeFileSync(contactFile, '', 'utf8');
  console.log('Created contact messages file:', contactFile);
}

const router = express.Router();

// Simple route to store contact form data
router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Create a simple text entry
  const entry = `
=== New Contact Form Submission ===
Time: ${new Date().toLocaleString()}
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
================================
`;
  
  // Append to file
  fs.appendFileSync(contactFile, entry);
  
  res.status(200).json({ message: 'Contact form submitted successfully' });
});

export default router; 