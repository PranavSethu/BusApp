const express = require('express')

const BusRouter = express.Router();
// const {validateToken} = require("../middleware/validateTokenHandler");

// BusRouter.use(validateToken)
// const{getAllBuses} = require("../controllers/BusController");
const{getAllBuses} = require("../controllers/BusController");

// BusRouter.post("/bus",createBuses);
BusRouter.get("/bus",getAllBuses);

// BusRouter.get("/bus",getAllBuses);


module.exports = BusRouter;
