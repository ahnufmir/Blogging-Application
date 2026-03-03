const Blog = require("../models/blog");
const Comment = require("../models/comment");
const { all } = require("../routes/user");
const uploadToS3 = require("../utils/s3");

async function createBlog(req, res) {
  const { title, body, coverImage } = req.body;
  const coverImageUrl = req.file
    ? await uploadToS3(req.file, "blog-covers")
    : null;

  const blog = await Blog.create({
    title,
    body,
    coverImageUrl,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${blog._id}`);
}

async function getAllBlogs(req, res) {
  const allBlogs = await Blog.find({}).sort("createdAt");
  return res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
}

async function getAllUserBlogsOrCommentBlogs(req, res) {
  const allBlogs = await Blog.find({ createdBy: req.user._id });
  const allComments = await Comment.find({ createdBy: req.user._id }).populate(
    "blogID",
  );
  return res.render("userHome", {
    user: req.user,
    blogs: allBlogs,
    comments: allComments,
  });
}

async function createComment(req, res) {
  const comment = await Comment.create({
    content: req.body.content,
    blogID: req.params.id,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.id}`);
}

async function handlerGetBlog(req, res) {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const allComments = await Comment.find({ blogID: req.params.id }).populate(
    "createdBy",
  );
  return res.render("blog", {
    user: req.user,
    blog: blog,
    comments: allComments,
  });
}

module.exports = {
  createBlog,
  getAllBlogs,
  handlerGetBlog,
  createComment,
  getAllUserBlogsOrCommentBlogs,
};
