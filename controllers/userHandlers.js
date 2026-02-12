const User = require("../models/user");

async function handlerSignUp(req, res) {
  //  console.log(req.body.img);
// console.log(req.body);
// console.log(req.file);
  const { name, email, pass} = req.body;
  await User.create({
    name: name,
    email: email,
    password: pass,
    profilePicUrl: `/uploads/profile-pic/${req.file.filename}`,
  });
  return res.redirect("/user/signin");
}

async function handlerSignin(req,res){
    try{
        const {email,pass} = req.body;
        const token = await User.matchPasswordAndGenerateToken(email, pass);
        return res.cookie('token', token).redirect("/");
    }
    catch(error){
        return res.render('signin', {
            error : "Incorrect Email or Password"
        })
    }

}

module.exports = { handlerSignUp , handlerSignin};
