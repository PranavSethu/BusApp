import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Seat from './Seat';
import PassengerDetailsDialog from './PassengerDetailsDialog';
import './BusSeatSelection.css';

const BusSeatSelection = () => {
  const { tripId } = useParams();
  const totalSeats = 20; // This can be dynamic if needed.
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true); // Set to true initially
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookedSeats();
  }, []);

  const fetchBookedSeats = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/users/trips/booked/${tripId}`);
      if (response.data.bookedSeats) {
        setBookedSeats(response.data.bookedSeats);
      } else {
        console.error('No booked seats data:', response.data);
        setError('Failed to load booked seats: No data');
      }
    } catch (error) {
      console.error('Error fetching booked seats:', error);
      setError('Failed to load booked seats: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSeatSelection = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return; // Prevent selecting booked seats
    setSelectedSeats(prev => 
      prev.includes(seatNumber) 
        ? prev.filter(seat => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleOpenDialog = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat to book.');
      return;
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPassengers([]); // Reset passengers when dialog is closed
  };

  const handleBookSeats = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:4000/api/v1/users/tickets/${tripId}`, { passengers });
      alert('Booking successful!');
      fetchBookedSeats(); // Refresh booked seats after booking
      setSelectedSeats([]); // Clear selections
      setPassengers([]); // Clear passenger info
    } catch (error) {
      console.error('Booking failed:', error);
      setError('Booking failed! ' + error.message);
      alert('Booking failed!');
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="bus-layout">
        {Array.from({ length: totalSeats }, (_, index) => (
          <Seat
            key={index + 1}
            seatNumber={index + 1}
            isSelected={selectedSeats.includes(index + 1)}
            isBooked={bookedSeats.includes(index + 1)}
            onToggle={() => toggleSeatSelection(index + 1)}
          />
        ))}
      </div>
      <button onClick={handleOpenDialog} className="book-seats-button" disabled={selectedSeats.length === 0}>
        Book Seats
      </button>
      <PassengerDetailsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        selectedSeats={selectedSeats}
        tripId={tripId}
        setPassengers={setPassengers}
      />
    </div>
  );
};

export default BusSeatSelection;



