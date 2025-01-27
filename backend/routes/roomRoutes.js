const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Create a new room
router.post('/', async (req, res, next) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Room number already exists' });
    }
    next(error);
  }
});

// Get all rooms
router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.find().sort('roomNumber');
    res.json(rooms);
  } catch (error) {
    next(error);
  }
});

// Get a single room
router.get('/:id', async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    next(error);
  }
});

// Update a room
router.put('/:id', async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Room number already exists' });
    }
    next(error);
  }
});

// Delete a room
router.delete('/:id', async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Update room status
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['Available', 'Occupied', 'Maintenance'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    next(error);
  }
});

module.exports = router; 