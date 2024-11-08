const bcrypt = require("bcrypt");
const upload = require("../utils/multerConfig");
const User = require("../models/User");
const { isEmail } = require("validator");

const saltRounds = 10;

// Checks if signup fields are complete and valid
const validateSignUpData = async (req, res) => {
  const { name, email, password, profilename, bio } = req.body;

  if (!name || name.trim().length === 0) {
    res.status(400).json({ message: "Please Enter a Name" });
    return false;
  }
  if (!isEmail(email)) {
    res.status(400).json({ message: "Please Enter a Valid Email" });
    return false;
  }
  if (!password || password.trim().length < 6) {
    res.status(400).json({ message: "Minimum password length is 6" });
    return false;
  }
  if (!profilename || profilename.trim().length === 0) {
    res.status(400).json({ message: "Please Enter a Username" });
    return false;
  }
  if (!bio || bio.trim().length === 0) {
    res.status(400).json({ message: "Please Enter Your Bio" });
    return false;
  }

  const existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    res.status(400).json({ message: "Email Already Registered" });
    return false;
  }

  const existingProfileName = await User.findOne({ profilename }).exec();
  if (existingProfileName) {
    res.status(400).json({ message: "Profile Name Already Registered" });
    return false;
  }

  return true;
};

// Uses multer to handle file uploads, hashes the password, and creates a new user in the database if all validations pass,
const signUpHandler = [
  upload.single("file"),
  async (req, res) => {
    const { name, email, password, profilename, bio } = req.body;

    const isValid = await validateSignUpData(req, res);
    if (!isValid) return;

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        profilename,
        bio,
        image: req.file.filename,
      });

      res.status(201).json({
        message: "Account Created Successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profilename: user.profilename,
          bio: user.bio,
          image: user.image,
        },
      });
    } catch (error) {
      console.error(error);
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        res.status(400).json({ message: `${field} Already Exists` });
      } else {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  },
];

module.exports = signUpHandler;
