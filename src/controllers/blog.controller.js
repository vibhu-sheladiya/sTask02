
const User = require("../models/user.model");

const Blog= require("../models/blog.model");

const createBlog = async (req, res) => {
    try {
        const reqBody = req.body;
        const userId = req.body.userId;

        if (!userId) {
            return res.status(400).send({ message: "User ID is required" });
        }

        // Pass userId directly, not as an object
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).send({ message: `No user found with ID ${userId}` });
        }

        // Assuming you want to create a blog post related to the user
        const newBlog = await Blog.create({ ...reqBody, user: userId });

        res.status(200).json({ data: newBlog, message: 'Create blog success' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const updateBlog = async (req, res) => {
    try {
      const { userId, blogId, title, desc } = req.body;
  
      // Check if user exists
      const userExists = await User.findById(userId);
      if (!userExists) {
        throw new Error("User not found!");
      }
  
      // Check if blog exists
      const blogExists = await Blog.findById(blogId); // Corrected model
      if (!blogExists) {
        throw new Error("Blog not found!");
      }
  
      // Update blog
      blogExists.title = title;
      blogExists.desc = desc;
      await blogExists.save();
  
      res.status(200).json({
        success: true,
        message: "Blog updated successfully!",
        data: blogExists,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  

  const deleteblog = async (req, res) => {
  try {
    const blogId = req.body.blogId;
    const existingUser = await Blog.findById(blogId);

    if (!existingUser) {
      throw new Error("Blog not found");
    }

    const deletedUser = await Blog.findByIdAndDelete(blogId, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ data: deletedUser, message: "Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    // Fetch all blog posts sorted by 'createdAt' in descending order (-1)
    const blogs = await Blog.find().sort({ createdAt: -1 });

    // Respond with the sorted list of blog posts
    res.status(200).json({
      success: true,
      message: "Fetched all blog posts successfully!",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;


    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found!",
      });
    }

    // Fetch the blog post by its ID
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found!",
      });
    }

    // Respond with the full content of the blog post
    res.status(200).json({
      success: true,
      message: "Blog post retrieved successfully!",
      data: {
        title: blog.title,
        content: blog.desc,  // assuming 'desc' holds the full blog content
        createdAt: blog.createdAt, // return the date the post was created
        author: blog.author, // Optional: you can include author info if needed
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
    createBlog,updateBlog,deleteblog,getAllBlogs,getBlogById
};