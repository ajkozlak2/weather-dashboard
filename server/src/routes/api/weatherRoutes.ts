import { Router } from 'express';
const router = Router();

 import HistoryService from '../../service/historyService.js';
 import WeatherService from '../../service/weatherService.js';

// : POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // : GET weather data from city name
  const { cityName } = req.body;
  if (!cityName) {
   res.status(400).json({ error: 'City name is required' }); 
    return;
  }

  //: save city to search history
  HistoryService.addCity(cityName)
    .then(() => {
      return WeatherService.getWeatherForCity(cityName);
    })
    .then((weatherData) => {
      res.json(weatherData);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
   });
});

// : GET search history
router.get('/history', async (_req, res) => {
  // : Retrieve search history from HistoryService
   HistoryService.getCities()
    .then((cities) => {
      res.json(cities);
    })
    .catch((error) => {
      console.error('Error fetching search history:', error);
      res.status(500).json({ error: 'Failed to fetch search history' });
    });
});

// : DELETE city from search history
router.delete('/history/:id', async (_req, res) => {
  // : Remove city from search history
  // HistoryService.removeCity(id)
  //   .then(() => {
  //     res.status(204).send();
  //   })
  //   .catch((error) => {
  //     console.error('Error removing city from search history:', error);
  //     res.status(500).json({ error: 'Failed to remove city from search history' });
  //   });
  res.status(501).json({ error: 'Not implemented yet' });
});

export default router;
