// controllers/PostController.js
const Post = require("../models/Post");
const upload = require("../utils/multerConfig");

// Upload a new post (image)
const uploadPost = [
  upload.single("image"),
  async (req, res) => {
    try {
      const newPost = await Post.create({
        image: req.file.filename,
        user: req.user._id,
      });
      res
        .status(201)
        .json({ message: "Post uploaded successfully", post: newPost });
    } catch (error) {
      res.status(500).json({ message: "Error uploading post", error });
    }
  },
];

// Get all posts by the authenticated user
const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id });
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

module.exports = { uploadPost, getUserPosts };
