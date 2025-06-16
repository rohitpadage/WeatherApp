const express = require("express");
const axios = require("axios");
const Weather = require("../models/weatherDataModel");

const router = express.Router();

// Render home
router.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Weather route
router.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.APIKey;
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  let weather;
  let error = null;

  try {
    const response = await axios.get(APIUrl);
    weather = response.data;

    const newEntry = new Weather({
      city: weather.name,
      temperature: weather.main.temp,
      weatherState: weather.weather[0].main,
      dateTime: new Date()
    });

    console.log("try weather api response:",weather);
    await newEntry.save();

  } catch (err) {
    console.log("catch weather api error:", err.message);
    weather = null;
    error = "Error, Please try again";
  }

  res.render("index", { weather, error });

});

module.exports = router;
