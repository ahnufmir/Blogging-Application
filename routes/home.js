const express = require('express');
const { getAllBlogs } = require('../controllers/blogHandlers');

const homeRouter  = express.Router();

homeRouter.get("/", getAllBlogs);

// blogRouter.post("/", createUploader("cover-image").single("coverImage") , createBlog);

module.exports = homeRouter;