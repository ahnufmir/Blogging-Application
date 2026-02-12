const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogID: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "blog",
        required : true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "user",
      required : true
    },
  },
  { timestamps: true },
);

const Comment = new mongoose.model("comment", schema);

module.exports = Comment;