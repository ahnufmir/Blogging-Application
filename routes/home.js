const express = require('express');
const { getAllBlogs } = require('../controllers/blogHandlers');

const generalRouter  = express.Router();

generalRouter.get("/", getAllBlogs);

// blogRouter.post("/", createUploader("cover-image").single("coverImage") , createBlog);

module.exports = generalRouter;