// const { Router } = require("express");
// const SignUp = require("../controllers/SignUp");
// const router = Router();
// const login = require("../controllers/login");
// const auth = require("../controllers/auth");

// router.post("/signup", SignUp); //routing
// router.post("/login", login);
// router.post("/auth", auth);

// module.exports = router;

const { Router } = require("express");
const SignUp = require("../controllers/SignUp");
const login = require("../controllers/login");
const auth = require("../controllers/auth");
const authMiddleware = require("../middleware/authMiddleware");
const { getDetails } = require("../controllers/getDetails");
const { uploadPost, getUserPosts } = require("../controllers/postController");

const router = Router();

router.post("/signup", SignUp); // Sign up route
router.post("/login", login); // Login route
router.post("/auth", auth); // Token verification route

router.get("/", authMiddleware, getDetails);
router.post("/", authMiddleware, uploadPost); // Route for posting images
router.get("/", authMiddleware, getUserPosts);

module.exports = router;
