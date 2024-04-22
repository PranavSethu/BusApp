const express = require("express");

const UserRouter = express.Router();
const {registerUser}= require("../controllers/UserController")
const {loginUser} = require("../controllers/UserController");
// const {validateToken} = require("../middleware/validateTokenHandler");
const {CurrentUser} = require("../controllers/UserController")


UserRouter.post("/register",registerUser);
UserRouter.post("/login",loginUser);

UserRouter.get("/current",CurrentUser);

module.exports = UserRouter;