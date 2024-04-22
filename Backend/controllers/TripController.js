const TripModel = require("../models/tripModel");

const tripExists = async (busNumber, date) => {
    return await TripModel.findOne({ busNumber, date });
};

const createTrip = async (req, res) => {
    const { busName, busNumber, availableSeats, date, departureTime, arrivalTime, origin, destination, price } = req.body;
    try {
        const existingTrip = await tripExists(busNumber, date);
        if (existingTrip) {
            return res.status(400).json({ message: "Trip already exists bro" });
        }

        const trip = await TripModel.create({ busName, busNumber, availableSeats, date, departureTime, arrivalTime, origin, destination, price });
        return res.status(201).json(trip); 
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllTrips = async (req, res) => {
    try {
        const trips = await TripModel.find({});
        return res.status(200).json(trips);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const searchTrips = async (req, res) => {
    try {
        const { origin, destination, date } = req.query;

        if (!origin || !destination || !date) {
            return res.status(400).json({ message: "All parameters (origin, destination, date) are required." });
        }


        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0); 

        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999); 

        const matchingTrips = await TripModel.find({
            "origin": origin,
            "destination": destination,
            "date": {
                $gte: dayStart,
                $lte: dayEnd
            }
        }); 

        if (matchingTrips.length > 0) {
            res.status(200).json(matchingTrips);
        } else {
            res.status(404).json({ message: 'No Trips found for the provided origin, destination, and date.' });
        }
    } catch (error) {
        console.error('Error searching for trips:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




const getTripsById = async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await TripModel.findById(id);
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTrip, searchTrips, getTripsById, getAllTrips };
