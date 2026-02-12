const Blog = require("../models/blog");

async function createBlog(req,res){
    const { title, body , coverImage } = req.body;
    console.log(req.body);
console.log(req.file);
    await Blog.create({
        title : title,
        body : body,
        coverImageUrl : `/Public/uploads/cover-image/${req.file.filename}`,
        createdBy : req.user._id,
    })
    return res.redirect("/");
}

async function getAllBlogs(req,res){
    const allBlogs = await Blog.find({}).sort("createdAt");
    return res.render("home", {
        user : req.user,
        blogs : allBlogs
    })
}

module.exports = {
    createBlog,
    getAllBlogs
}

