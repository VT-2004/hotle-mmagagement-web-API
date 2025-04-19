import express from 'express';
import TableReservation from '../models/TableReservation.js';

const router = express.Router();

// Create a new table reservation
router.post('/', async (req, res) => {
    try {
        console.log('Received table reservation request:', req.body);
        
        const { 
            reservationTime, 
            partySize, 
            customerName, 
            customerEmail, 
            customerPhone, 
            specialRequests 
        } = req.body;

        // Validate required fields
        if (!reservationTime || !partySize || !customerName || !customerEmail || !customerPhone) {
            console.log('Missing required fields:', { reservationTime, partySize, customerName, customerEmail, customerPhone });
            return res.status(400).json({ 
                message: 'Missing required fields',
                details: ['reservationTime', 'partySize', 'customerName', 'customerEmail', 'customerPhone']
            });
        }

        // Check for overlapping reservations
        const reservationDate = new Date(reservationTime);
        const reservationEnd = new Date(reservationTime);
        reservationEnd.setHours(reservationEnd.getHours() + 2); // 2-hour reservation window

        console.log('Checking for overlapping reservations:', {
            start: reservationDate,
            end: reservationEnd
        });

        const overlappingReservation = await TableReservation.findOne({
            status: 'active',
            reservationTime: {
                $lt: reservationEnd,
                $gt: reservationDate
            }
        });

        if (overlappingReservation) {
            console.log('Found overlapping reservation:', overlappingReservation);
            return res.status(400).json({ 
                message: 'Selected time slot is not available' 
            });
        }

        // Create reservation
        const reservation = new TableReservation({
            reservationTime: reservationTime,
            partySize: partySize,
            customerName: customerName,
            customerEmail: customerEmail,
            customerPhone: customerPhone,
            specialRequests: specialRequests || ''
        });
        
        console.log('Saving new reservation:', reservation);
        await reservation.save();
        console.log('Reservation saved successfully');
        
        res.status(201).json(reservation);
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ 
            message: 'Error creating table reservation',
            error: error.message 
        });
    }
});

// Get all current reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await TableReservation.find({ status: 'active' })
            .sort({ reservationTime: 1 });
        res.json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ message: 'Error fetching reservations' });
    }
});

// Cancel a reservation
router.post('/:id/cancel', async (req, res) => {
    try {
        const reservation = await TableReservation.findById(req.params.id);
        
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        if (reservation.status !== 'active') {
            return res.status(400).json({ message: 'Reservation is not active' });
        }

        // Update the reservation status to cleared (instead of just cancelled)
        reservation.status = 'cleared';
        await reservation.save();
        
        res.json({ message: 'Reservation cancelled and cleared successfully' });
    } catch (error) {
        console.error('Error cancelling reservation:', error);
        res.status(500).json({ message: 'Error cancelling reservation' });
    }
});

// Update reservation status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['active', 'cancelled', 'completed', 'cleared'].includes(status)) {
            return res.status(400).json({ 
                message: 'Invalid status. Must be one of: active, cancelled, completed, cleared' 
            });
        }

        const reservation = await TableReservation.findById(req.params.id);
        
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        reservation.status = status;
        await reservation.save();
        
        res.json(reservation);
    } catch (error) {
        console.error('Error updating reservation status:', error);
        res.status(500).json({ 
            message: 'Error updating reservation status',
            error: error.message 
        });
    }
});

export default router; 