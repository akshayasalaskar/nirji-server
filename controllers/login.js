// The idea behind this page is: When the user logs in we will create a sign up token and give it to user, user will save that token in his cookie
// if user has cookie and his cookie is valid then we can say that usesr is authenticated

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // imported jsonwebtoken library to use in the file

const User = require("../models/User");

module.exports = async (req, res) => {
  const { email, password } = req.body; //taking email and password from body and checking if it exits in database or not
  const dbUser = await User.findOne({ email }).exec();
  if (dbUser) {
    const match = await bcrypt.compare(password, dbUser.password);
    if (match) {
      const token = jwt.sign(
        { _id: dbUser._id, name: dbUser.name, email },
        process.env.JWT_LOGIN_TOKEN,
        { expiresIn: "1d" }
      );
      res.json({
        message: "Login Successul",
        token,
      });
    } else {
      res.status(400).json({ message: "Username or Password incorrect" });
      return false;
    }
  } else {
    res.status(400).json({ message: "Email Not Registered, Please SignUp" });
    return false;
  }
};
