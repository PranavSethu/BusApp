const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusSchema = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User" // Correct reference keyword from "rel" to "ref"
        },
        name: {
            type: String,
            required: true
        },
        busNumber: {
            type: String,
            required: true,
            unique: true // Ensures busNumber is unique across all documents
        },
        capacity: {
            type: Number,
            required: true
        },
        seatStructure: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Bus", BusSchema); // Rename variable from BusModel to BusSchema for clarity
