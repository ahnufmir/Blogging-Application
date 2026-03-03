const User = require("../models/user");
const uploadToS3 = require("../utils/s3");

async function handlerSignUp(req, res) {
  try {
    const { name, email, pass } = req.body;
    const userData = {
      name,
      email,
      password: pass,
    };

    // Only add profilePicUrl if file was uploaded
    if (req.file) {
      userData.profilePicUrl = await uploadToS3(req.file, "profile-pics");
    }

    await User.create(userData);
    return res.redirect("/user/signin");
  } catch (error) {
    let errorMessage = "An error occurred during signup";

    // Check for duplicate email error
    if (error.code === 11000 && error.keyPattern.email) {
      errorMessage = "Email already exists. Please use a different email.";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return res.render("signup", {
      error: errorMessage,
    });
  }
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
