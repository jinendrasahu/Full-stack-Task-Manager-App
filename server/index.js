const dotenv = require("dotenv");
const cors = require("cors");
const { mongoose } = require("./db");
const express = require("express");
const { register } = require("./middlewares/register");
const { varifyOtp } = require("./modules/VarifyOtp");
const { Login } = require("./modules/Login")
const { sendVarificationMail } = require("./modules/SendVarificationMail");
const { updateTask } = require("./modules/UpdateTask");
const { deleteTask } = require("./modules/DeleteTask");
const { varifyToken, tokenVerified } = require("./middlewares/varifyToken");
const { createTask,getTask } = require("./modules/CreateTask");
const { logout } = require("./modules/Logout");
dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server connected");
    }
});


app.post("/register", register, sendVarificationMail);
app.post("/resendotp", register, sendVarificationMail);
app.post("/varify", varifyOtp);
app.get("/verifytoken", varifyToken,tokenVerified);
app.post("/login", Login);
app.post("/logout", varifyToken, logout);

app.post("/task/create", varifyToken, createTask);
app.get("/task/get", varifyToken, getTask);
app.patch("/task/:id", varifyToken, updateTask);
app.delete("/task/:id", varifyToken, deleteTask);
