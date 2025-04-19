import express from 'express';
import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import Payment from '../models/Payment.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Create a new booking
router.post('/', authenticateToken, async (req, res) => {
    try {
        const booking = new Booking({
            roomId: req.body.roomId,
            roomName: req.body.roomName,
            guestName: req.body.guestName,
            checkInDate: new Date(req.body.checkInDate),
            checkOutDate: new Date(req.body.checkOutDate),
            totalPrice: req.body.totalPrice,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            numberOfGuests: req.body.numberOfGuests,
            specialRequests: req.body.specialRequests || '',
            status: 'active'
        });
        
        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all bookings
router.get('/', authenticateToken, async (req, res) => {
    try {
        console.log('Fetching all bookings');
        const bookings = await Booking.find().sort({ createdAt: -1 });
        console.log('Found bookings:', bookings.length);
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get current bookings
router.get('/current', authenticateToken, async (req, res) => {
    try {
        const bookings = await Booking.find({ status: 'active' }).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Check room availability - MUST be before /:id route
router.post('/check-availability', authenticateToken, async (req, res) => {
    try {
        const { checkIn, checkOut, roomType } = req.body;
        
        console.log('=== Availability Check Request ===');
        console.log('Parameters:', { checkIn, checkOut, roomType });
        
        if (!checkIn || !checkOut || !roomType) {
            console.log('Missing parameters:', { checkIn, checkOut, roomType });
            return res.status(400).json({ 
                message: 'Missing required parameters',
                details: ['checkIn', 'checkOut', 'roomType']
            });
        }

        // Map frontend room types to backend room types
        const roomTypeMap = {
            'Deluxe Ocean View': 'Deluxe',
            'Executive Cityscape Room': 'Suite',
            'Family Garden Retreat': 'Double',
            'Single Room': 'Single',
            'Deluxe': 'Deluxe',
            'Suite': 'Suite',
            'Double': 'Double',
            'Single': 'Single',
            'Deluxe Room': 'Deluxe',
            'Executive Suite': 'Suite',
            'Family Room': 'Double'
        };

        const mappedRoomType = roomTypeMap[roomType] || roomType;
        console.log('Room type mapping:', { original: roomType, mapped: mappedRoomType });

        // Find all rooms of the specified type
        const rooms = await Room.find({ type: mappedRoomType });
        console.log('Found rooms:', rooms.length);
        rooms.forEach(room => {
            console.log(`- Room ${room.roomNumber}: Type=${room.type}, Price=${room.price}`);
        });
        
        if (!rooms.length) {
            console.log('No rooms found for type:', mappedRoomType);
            return res.json({ available: false, message: 'No rooms of this type exist' });
        }

        // Check each room for availability
        const conflictingBookings = await Booking.find({
            status: 'active',
            $or: [
                {
                    checkIn: { $lte: new Date(checkOut) },
                    checkOut: { $gte: new Date(checkIn) }
                }
            ]
        });

        const occupiedRooms = conflictingBookings.map(booking => booking.roomNumber);

        res.json({
            available: occupiedRooms.length === 0,
            occupiedRooms
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

// Process payment and checkout
router.post('/:id/checkout', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { cardNumber, cardName, expiryMonth, expiryYear } = req.body;

        // Find the booking
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.status === 'checked-out') {
            return res.status(400).json({ message: 'Booking already checked out' });
        }

        // Create payment record
        const payment = new Payment({
            bookingId: booking._id,
            amount: booking.totalAmount,
            cardNumber: cardNumber.slice(-4), // Store only last 4 digits
            cardName,
            expiryMonth,
            expiryYear,
            status: 'completed'
        });

        await payment.save();

        // Update booking status
        booking.status = 'checked-out';
        booking.checkedOutAt = new Date();
        await booking.save();

        res.json({
            booking,
            payment: {
                id: payment._id,
                amount: payment.amount,
                status: payment.status
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { router as default }; 