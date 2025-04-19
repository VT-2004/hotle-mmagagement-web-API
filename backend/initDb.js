import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Room from './models/Room.js';

dotenv.config();

const sampleRooms = [
    {
        roomNumber: '101',
        type: 'Single',
        price: 1000,
        isAvailable: true,
        amenities: ['WiFi', 'TV', 'Air Conditioning'],
        description: 'Comfortable single room with modern amenities',
        images: ['single-room-1.jpg']
    },
    {
        roomNumber: '102',
        type: 'Double',
        price: 2000,
        isAvailable: true,
        amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar'],
        description: 'Spacious double room perfect for couples',
        images: ['double-room-1.jpg']
    },
    {
        roomNumber: '201',
        type: 'Suite',
        price: 3000,
        isAvailable: true,
        amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Living Room'],
        description: 'Luxury suite with separate living area',
        images: ['suite-1.jpg']
    },
    {
        roomNumber: '202',
        type: 'Deluxe',
        price: 2500,
        isAvailable: true,
        amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Ocean View'],
        description: 'Deluxe room with ocean view',
        images: ['deluxe-room-1.jpg']
    }
];

async function initializeDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB Atlas');

        // Clear existing rooms
        await Room.deleteMany({});
        console.log('Cleared existing rooms');

        // Insert sample rooms
        await Room.insertMany(sampleRooms);
        console.log('Sample rooms inserted successfully');

        console.log('Database initialization completed');
        process.exit(0);
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

initializeDb(); 