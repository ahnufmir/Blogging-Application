const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const { connectToMongoDB } = require("./config/connection");
const cookieParser = require('cookie-parser');
const { checkForCookieAuhtentication } = require("./middlewares/auth");
const blogRouter = require("./routes/blog");
const homeRouter = require("./routes/home");

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
app.use(express.static(path.resolve("./Public")));

app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/", homeRouter);



app.listen(Port, () => {
  console.log(`Server is listening on Port ${Port}`);
});
