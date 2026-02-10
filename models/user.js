const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicUrl: {
      type: String,
      default: "./Public/Images/avatar.jpg",
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
    },
  },
  { timestamps: true },
);

schema.pre("save", function () {
  const user = this;
  if(!user.isModified("password")) return ;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;
});

const User = new mongoose.model("user", schema);

module.exports = User;
