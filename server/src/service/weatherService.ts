import dotenv from 'dotenv';
dotenv.config();

//  Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// : Define a class for the Weather object
class Weather {
  constructor(
    public city: string,
    public temperature: number,
    public description: string,
    public humidity: number,
    public windSpeed: number,
    public icon: string,
    public iconDescription: string,
  ) {
    this.city = city;
    this.temperature = temperature;
    this.description = description;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}
// : Complete the WeatherService class
class WeatherService {
  // : Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor() {
    this.baseURL = 'https://api.openweathermap.org';
    this.apiKey = process.env.OPEN_WEATHER_API_KEY || '';
    this.cityName = '';
  }
  // : Create fetchLocationData method
   private async fetchLocationData(query: string) {
    const response = await fetch(`${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    return response.json();
   }

  // : Create destructureLocationData method
   private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon };
   }
  //  Create buildGeocodeQuery method
   private buildGeocodeQuery(): string {
    return `${this.cityName}`;
   }
  //  Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }
  // : Create fetchAndDestructureLocationData method
   private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    if (locationData.length === 0) {
      throw new Error('Location not found');
    }
    return this.destructureLocationData(locationData[0]);
   }
  // : Create fetchWeatherData method
   private async fetchWeatherData(coordinates: Coordinates) {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(weatherQuery);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return response.json();
   }
  // : Build parseCurrentWeather method
   private parseCurrentWeather(response: any) {
    const { name, main, weather, wind } = response;
    const temperature = Math.round(main.temp - 273.15);
    const humidity = main.humidity;
    const windSpeed = wind.speed;
    const icon = weather[0].icon;
    const description = weather[0].description;

    return new Weather(name, temperature, description, humidity, windSpeed, icon, description);
   }
  // : Complete buildForecastArray method
   private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray: Weather[] = [];
    weatherData.forEach((data) => {
      const temperature = Math.round(data.main.temp - 273.15);
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const icon = data.weather[0].icon;
      const description = data.weather[0].description;

      forecastArray.push(new Weather(currentWeather.city, temperature, description, humidity, windSpeed, icon, description));
    });
    return forecastArray;
   }
  // : Complete getWeatherForCity method
   async getWeatherForCity(city: string) {
    this.cityName = city;
    await this.fetchAndDestructureLocationData();
    try {
      const coordinates = await this.fetchAndDestructureLocationData();
      const weatherData = await this.fetchWeatherData(coordinates);
      const currentWeather = this.parseCurrentWeather(weatherData.list[0]);
      const forecastArray = this.buildForecastArray(currentWeather, weatherData.list);
      return forecastArray;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data');
    }
  }
}
export default new WeatherService();
