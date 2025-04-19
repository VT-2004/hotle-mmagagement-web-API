import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Table from '../models/Table.js';

dotenv.config();

const deleteTables = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'travel_heaven'
        });
        console.log('Connected to MongoDB successfully');

        // Delete all tables
        const result = await Table.deleteMany({});
        console.log(`Deleted ${result.deletedCount} tables`);

        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error deleting tables:', error);
    }
};

deleteTables(); 