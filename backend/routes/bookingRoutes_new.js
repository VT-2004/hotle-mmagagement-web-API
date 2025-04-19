import express from 'express';
import Booking from '../models/Booking.js';
import Room from '../models/Room.js';

const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
    try {
        console.log('Received booking request:', req.body);
        
        const room = await Room.findById(req.body.roomId);
        console.log('Found room:', room);
        
        if (!room) {
            console.log('Room not found for ID:', req.body.roomId);
            return res.status(404).json({ message: 'Room not found' });
        }
        if (!room.isAvailable) {
            console.log('Room is not available:', req.body.roomId);
            return res.status(400).json({ message: 'Room is not available' });
        }

        const booking = new Booking(req.body);
        console.log('Created booking object:', booking);
        
        const newBooking = await booking.save();
        console.log('Saved booking:', newBooking);

        // Update room availability
        room.isAvailable = false;
        await room.save();
        console.log('Updated room availability');

        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: 'Validation error', 
                details: Object.values(error.errors).map(err => err.message)
            });
        }
        res.status(400).json({ message: error.message });
    }
});

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('roomId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Check room availability - MUST be before /:id route
router.get('/check-availability', async (req, res) => {
    try {
        const { checkIn, checkOut, roomType } = req.query;
        
        if (!checkIn || !checkOut || !roomType) {
            return res.status(400).json({ 
                message: 'Missing required parameters',
                details: ['checkIn', 'checkOut', 'roomType']
            });
        }

        // Find a room of the specified type
        const room = await Room.findOne({ type: roomType, isAvailable: true });
        
        if (!room) {
            return res.json({ available: false, message: 'No rooms of this type are available' });
        }

        // Check if there are any overlapping bookings
        const overlappingBooking = await Booking.findOne({
            roomId: room._id,
            status: 'active',
            $or: [
                {
                    checkInDate: { $lte: new Date(checkOut) },
                    checkOutDate: { $gte: new Date(checkIn) }
                }
            ]
        });

        if (overlappingBooking) {
            return res.json({ 
                available: false, 
                message: 'Room is already booked for these dates' 
            });
        }

        res.json({ 
            available: true, 
            message: 'Room is available for these dates',
            roomId: room._id
        });
    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('roomId');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Check out (complete booking)
router.patch('/:id/checkout', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = 'completed';
        await booking.save();

        // Update room availability
        const room = await Room.findById(booking.roomId);
        room.isAvailable = true;
        await room.save();

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 