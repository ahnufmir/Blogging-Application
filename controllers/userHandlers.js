const User = require("../models/user");

async function handlerSignUp(req,res){
    const {name, email, pass, role} = req.body;
    await User.create({
        name : name,
        email : email,
        password : pass,
        role : role
    })
    return res.redirect("/");
}

module.exports = {handlerSignUp}