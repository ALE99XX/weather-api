const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = 'INSERISCI_LA_TUA_API_KEY_DI_WEATHERAPI';

app.post('/get_weather', async (req, res) => {
  const { city } = req.body;
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
      params: {
        key: API_KEY,
        q: city
      }
    });

    const data = response.data;
    res.json({
      city: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      humidity: data.current.humidity,
      wind_kph: data.current.wind_kph
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei dati meteo.' });
  }
});

app.listen(3000, () => {
  console.log('Server meteo attivo sulla porta 3000');
});
