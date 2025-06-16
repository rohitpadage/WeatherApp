const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  weatherState: String,
  dateTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Weather", weatherSchema);
