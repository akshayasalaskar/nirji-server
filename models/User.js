// // const mongoose = require("mongoose");
// // const { isEmail } = require("validator"); // using validator library

// // const userSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: [true, "Please Enter a Name"],
// //   },
// //   email: {
// //     type: String,
// //     required: [true, "Please Enter Your Email Id"],
// //     unique: true, // one email id can only create one account, if already exsiting user makes another account with same email, then error
// //     validate: [isEmail, "Please Enter Valid Email"],
// //   },
// //   password: {
// //     type: String,
// //     required: [true, "Please Enter Password"],
// //     minLength: [6, "Minimum password length is 6"], //Conditonal statement , if 6 or more then accepts password else says 'Minimum password length is 6'
// //   },
// // });

// // const User = mongoose.model("user", userSchema);

// // module.exports = User;

// const mongoose = require("mongoose");
// const { isEmail } = require("validator"); // using validator library

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please Enter a Name"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please Enter Your Email Id"],
//     unique: true, // one email id can only create one account, if already exsiting user makes another account with same email, then error
//     validate: [isEmail, "Please Enter Valid Email"],
//   },
//   password: {
//     type: String,
//     required: [true, "Please Enter Password"],
//     minLength: [6, "Minimum password length is 6"], //Conditonal statement , if 6 or more then accepts password else says 'Minimum password length is 6'
//   },
//   username: {
//     type: String,
//     unique: true,
//     required: [true, "Please Enter a Username"],
//   },
// });

// const User = mongoose.model("user", userSchema);

// module.exports = User;

const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email Id"],
    unique: true,
    validate: [isEmail, "Please Enter a Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minLength: [6, "Minimum password length is 6"],
  },
  profilename: {
    type: String,
    required: [true, "Please Enter Your Profile Name"],
    unique: true,
  },
  bio: {
    type: String,
    required: [true, "Please Enter Your Bio"],
  },
  image: {
    type: String, // Store image file path as a string
    default: null,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
