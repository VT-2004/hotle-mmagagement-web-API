import mongoose from 'mongoose';
import Room from '../models/Room.js';
import dotenv from 'dotenv';

dotenv.config();

const roomTypes = [
    { type: 'Deluxe', price: 6249, prefix: 'D' },
    { type: 'Suite', price: 6999, prefix: 'S' },
    { type: 'Double', price: 7499, prefix: 'DB' },
    { type: 'Single', price: 4999, prefix: 'SG' }
];

async function seedRooms() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing rooms
        await Room.deleteMany({});
        console.log('Cleared existing rooms');

        // Create 10 rooms of each type
        for (const roomType of roomTypes) {
            for (let i = 1; i <= 10; i++) {
                const roomNumber = `${roomType.prefix}${i.toString().padStart(2, '0')}`;
                const room = new Room({
                    roomNumber,
                    type: roomType.type,
                    price: roomType.price,
                    amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar'],
                    description: `Comfortable ${roomType.type} room with modern amenities`,
                    images: [`/images/${roomType.type.toLowerCase()}-room.jpg`]
                });
                await room.save();
                console.log(`Created room ${roomNumber}: ${roomType.type} - ₹${roomType.price}`);
            }
        }

        console.log('\nRoom seeding completed!');
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
    }
}

seedRooms(); 