import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Button,
  Box,
  Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../utils/axios';

// Import room type images
import Room1 from '../images/Room1.jpg';
import Room2 from '../images/Room2.jpg';
import Room3 from '../images/Room3.jpg';
import Room4 from '../images/Room4.jpg';
import Room5 from '../images/Room5.jpg';

const roomImages = {
  'Single': Room1,
  'Double': Room2,
  'Suite': Room3,
  'Deluxe': Room4
};

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axiosInstance.get('/rooms');
      setRooms(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      console.error('Error fetching rooms:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await axiosInstance.delete(`/rooms/${id}`);
        fetchRooms();
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        console.error('Error deleting room:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'success';
      case 'Occupied':
        return 'error';
      case 'Maintenance':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getRoomDescription = (room) => {
    if (room.description) return room.description;

    const descriptions = {
      'Single': 'Cozy single room perfect for solo travelers. Features modern amenities and a comfortable workspace. Enjoy our signature comfort with a view.',
      'Double': 'Spacious double room ideal for couples or business travelers. Includes a seating area and premium amenities. Experience luxury and comfort.',
      'Suite': 'Luxurious suite with separate living area, perfect for families or extended stays. Enjoy panoramic views and exclusive amenities. The ultimate in comfort.',
      'Deluxe': 'Premium deluxe room offering the ultimate comfort with high-end furnishings and spectacular city views. Experience the height of luxury.'
    };

    return descriptions[room.type] || `Experience comfort and luxury in our ${room.type.toLowerCase()} room, featuring modern amenities and elegant design.`;
  };

  const getRandomImage = () => {
    const images = [Room1, Room2, Room3, Room4, Room5];
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
          MoonLight Hotel Rooms
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/add')}
        >
          Add Room
        </Button>
      </Box>
      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room._id}>
            <Card elevation={3} sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }}>
              <CardMedia
                component="img"
                height="250"
                image={roomImages[room.type] || getRandomImage()}
                alt={room.type}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Room {room.roomNumber}
                  </Typography>
                  <Chip
                    label={room.status}
                    color={getStatusColor(room.status)}
                    size="small"
                  />
                </Box>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {room.type} Room - {room.capacity} Person(s)
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                  ${room.price} per night
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {getRoomDescription(room)}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
                  {room.amenities.map((amenity, index) => (
                    <Chip
                      key={index}
                      label={amenity}
                      size="small"
                      variant="outlined"
                      sx={{ margin: '2px' }}
                    />
                  ))}
                </Stack>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', padding: 2 }}>
                <IconButton 
                  onClick={() => handleEdit(room._id)} 
                  color="primary" 
                  size="small"
                  sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  onClick={() => handleDelete(room._id)} 
                  color="error" 
                  size="small"
                  sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default RoomList; 