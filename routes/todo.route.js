const express = require("express");
const { createTodo , getTodos , updateTodo , deleteTodo } = require("../controllers/todo.controller")
const { authMiddleware } = require("../middleware/authMiddleware");
const route = express.Router();


route.post("/create", authMiddleware ,createTodo);
route.get("/todos", authMiddleware ,getTodos);
route.put("/update/:id", authMiddleware , updateTodo);
route.delete("/todo/:id", authMiddleware , deleteTodo);






module.exports = route;