const express = require("express");
const { handlerSignUp, handlerSignin } = require("../controllers/userHandlers");
const { createUploader } = require("../config/upload");
const {
  getAllUserBlogsOrCommentBlogs,
} = require("../controllers/blogHandlers");

const userRouter = express.Router();

userRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

userRouter.get("/signin", (req, res) => {
  return res.render("signin");
});

userRouter.get("/user-blogs", getAllUserBlogsOrCommentBlogs);

userRouter.post(
  "/signup",
  createUploader("profile-pic").single("img"),
  handlerSignUp,
);
userRouter.post("/signin", handlerSignin);

userRouter.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/user/signin");
});

module.exports = userRouter;
