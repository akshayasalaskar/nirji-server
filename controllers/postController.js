const Post = require("../models/Post");
const multer = require("multer");
const upload = require("../utils/multerConfig");

// Handles image upload, saves the image path and user ID to the database, and responds with success or error messages.
const uploadPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const newPost = new Post({
      image: `/Images/${req.file.filename}`,
      user: req.user._id,
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Image uploaded successfully", image: newPost.image });
  } catch (error) {
    if (
      error instanceof multer.MulterError &&
      error.code === "LIMIT_FILE_SIZE"
    ) {
      return res
        .status(400)
        .json({ message: "File size is too large. Maximum allowed is 5 MB." });
    }
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
};

// Retrieves all image paths associated with the logged-in user and sends them as a response.
const getUserImages = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id });
    const images = posts.map((post) => post.image);
    res.status(200).json({ images });
  } catch (error) {
    console.error("Error fetching user images:", error);
    res.status(500).json({ message: "Error fetching images" });
  }
};

module.exports = { uploadPost, getUserImages };
