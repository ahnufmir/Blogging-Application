const express = require('express');
const {handlerSignUp, handlerSignin} = require("../controllers/userHandlers")
const {upload} = require("../config/upload");


const userRouter = express.Router();

userRouter.get("/signup", (req,res)=>{
    return res.render("signup");
})

userRouter.get("/signin", (req,res)=>{
    return res.render("signin");
})

userRouter.post("/signup", upload.single("img") , handlerSignUp);
userRouter.post("/signin" , handlerSignin);

module.exports = userRouter;