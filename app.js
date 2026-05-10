const express = require("express");
const connecDB = require("./config/db");
const Todo = require("./models/todo.model");
const app = express();
const todoRoute = require("./routes/todo.route");
const userRoute = require("./routes/user.route");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;


app.use(express.json());
app.use(cookieParser());

app.use("/api",todoRoute);
app.use("/api",userRoute);

app.get("/",(req,res) => {
    res.send("Backend is running...")
})










const start = async () => {
    try { await connecDB(); app.listen(PORT,()=> console.log("server is running..."))}
    catch(error) { console.error(error);}};start();

