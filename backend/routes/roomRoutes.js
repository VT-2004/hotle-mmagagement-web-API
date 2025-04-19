import express from 'express';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// Get all rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get available rooms
router.get('/available', async (req, res) => {
    try {
        const { checkIn, checkOut } = req.query;
        
        if (!checkIn || !checkOut) {
            return res.status(400).json({ 
                message: 'Missing required parameters',
                details: ['checkIn', 'checkOut']
            });
        }

        // Get all rooms
        const rooms = await Room.find();
        
        // Filter rooms based on booking availability
        const availableRooms = [];
        for (const room of rooms) {
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

            if (!overlappingBooking) {
                availableRooms.push(room);
            }
        }

        res.json(availableRooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get room by type
router.get('/type/:type', async (req, res) => {
    try {
        const room = await Room.findOne({ type: req.params.type });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get room by ID
router.get('/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update room availability
router.patch('/:id/availability', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        
        room.isAvailable = req.body.isAvailable;
        const updatedRoom = await room.save();
        res.json(updatedRoom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 