require('dotenv').config();
const axios = require('axios');

(async () => {
  try {
    const cities = ['Shimla', 'Solapur', 'Matheran'];

    for (const city of cities) {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: process.env.APIKey,
          units: 'metric'
        }
      });

      console.log(`✅ Weather for ${city}:`, response.data.main);
    }

    console.log('✅ CI check completed.');
    process.exit(0);
  } catch (err) {
    console.error('❌ CI check failed:', err.message);
    process.exit(1);
  }
})();
