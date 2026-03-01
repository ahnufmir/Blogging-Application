const User = require("../models/user");
const uploadToS3 = require("../utils/s3");

async function handlerSignUp(req, res) {
  //  console.log(req.body.img);
  // console.log(req.body);
  // console.log(req.file);
  const { name, email, pass } = req.body;
  const profilePicUrl = req.file
    ? await uploadToS3(req.file, "profile-pics")
    : null;
  await User.create({
    name,
    email,
    password: pass,
    profilePicUrl,
  });
  return res.redirect("/user/signin");
}

async function handlerSignin(req, res) {
  try {
    const { email, pass } = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, pass);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
}

module.exports = { handlerSignUp, handlerSignin };
