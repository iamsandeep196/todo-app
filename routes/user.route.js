const express = require("express");
const route = express.Router();
const { registerUser , loginUser , logoutUser , forgotPassword , resetPassword } = require("../controllers/user.controller");


route.post("/register" , registerUser);
route.post("/login", loginUser);
route.post("/logout", logoutUser);
route.post("/forgot-password", forgotPassword);
route.post("/reset-password/:token", resetPassword);

module.exports = route;