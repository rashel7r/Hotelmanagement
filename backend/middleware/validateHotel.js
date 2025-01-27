const validateHotel = (req, res, next) => {
  const { name, address, rating, rooms, price } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('Hotel name is required');
  }

  if (!address || address.trim().length === 0) {
    errors.push('Hotel address is required');
  }

  if (rating && (rating < 1 || rating > 5)) {
    errors.push('Rating must be between 1 and 5');
  }

  if (!rooms || rooms < 1) {
    errors.push('Number of rooms must be at least 1');
  }

  if (!price || price < 0) {
    errors.push('Price must be a positive number');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation Error', errors });
  }

  next();
};

module.exports = validateHotel; 