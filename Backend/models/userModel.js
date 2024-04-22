const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
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

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  userSchema.methods.generateAccessToken = function () {
    let payload = {
      id: this._id,
    };
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  
    console.log(ACCESS_TOKEN_SECRET, "secret");
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "20m",
    });
  };
  // userSchema.methods.comparePassword = async function (
  // clientPassword,
  // userPassword
  // ) {
  // return await bcrypt.compare(clientPassword, userPassword);
  // };
  
module.exports = mongoose.model("User",userSchema);