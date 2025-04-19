import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import tableReservationRoutes from './routes/tableReservationRoutes.js';
import tableRoutes from './routes/tableRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'travel_heaven' // Specify the database name
        });
        console.log('MongoDB Atlas connected successfully');
        console.log('Database:', conn.connection.db.databaseName);
    } catch (err) {
        console.error('MongoDB connection error: ', err);
        process.exit(1);
    }
};

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/table-reservations', tableReservationRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/react-app/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/react-app/build', 'index.html'));
  });
}

// Test route to check if the server is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Test route for user registration
app.post('/api/users/test-register', (req, res) => {
  console.log('Test registration route hit with body:', req.body);
  res.status(201).json({ 
    message: 'Test registration successful',
    receivedData: req.body
  });
});

// Test route to directly save a review
app.post('/api/test-review', async (req, res) => {
  try {
    const Review = (await import('./models/Review.js')).default;
    const review = new Review({
      name: 'Test User',
      type: 'Leisure Traveler',
      rating: 5,
      comment: 'This is a test review'
    });
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Travel Heaven Hotel Booking API' });
});

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 