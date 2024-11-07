const { Router } = require("express");
const SignUp = require("../controllers/SignUp");
const login = require("../controllers/login");
const auth = require("../controllers/auth");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadPost, getUserImages } = require("../controllers/postController");
const upload = require("../utils/multerConfig");

const router = Router();

router.post("/signup", SignUp); // Sign up route
router.post("/login", login); // Login route
router.post("/auth", auth); // Token verification route

router.post(
  "/uploadImages",
  authMiddleware,
  upload.single("image"),
  uploadPost
);
router.get("/getImages", authMiddleware, getUserImages);

module.exports = router;
