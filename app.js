const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const { connectToMongoDB } = require("./config/connection");
const cookieParser = require('cookie-parser');
const { checkForCookieAuhtentication } = require("./middlewares/auth");

connectToMongoDB("mongodb://localhost:27017/bloggio").then(() =>
  console.log("MongoDB Connected"),
);

const app = express();
const Port = 8000;

//middlewares
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForCookieAuhtentication("token"));

app.use("/user", userRouter);
app.use("/",(req, res) => {
  res.render("home", {
    user : req.user
  });
});


app.listen(Port, () => {
  console.log(`Server is listening on Port ${Port}`);
});
