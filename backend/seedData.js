const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Room = require('./models/Room');

dotenv.config();

const sampleRooms = [
  {
    roomNumber: '101',
    type: 'Single',
    price: 99.99,
    capacity: 1,
    amenities: ['TV', 'WiFi', 'Air Conditioning'],
    status: 'Available',
    description: 'Cozy single room with city view'
  },
  {
    roomNumber: '102',
    type: 'Double',
    price: 149.99,
    capacity: 2,
    amenities: ['TV', 'WiFi', 'Air Conditioning', 'Mini Bar'],
    status: 'Available',
    description: 'Comfortable double room with garden view'
  },
  {
    roomNumber: '201',
    type: 'Suite',
    price: 299.99,
    capacity: 4,
    amenities: ['TV', 'WiFi', 'Air Conditioning', 'Mini Bar', 'Jacuzzi', 'Kitchen'],
    status: 'Available',
    description: 'Luxurious suite with panoramic view'
  },
  {
    roomNumber: '301',
    type: 'Deluxe',
    price: 399.99,
    capacity: 3,
    amenities: ['TV', 'WiFi', 'Air Conditioning', 'Mini Bar', 'Balcony', 'Room Service'],
    status: 'Available',
    description: 'Deluxe room with premium amenities'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Room.deleteMany({});
    console.log('Cleared existing rooms');

    // Insert sample data
    const rooms = await Room.insertMany(sampleRooms);
    console.log('Added sample rooms:', rooms);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 