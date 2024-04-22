const express = require("express");
const { BookingTrip, getTicketById, getAllUserTicket, cancelTicket,getUserTickets,getBookedSeats} = require("../controllers/TicketController");
// const { getUserTickets } = require('../controllers/ticketController');
const {verifySession} = require("../middleware/validateTokenHandler");
const TicketRouter = express.Router();

TicketRouter.post('/tickets/:trip_id',verifySession,BookingTrip);
TicketRouter.get("/tickets/:id", getTicketById);
TicketRouter.get("/tickets",verifySession,getAllUserTicket);
TicketRouter.get('/tickets/user/:userId',verifySession,getUserTickets);
TicketRouter.get("/trips/booked/:tripId",verifySession,getBookedSeats);
TicketRouter.put("/tickets/:id/cancel",verifySession,cancelTicket);  

module.exports = TicketRouter;  