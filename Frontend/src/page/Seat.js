const Seat = ({ seatNumber, isSelected, isBooked, onToggle }) => {
  return (
    <button
      className={`seat ${isSelected ? "selected" : ""} ${isBooked ? "booked" : ""}`}
      onClick={onToggle}
      disabled={isBooked}
      style={{
        backgroundColor: isBooked ? '#FF6347' : isSelected ? '#4CAF50' : '#ccc'
      }}
    >
      {seatNumber}
    </button>
  );
};
export default Seat;
