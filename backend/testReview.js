import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Review from './models/Review.js';

dotenv.config();

const testSaveReview = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'travel_heaven'
    });
    console.log('Connected to MongoDB');

    // Create a new review
    const review = new Review({
      name: 'Test User',
      type: 'Leisure Traveler',
      rating: 5,
      comment: 'This is a test review'
    });

    // Save the review
    const savedReview = await review.save();
    console.log('Review saved successfully:', savedReview);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
};

testSaveReview(); 