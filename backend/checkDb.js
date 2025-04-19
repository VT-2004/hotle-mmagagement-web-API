import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TableReservation from './models/TableReservation.js';

dotenv.config();

const checkDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'travel_heaven'
    });
    console.log('Connected to MongoDB successfully');
    
    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in database:', collections.map(c => c.name));
    
    // Check table reservations
    const tableReservations = await TableReservation.find().populate('tableId');
    console.log('Number of table reservations:', tableReservations.length);
    console.log('Table Reservations:', JSON.stringify(tableReservations, null, 2));
    
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error checking database:', error);
  }
};

checkDatabase(); 