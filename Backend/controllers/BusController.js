
const BusModel = require("../models/BusModel");

const createBuses = async(req, res) =>{
    const {name,busNumber,capacity,seatStructure } = req.body;
    try {
        const bus = await BusModel.create({ name,busNumber,capacity, seatStructure });
        res.status(200).json({ bus });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




const getAllBuses = async (req, res) => {
    try {
        const buses = await BusModel.find({});
        res.status(200).json({ buses });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching buses from the database' });
    }
};

module.exports = {createBuses,getAllBuses};


