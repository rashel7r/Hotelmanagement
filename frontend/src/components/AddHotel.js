import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Rating,
  FormControlLabel,
  Switch,
  Box,
} from '@mui/material';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

function AddHotel() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    rating: 1,
    rooms: '',
    price: '',
    amenities: '',
    available: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const handleAvailableChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      available: event.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hotelData = {
        ...formData,
        rooms: parseInt(formData.rooms),
        price: parseFloat(formData.price),
        amenities: formData.amenities.split(',').map((item) => item.trim()),
      };

      await axios.post(`${API_URL}/hotels`, hotelData);
      navigate('/');
    } catch (error) {
      console.error('Error adding hotel:', error);
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New Hotel
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Hotel Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={handleRatingChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              label="Number of Rooms"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              label="Price per Night"
              name="price"
              value={formData.price}
              onChange={handleChange}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Amenities (comma-separated)"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              helperText="Enter amenities separated by commas"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.available}
                  onChange={handleAvailableChange}
                  name="available"
                  color="primary"
                />
              }
              label="Available"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Hotel
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{ ml: 2 }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default AddHotel; 