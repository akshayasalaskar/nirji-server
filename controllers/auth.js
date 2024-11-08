// This code verifies a JSON Web Token (JWT) received from the request body. If the token is valid, it responds with
// authenticated data; otherwise, it returns an error message

const jwt = require("jsonwebtoken");
module.exports = (req, res) => {
  const { token } = req.body;
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
      res.json({
        auth: true,
        data: decode,
      });
    } catch (error) {
      res.json({
        auth: false,
        data: error.message,
      });
    }
  } else {
    res.json({
      auth: false,
      data: "No Token Found in request",
    });
  }
};
