const express = require('express');
const AdminRouter = express.Router();

const { createBuses, getAllBuses } = require("../controllers/BusController");
const { createTrip, getAllTrips } = require("../controllers/TripController");
const {validateToken} = require("../middleware/validateTokenHandler");

// AdminRouter.use(validateToken)
AdminRouter.post("/bus", createBuses);
AdminRouter.get("/bus", getAllBuses);
AdminRouter.post("/trips", createTrip);
AdminRouter.get("/trips", getAllTrips);

module.exports = AdminRouter;
