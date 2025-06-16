const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./config/DbConnection");  // DB connection
const weatherRoutes = require("./routes/weather");  // Routes

const app = express();

// Connect to MongoDB
connectDB();

// Set view engine and static
app.set("view engine", "ejs");
app.use(express.static("public"));

// Use weather routes
app.use("/", weatherRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
