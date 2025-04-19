import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
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
    }
}, { _id: false });

const tableSchema = new mongoose.Schema({
    tableNumber: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        min: 1,
        max: 12,
        default: 4
    },
    currentReservation: {
        type: reservationSchema,
        default: null
    }
}, {
    timestamps: true,
    collection: 'tables'
});

const Table = mongoose.model('Table', tableSchema);

export default Table; 