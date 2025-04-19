import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Table from '../models/Table.js';

dotenv.config();

const seedTables = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'travel_heaven'
        });
        console.log('Connected to MongoDB successfully');

        // Clear existing tables
        await Table.deleteMany({});
        console.log('Cleared existing tables');

        // Create 20 tables with varying capacities
        const tables = [];
        for (let i = 1; i <= 20; i++) {
            // Assign capacities: 2, 4, 6, or 8 people
            const capacity = [2, 4, 6, 8][Math.floor((i - 1) % 4)];
            tables.push({
                tableNumber: `T${i}`,
                capacity: capacity,
                currentReservation: null
            });
        }

        await Table.insertMany(tables);
        console.log('Created 20 tables successfully');

        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding tables:', error);
    }
};

seedTables(); 