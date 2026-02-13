require('dotenv').config() 

const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const { connectToMongoDB } = require("./config/connection");
const cookieParser = require('cookie-parser');
const { checkForCookieAuhtentication } = require("./middlewares/auth");
const blogRouter = require("./routes/blog");
const generalRouter = require("./routes/home");

connectToMongoDB(process.env.MONGO_URL ).then(() =>
  console.log("MongoDB Connected"),
);

const app = express();
const Port = process.env.PORT || 8000;

//middlewares
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForCookieAuhtentication("token"));
app.use(express.static(path.resolve("./Public")));

app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/", generalRouter);



app.listen(Port, () => {
  console.log(`Server is listening on Port ${Port}`);
});
