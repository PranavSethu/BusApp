import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import './PassengerDetailsForm.css';

const PassengerDetailsDialog = ({ open, onClose, selectedSeats, tripId }) => {
  const [passengers, setPassengers] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setPassengers(selectedSeats.map(seat => ({ seatNo: seat, name: '', age: '' })));
  }, [selectedSeats]);

  const handleChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };

  const handleSubmit = async () => {
    if (!tripId) {
      alert("Trip ID is not provided."); 
      return;
    }
    setLoading(true);
    const apiUrl = `https://busapp-fgg9.onrender.com/api/v1/users/tickets/${tripId}`;
    try {
      const response = await axios.post(apiUrl, { passengers },{ withCredentials: true });
      console.log('Booking successful:', response.data);
      setTotalPrice(response.data.totalPrice);  
      onClose(); 
      alert(`Booking successful! Total price: Rs ${response.data.totalPrice}`);
      navigate('/home');
    } catch (error) {
      console.error('Booking failed:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Booking failed');
      alert('Booking failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className='dialog-container'>
        <DialogTitle>Enter Passenger Details</DialogTitle>
        <DialogContent>
          {passengers.map((passenger, index) => (
            <div key={index}>
              <h2>Passenger {index + 1}</h2>
              <TextField
                label="Name"
                value={passenger.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Age"
                type="number"
                value={passenger.age}
                onChange={(e) => handleChange(index, 'age', e.target.value)}
                fullWidth
                margin="dense"
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions className='dialog-actions'>
          <Button onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading || !passengers.every(p => p.name && p.age)}>Submit</Button>
        </DialogActions>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
    </Dialog>
  );
};

export default PassengerDetailsDialog;
