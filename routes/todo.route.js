const express = require("express");
const { createTodo , getUserTodo , getTodos , updateTodo} = require("../controllers/todo.controller")
const { authMiddleware } = require("../middleware/authMiddleware");
const route = express.Router();


route.post("/create", authMiddleware ,createTodo);
route.get("/todos", authMiddleware ,getTodos);
route.put("/update/:id", authMiddleware , updateTodo);






module.exports = route;