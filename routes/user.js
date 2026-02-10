const express = require('express');
const {handlerSignUp} = require("../controllers/userHandlers")


const userRouter = express.Router();

userRouter.get("/signup", (req,res)=>{
    return res.render("signup");
})

userRouter.get("/signin", (req,res)=>{
    return res.render("signin");
})

userRouter.post("/signup", handlerSignUp);

module.exports = userRouter;