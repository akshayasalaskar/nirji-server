const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const routes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/Images", express.static(path.join(__dirname, "public/Images")));

try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
} catch (error) {
  console.log(error);
}

app.use("/api", routes); //handler for api calls

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
