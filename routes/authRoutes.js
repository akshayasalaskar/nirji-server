const { Router } = require("express");
const SignUp = require("../controllers/SignUp");
const login = require("../controllers/login");
const auth = require("../controllers/auth");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadPost, getUserImages } = require("../controllers/postController");
const upload = require("../utils/multerConfig");

const router = Router();
// POST /signup - Registers a new user account
router.post("/signup", SignUp);

// POST /login - Authenticates a user and provides a login token
router.post("/login", login);

// POST /auth - Verifies the validity of a provided token
router.post("/auth", auth);

// POST /uploadImages - Authenticated route to upload an image
router.post(
  "/uploadImages",
  authMiddleware,
  upload.single("image"),
  uploadPost
);

// GET /getImages - Authenticated route to retrieve all images for the logged-in user
router.get("/getImages", authMiddleware, getUserImages);

module.exports = router;
