import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SeatSelection.css'


const SeatSelection = () => {
  const [seats, setSeats] = useState([
    { id: 1, state: 'available' },
    { id: 2, state: 'unavailable' },
    { id: 3, state: 'pending' },
    { id: 4, state: 'available' },
    { id: 5, state: 'unavailable' },
    { id: 6, state: 'available' },
    { id: 7, state: 'pending' },
    { id: 8, state: 'unavailable' },
    { id: 9, state: 'available' },
    { id: 10, state: 'pending' },
    { id: 11, state: 'available' },
    { id: 12, state: 'unavailable' },
    { id: 13, state: 'pending' },
    { id: 14, state: 'available' },
    { id: 15, state: 'unavailable' },
    { id: 16, state: 'pending' },
    { id: 17, state: 'available' },
    { id: 18, state: 'unavailable' }
  ]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate()

  const handleSeatClick = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat.state === 'available' && !selectedSeats.includes(seatId)) {
      setSelectedSeats([...selectedSeats, seatId]);
    } else if (seat.state === 'available' && selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    }
  };
 

  const proceedToPayment = () => {

    navigate('/payment-page')
    console.log('Navigating to payment page...');
  };
  const seatinput = selectedSeats.length

  return (
    <div>
      <h2 className='selection-heading'>Seat Selection</h2>
      <div className="seat-map">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.state} ${
              selectedSeats.includes(seat.id) ? 'selected' : ''
            }`}
            onClick={() => handleSeatClick(seat.id)}
          >
            {seat.id}
          </div>
        ))}
      </div>
      {selectedSeats.length > 0 && (
        <button onClick={proceedToPayment}>
          Proceed to Pay
        </button>
      )}
      
      <p>Selected Seats: {selectedSeats.join(', ')}</p>

    </div>
  );
};

export default SeatSelection;
