const express = require('express');
const {createUploader} = require("../config/upload");
const { createBlog, handlerGetBlog, createComment } = require('../controllers/blogHandlers');

const blogRouter = express.Router();



blogRouter.get("/add-new",  (req,res)=>{
    return res.render("addBlog", {
        user : req.user
    })
} )

blogRouter.get("/:id", handlerGetBlog)


blogRouter.post("/", createUploader("cover-image").single("coverImage") , createBlog);

blogRouter.post("/comment/:id", createComment);

module.exports = blogRouter;