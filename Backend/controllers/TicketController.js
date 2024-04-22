const TicketModel = require('../models/ticketModel');
const userModel = require("../models/userModel"); 
const TripModel = require("../models/tripModel");
const {validationTokenHandler} = require("../middleware/validateTokenHandler")

const BookingTrip = async (req, res) => {
    const { passengers } = req.body;
    const { trip_id } = req.params;

    try {
        const trip = await TripModel.findById(trip_id);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        const user_id = '66250f95e959f1a45cb33c5a';
        const busNumber = trip.busNumber;
        const bookingDate = new Date();
        const numberOfSeats = passengers.length;
        const date = trip.date;
        const departureTime = trip.departureTime;
        const arrivalTime = trip.arrivalTime;
        const origin = trip.origin;
        const destination = trip.destination;
        const totalPrice = passengers.length * trip.price;

        const seatNumbers = passengers.map(passenger => passenger.seatNo);
        const SeatsBooked = await TripModel.findOne({ _id: trip_id, bookedSeats: { $in: seatNumbers } });
        if (SeatsBooked) {
            return res.status(400).json({ message: 'Seat already booked' });
        }
        const newTicket = await TicketModel.create({
            user_id,
            trip_id,
            busNumber,
            bookingDate,
            passengers,
            numberOfSeats,
            date,
            departureTime,
            arrivalTime,
            origin,
            destination,
            totalPrice,
        });

        const updatedTrip = await TripModel.findOneAndUpdate(
            { _id: trip_id },
            { $inc: { availableSeats: -numberOfSeats }, $push: { bookedSeats: { $each: seatNumbers } } },
            { new: true }
        );

        if (!updatedTrip) {
            return res.status(500).json({ message: 'Cannot update trip' });
        }

        res.status(200).json(newTicket);
    } catch (error) {
        console.error('Error booking the trip:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const getUserTickets = async (req, res) => {
    const { userId } = req.params;

    try {
        const tickets = await TicketModel.find({ user_id: userId });

        if (!tickets.length) {
            return res.status(404).json({ message: "No tickets found for this user." });
        }

        res.json(tickets);
    } catch (error) {
        console.error('Failed to retrieve tickets:', error);
        res.status(500).json({
            message: "Internal server error while retrieving tickets.",
            error: error.message  
        });
    }
};





const getTicketById = async (req,res) =>{
    const{id} = req.params
    try{
        const ticket = await TicketModel.findById({id})
        if(ticket){
            return res.status(200).json(ticket);
        }
        else{
            return res.status(404).json({message:"Ticket are not Found"})
        }
    }catch(e){
        console.error(e.message);
        res.status(500).json({message:"Invalid Ticket ID"});
    }
};

const getAllUserTicket = async (req, res) => {
    try {
        const user_id = "66250f95e959f1a45cb33c5a"; 

        console.log("User ID:", user_id);
        const tickets = await TicketModel.find({ user_id: user_id, isBooked: true });

        if (tickets.length === 0) {
            return res.status(404).json({ message: "No active tickets found" });
        } else {
            return res.status(200).json(tickets);
        }
    } catch (error) {
        console.error("Error fetching tickets:", error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};




const mongoose = require('mongoose');

const cancelTicket = async (req, res) => {
    const { id } = req.params;
    
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Ticket ID format" });
    }

    try {
        const ticket = await TicketModel.findById(id);

        if (!ticket) {
            return res.status(404).json({ message: "Ticket Not Found" });
        }

        if (!ticket.isBooked) {
            return res.status(400).json({ message: "Ticket Already Canceled" });
        }

        const seatNumbers = ticket.passengers.map(passenger => passenger.seatNo);
        const update = async (trip_id, numberOfSeats, seatNumbers) => {
            return TripModel.findOneAndUpdate(
                { _id: trip_id },
                { $inc: { availableSeats: numberOfSeats }, $pullAll: { bookedSeats: seatNumbers } },
                { new: true }
            );
        };

        const trip = await update(ticket.trip_id, seatNumbers.length, seatNumbers);

        if (!trip) {
            return res.status(404).json({ message: "Trip Not Found" });
        }

        ticket.isBooked = false;
        await ticket.save();
        return res.status(200).json({
            message: "Ticket canceled successfully",
            ticket
        });
    } catch (error) {
        console.error('Error canceling the ticket:', error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const getBookedSeats = async (req, res) => {
    const { tripId } = req.params;
    try {
        const trip = await TripModel.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        return res.status(200).json({ bookedSeats: trip.bookedSeats });
    } catch (error) {
        console.error('Failed to retrieve booked seats:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = {BookingTrip,getTicketById,getAllUserTicket,cancelTicket,getUserTickets,getBookedSeats}