const express = require("express");
const {
  register,
  login,

} = require("../../controllers/user.controller");

const { userAuth } = require("../../middlewares/auth");
const { createBlog,updateBlog,deleteblog,getAllBlogs ,getBlogById} = require("../../controllers/blog.controller");

const router = express();

router.post("/create", register);
router.post("/create-blog",createBlog );
router.put("/update-blog",updateBlog );
router.delete("/delete-blog",deleteblog );
router.get("/get-blog",userAuth(),getAllBlogs );
router.get("/blog/:id",userAuth(),getBlogById );


router.post("/login", userAuth(), login);

module.exports = router;