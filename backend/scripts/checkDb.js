import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Table from '../models/Table.js';

dotenv.config();

const checkDatabase = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'travel_heaven'
        });
        console.log('Connected to MongoDB successfully\n');

        // Check tables collection
        const tables = await Table.find();
        console.log('Tables Collection Status:');
        console.log('------------------------');
        console.log(`Total tables in database: ${tables.length}`);
        
        if (tables.length > 0) {
            console.log('\nCurrent Tables:');
            tables.forEach(table => {
                console.log(`Table ${table.tableNumber} - Reserved at: ${table.reservationTime}`);
            });
        } else {
            console.log('\nDatabase is empty - no tables found');
        }

        await mongoose.connection.close();
        console.log('\nDatabase connection closed');
    } catch (error) {
        console.error('Error checking database:', error);
    }
};

checkDatabase(); 