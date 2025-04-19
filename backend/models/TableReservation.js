import mongoose from 'mongoose';

const tableReservationSchema = new mongoose.Schema({
    reservationTime: {
        type: Date,
        required: true
    },
    partySize: {
        type: Number,
        required: true,
        min: 1
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    specialRequests: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'completed', 'cleared'],
        default: 'active'
    }
}, {
    timestamps: true,
    collection: 'tablereservations'
});

const TableReservation = mongoose.model('TableReservation', tableReservationSchema);

export default TableReservation; 