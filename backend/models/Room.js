import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Single', 'Double', 'Suite', 'Deluxe']
    },
    price: {
        type: Number,
        required: true
    },
    amenities: [{
        type: String
    }],
    description: String,
    images: [{
        type: String
    }]
}, {
    timestamps: true,
    collection: 'rooms'
});

export default mongoose.model('Room', roomSchema); 