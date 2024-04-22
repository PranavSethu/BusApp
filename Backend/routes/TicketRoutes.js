const express = require("express");
const { BookingTrip, getTicketById, getAllUserTicket, cancelTicket,getUserTickets,getBookedSeats} = require("../controllers/TicketController");
// const { getUserTickets } = require('../controllers/ticketController');
const {validateToken} = require("../middleware/validateTokenHandler");
const TicketRouter = express.Router();

// TicketRouter.use(validateToken)
// Express Router setup
TicketRouter.post('/tickets/:trip_id', BookingTrip);
TicketRouter.get("/tickets/:id", getTicketById);
TicketRouter.get("/tickets", getAllUserTicket);
TicketRouter.get('/tickets/user/:userId', getUserTickets);
TicketRouter.get("/trips/booked/:tripId", getBookedSeats);
TicketRouter.put("/tickets/:id/cancel", cancelTicket);  // Added ticket_id as a parameter

module.exports = TicketRouter;