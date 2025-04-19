import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Leisure Traveler', 'Business Traveler', 'Family Traveler', 'Single Traveler']
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Specify the collection name explicitly
  collection: 'hotel_reviews'
});

const Review = mongoose.model('Review', reviewSchema);

export default Review; 