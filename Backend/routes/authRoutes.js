const express = require("express");
const { loginUser, registerUser, logoutUser } = require("../controllers/auth");
const { Validate } = require("../middleware/validate");
const { verifySession } = require("../middleware/validateTokenHandler");
const { userValidationSchema } = require("../schema/registerSchema");

const AuthRouter = express.Router();

AuthRouter.post("/register", userValidationSchema, Validate, registerUser);
AuthRouter.post("/login", loginUser); 

AuthRouter.get("/logout", verifySession, logoutUser);

module.exports = { AuthRouter };
