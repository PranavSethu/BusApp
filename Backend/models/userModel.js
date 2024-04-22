const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please add the user name"],
    },
    email: {
        type: String,
        required: [true,"Please add the email"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"Please add the password"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
})
module.exports = mongoose.model("User",userSchema);