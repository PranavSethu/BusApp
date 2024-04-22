const express = require("express");

const UserRouter = express.Router();
const {CurrentUser} = require("../controllers/UserController")


UserRouter.get("/current",CurrentUser);

module.exports = UserRouter;


