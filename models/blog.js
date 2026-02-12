const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
      default: "./Public/Images/avatar.jpg",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "user"
    },
  },
  { timestamps: true },
);

const Blog = new mongoose.model("blog", schema);

module.exports = Blog;