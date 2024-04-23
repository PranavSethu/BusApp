import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BusSearch.css';


axios.defaults.withCredentials = true;
export default function BusSearch() {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        from: '',
        to: '',
        date: '',
    });
    const [allTrips, setAllTrips] = useState([]);  
    const [searchResults, setSearchResults] = useState([]);  
    const [userTickets, setUserTickets] = useState([]);
    const [showUserTickets, setShowUserTickets] = useState(false);

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const response = await axios.get("https://busapp-fgg9.onrender/api/v1/users/trips/getAll",{ withCredentials: true });
            setAllTrips(response.data);
            setSearchResults(response.data);  
        } catch (error) {
            console.error("Error fetching trips:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const filteredTrips = allTrips.filter(trip => 
            (trip.origin.toLowerCase().includes(searchParams.from.toLowerCase()) || !searchParams.from) &&
            (trip.destination.toLowerCase().includes(searchParams.to.toLowerCase()) || !searchParams.to) &&
            (trip.date.startsWith(searchParams.date) || !searchParams.date)
        );
        setSearchResults(filteredTrips);
    };


    const handleBookSeats = (busDetails) => {
        if (busDetails && busDetails._id) {
            navigate(`/busseatselection/${busDetails._id}`, { state: { busDetails } });
        } else {
            alert("Error: Missing trip ID. Cannot proceed to book seats.");
        }
    };

    const fetchUserTickets = async () => {
        try {
            const response = await axios.get("https://busapp-fgg9.onrender/api/v1/users/tickets",{ withCredentials: true });
            setUserTickets(response.data);
            setShowUserTickets(!showUserTickets); 
        } catch (error) {
            console.error("Failed to fetch user tickets:", error);
            setUserTickets([]);
        }
    };

    const handleCancelTicket = async (ticketId) => {
        try {
            const response = await axios.put(`https://busapp-fgg9.onrender/api/v1/users/tickets/${ticketId}/cancel`,{ withCredentials: true });
            
            if (response.status === 200) {
                const updatedTickets = userTickets.filter(ticket => ticket._id !== ticketId);
                setUserTickets(updatedTickets); 
                alert('Ticket canceled successfully');
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error("Failed to cancel ticket:", error);
            alert('Failed to cancel ticket: ' + (error.response?.data?.message || error.message));
        }
    };
    const handleLogout = async () => {
        try {
            await axios.get("https://busapp-fgg9.onrender/api/v1/users/logout", { withCredentials: true });
            navigate('/');
        } catch (error) {
            console.error("Logout failed:", error);
            alert('Failed to logout: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <>  
             <div className="header-container">
                <button className="user-details-button" onClick={fetchUserTickets}>
                    {showUserTickets ? "Hide User Tickets" : "User Booking History"}
                </button>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
            <div className='search-container'>
                <form className="search-form" onSubmit={handleSubmit}>
                    <div className='from'>
                        <label htmlFor="from" id='from-label'>From</label>
                        <input className="from-input" name="from" placeholder="Enter the Origin" value={searchParams.from} onChange={handleChange} />
                    </div>
                    <br />
                    <div className='to'>
                        <label htmlFor="to" id='to-label'>To</label>
                        <input className="to-input" name="to" placeholder="Enter the Destination" value={searchParams.to} onChange={handleChange} />
                    </div>
                    <div className='date'>
                        <label htmlFor="date" id='date-label'>Date</label>
                        <input className="date-input" name="date" type="date" value={searchParams.date} onChange={handleChange} />
                    </div>
                    <button className="button" type="submit">Search</button>
                </form>
            </div>

            <div className='results-container'>
                {showUserTickets ? (
                    <div className="user-tickets">
                        <h2>User Booking history</h2>
                        {userTickets.length > 0 ? userTickets.map(ticket => (
                            <div key={ticket._id} className="ticket-details">
                                {/* <p>Trip ID: {ticket.trip_id}</p> */}
                                <p>Bus Number: {ticket.busNumber}</p>
                                <p>Booking Date: {new Date(ticket.bookingDate).toLocaleDateString()}</p>
                                <p>Departure: {ticket.departureTime} - Arrival: {ticket.arrivalTime}</p>
                                <p>From: {ticket.origin} To: {ticket.destination}</p>
                                <p>Total Price: Rs {ticket.totalPrice.toFixed(2)}</p>
                                <button onClick={() => handleCancelTicket(ticket._id)} className="delete-ticket-button">Cancel Ticket</button>
                            </div>
                        )) : <p>No tickets found.</p>}
                    </div>
                ) : (
                    <div className="search-results">
                        {searchResults.length > 0 ? searchResults.map((result, index) => (
                            <div key={index} className="result-item">
                                <p>Bus Name: {result.busName}</p>
                                <p>Available Seats: {result.availableSeats}</p>
                                <p>From: {result.origin} To: {result.destination} on {result.date}</p>
                                <p>Price: Rs {result.price.toFixed(2)}</p>
                                <p>Departure: {result.departureTime} - Arrival: {result.arrivalTime}</p>
                                <button onClick={() => handleBookSeats(result)}>Book Seats</button>
                            </div>
                        )) : <p>No buses available for your search criteria.</p>}
                    </div>
                )}
            </div>
        </>
    );
}
