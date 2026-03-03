const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/authentication");

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
      default: function () {
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/defaults/avatar.jpg`;
      },
    },
  },
  { timestamps: true },
);

schema.pre("save", function () {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
});

schema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("No user in the database");

    const salt = user.salt;
    const hashedPassword = user.password;

    const givePassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== givePassword) throw new Error("Incorrect Password");

    const token = createTokenForUser(user);
    return token;
    //   const obj = user.toObject();
    //   obj.password = undefined;
    //   obj.salt = undefined;
    //   return obj;
  },
);

const User = new mongoose.model("user", schema);

module.exports = User;
