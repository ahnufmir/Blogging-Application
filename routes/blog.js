const express = require('express');
const {createUploader} = require("../config/upload");
const { createBlog } = require('../controllers/blogHandlers');

const blogRouter = express.Router();

blogRouter.get("/add-new",  (req,res)=>{
    return res.render("addBlog", {
        user : req.user
    })
} )

blogRouter.post("/", createUploader("cover-image").single("coverImage") , createBlog);

module.exports = blogRouter;