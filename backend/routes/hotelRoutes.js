const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const validateHotel = require('../middleware/validateHotel');

// Create a new hotel
router.post('/', validateHotel, async (req, res, next) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    next(error);
  }
});

// Get all hotels
router.get('/', async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    next(error);
  }
});

// Get a single hotel
router.get('/:id', async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    next(error);
  }
});

// Update a hotel
router.put('/:id', validateHotel, async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    next(error);
  }
});

// Delete a hotel
router.delete('/:id', async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 