const User = require("../models/user");

async function handlerSignUp(req, res) {
  //  console.log(req.body.img);
console.log(req.body);
  const { name, email, pass, role} = req.body;
  await User.create({
    name: name,
    email: email,
    password: pass,
    role: role,
  });
  return res.redirect("/user/signin");
}

async function handlerSignin(req,res){
    console.log(req.headers["content-type"]);
    const body = req.body;
    console.log("Body" , body);
    const {email,pass} = req.body;
    const user = await User.matchPassword(email, pass);
    if(!user) return res.redirect("/signin");
    console.log("User " , user);
    return res.redirect("/");

}

module.exports = { handlerSignUp , handlerSignin};
