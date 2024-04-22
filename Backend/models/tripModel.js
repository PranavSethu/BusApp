const mongoose  = require("mongoose");

const tripSchema = new mongoose.Schema({
    busName:{
        type:String,
        required : true,
    },
    busNumber : {
        type : String,
        required : true,
    },
    availableSeats : {
        type : Number,
        required:true,
    },
    bookedSeats :[{
        type : Number,
    }],
    date :{
        type : Date,
        required : true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Trip",tripSchema);