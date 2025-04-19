import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Booking from './models/Booking.js';

dotenv.config();

const checkBookings = async () => {
    try {
        console.log('Connecting to MongoDB...');
        console.log('Using URI:', process.env.MONGODB_URI);
        
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'travel_heaven'
        });
        console.log('Connected to MongoDB successfully');

        // Check database info
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('\nCollections in database:');
        collections.forEach(col => console.log('-', col.name));

        // Check bookings collection specifically
        const bookingsCollection = await db.collection('bookings');
        const count = await bookingsCollection.countDocuments();
        console.log('\nTotal documents in bookings collection:', count);

        // Get all bookings with full details
        const bookings = await Booking.find();
        console.log('\nBookings in database:');
        console.log('Total bookings:', bookings.length);
        
        if (bookings.length > 0) {
            console.log('\nAll bookings:');
            bookings.forEach(booking => {
                console.log('\nBooking details:');
                console.log('ID:', booking._id);
                console.log('Room ID:', booking.roomId);
                console.log('Room Name:', booking.roomName);
                console.log('Guest Name:', booking.guestName);
                console.log('Check-in:', booking.checkInDate);
                console.log('Check-out:', booking.checkOutDate);
                console.log('Total Price:', booking.totalPrice);
                console.log('Contact Number:', booking.contactNumber);
                console.log('Email:', booking.email);
                console.log('Number of Guests:', booking.numberOfGuests);
                console.log('Special Requests:', booking.specialRequests);
                console.log('Status:', booking.status);
                console.log('Created at:', booking.createdAt);
                console.log('Updated at:', booking.updatedAt);
            });
        } else {
            console.log('No bookings found in the database');
        }

        // Check for any errors in the collection
        const stats = await db.command({ collStats: 'bookings' });
        console.log('\nCollection statistics:');
        console.log('Size:', stats.size);
        console.log('Count:', stats.count);
        console.log('Storage size:', stats.storageSize);
        console.log('Indexes:', stats.nindexes);

    } catch (error) {
        console.error('Error:', error);
        if (error.code === 'ECONNREFUSED') {
            console.error('Could not connect to MongoDB. Is the server running?');
        }
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
};

checkBookings(); 