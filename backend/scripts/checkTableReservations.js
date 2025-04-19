import 'dotenv/config';
import mongoose from 'mongoose';
import TableReservation from '../models/TableReservation.js';

async function checkTableReservations() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all table reservations
    const reservations = await TableReservation.find()
      .populate('table')
      .sort({ createdAt: -1 });

    console.log('\nCurrent Table Reservations:');
    console.log(JSON.stringify(reservations, null, 2));

    // Get collection stats
    const stats = await mongoose.connection.db.collection('tablereservations').stats();
    console.log('\nCollection Stats:');
    console.log(`Total documents: ${stats.count}`);
    console.log(`Total size: ${stats.size} bytes`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

checkTableReservations(); 