const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const { connectToMongoDB } = require("./config/connection");

connectToMongoDB("mongodb://localhost:27017/bloggio").then(() =>
  console.log("MongoDB Connected"),
);

const app = express();
const Port = 8000;

//middlewares
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));

app.use("/home", (req, res) => {
  res.render("home");
});

app.use("/user", userRouter);

app.listen(Port, () => {
  console.log(`Server is listening on Port ${Port}`);
});
