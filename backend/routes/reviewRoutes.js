import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reviewsFilePath = path.join(__dirname, '../data/reviews.json');

const router = express.Router();

// Get all reviews
router.get('/', (req, res) => {
  try {
    const reviewsData = fs.readFileSync(reviewsFilePath, 'utf8');
    const reviews = JSON.parse(reviewsData);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new review
router.post('/', (req, res) => {
  try {
    // Read existing reviews
    const reviewsData = fs.readFileSync(reviewsFilePath, 'utf8');
    const reviews = JSON.parse(reviewsData);
    
    // Create new review
    const newReview = {
      id: (reviews.length + 1).toString(),
      name: req.body.name,
      type: req.body.type,
      rating: req.body.rating,
      comment: req.body.comment,
      createdAt: new Date().toISOString()
    };
    
    // Add new review to array
    reviews.push(newReview);
    
    // Write back to file
    fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2));
    
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 