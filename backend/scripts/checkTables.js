import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Table from '../models/Table.js';

dotenv.config();

const checkTables = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'travel_heaven'
        });
        console.log('Connected to MongoDB successfully');

        // Get all tables
        const tables = await Table.find().sort('tableNumber');
        console.log('\nAll Tables:');
        tables.forEach(table => {
            console.log(`Table ${table.tableNumber}: Capacity ${table.capacity}, Available: ${table.isAvailable}`);
        });

        // Count unavailable tables
        const unavailableCount = tables.filter(table => !table.isAvailable).length;
        console.log(`\nUnavailable Tables: ${unavailableCount}`);

        await mongoose.connection.close();
        console.log('\nDatabase connection closed');
    } catch (error) {
        console.error('Error checking tables:', error);
    }
};

checkTables(); 