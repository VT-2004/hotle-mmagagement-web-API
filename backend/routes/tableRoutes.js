import express from 'express';
import Table from '../models/Table.js';

const router = express.Router();

// Get all tables
router.get('/', async (req, res) => {
    try {
        const tables = await Table.find();
        res.json(tables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get available tables
router.get('/available', async (req, res) => {
    try {
        const tables = await Table.find({ isAvailable: true });
        res.json(tables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get table by ID
router.get('/:id', async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        res.json(table);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { name, capacity, isAvailable } = req.body;
    const newTable = new Table({
        name,
        capacity,
        isAvailable
    });

    try {
        const savedTable = await newTable.save();
        res.status(201).json(savedTable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
