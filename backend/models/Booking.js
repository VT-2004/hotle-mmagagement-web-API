import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: false
    },
    roomName: {
        type: String,
        required: true
    },
    guestName: {
        type: String,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    numberOfGuests: {
        type: Number,
        default: 1
    },
    specialRequests: {
        type: String,
        default: ''
    },
    checkedOutAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    collection: 'bookings'
});

export default mongoose.model('Booking', bookingSchema); 