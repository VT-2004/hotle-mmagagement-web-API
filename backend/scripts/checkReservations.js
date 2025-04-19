import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TableReservation from '../models/TableReservation.js';

dotenv.config();

const checkReservations = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'travel_heaven'
        });

        const reservations = await TableReservation.find().populate('tableId');
        console.log('Current reservations:', JSON.stringify(reservations, null, 2));
        process.exit(0);
    } catch (error) {
        console.error('Error checking reservations:', error);
        process.exit(1);
    }
};

checkReservations(); 