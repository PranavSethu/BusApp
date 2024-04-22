const express = require('express')

const TripRouter = express.Router();

const {searchTrips,getAllTrips,getTripsById} = require("../controllers/TripController")
const {validateToken} = require("../middleware/validateTokenHandler");


// TripRouter.use(validateToken)
TripRouter.get("/trips/getAll",getAllTrips);
TripRouter.get("/trips",searchTrips);
TripRouter.get("/trips/:id",getTripsById);


module.exports = TripRouter;
