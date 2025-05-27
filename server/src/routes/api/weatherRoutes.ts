import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// : POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // : GET weather data from city name
  const { city } = req.body;
  if (!city) {
   res.status(400).json({ error: 'City name is required' }); 
    return;
  }

  // : save city to search history
  // HistoryService.addCity(city)
  //   .then(() => {
  //     return WeatherService.getWeatherData(city);
  //   })
  //   .then((weatherData) => {
  //     res.json(weatherData);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching weather data:', error);
  //     res.status(500).json({ error: 'Failed to fetch weather data' });
  //   });
  res.status(501).json({ error: 'Not implemented yet' });
});

// : GET search history
router.get('/history', async (_req, res) => {
  // : Retrieve search history from HistoryService
  // HistoryService.getCities()
  //   .then((cities) => {
  //     res.json(cities);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching search history:', error);
  //     res.status(500).json({ error: 'Failed to fetch search history' });
  //   });
  res.status(501).json({ error: 'Not implemented yet' });
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
