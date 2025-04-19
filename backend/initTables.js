import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Table from './models/Table.js';

dotenv.config();

const initializeTables = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Clear existing tables
        await Table.deleteMany({});
        console.log('Cleared existing tables');

        // Create initial tables
        const tables = [
            {
                tableNumber: 'T1',
                capacity: 2,
                location: 'Indoor',
                isAvailable: true
            },
            {
                tableNumber: 'T2',
                capacity: 4,
                location: 'Indoor',
                isAvailable: true
            },
            {
                tableNumber: 'T3',
                capacity: 6,
                location: 'Outdoor',
                isAvailable: true
            },
            {
                tableNumber: 'T4',
                capacity: 8,
                location: 'Private',
                isAvailable: true
            },
            {
                tableNumber: 'T5',
                capacity: 2,
                location: 'Outdoor',
                isAvailable: true
            }
        ];

        await Table.insertMany(tables);
        console.log('Initialized tables successfully');

        // Log the created tables
        const createdTables = await Table.find();
        console.log('Created tables:', createdTables);

        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error initializing tables:', error);
        process.exit(1);
    }
};

initializeTables(); 