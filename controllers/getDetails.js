const User = require("../models/User");

const getDetails = async (req, res) => {
  const { _id, name, email, profilename, bio, image } = req.user;
  res.json({
    _id,
    name,
    email,
    profilename,
    bio,
    image: `/Images/${image}`, // Adjust path if necessary
  });
};

module.exports = { getDetails };
