import { CONSTANTS } from '@/constants/constants';
import { ForecastData, WeatherData } from '@/types/types';

export const weatherService = {
  async fetchWeather(cityName: string): Promise<WeatherData> {
    const response = await fetch(`${CONSTANTS.WEATHER_API_BASE_URL}/weather?q=${cityName}&units=metric&appid=${CONSTANTS.API_KEY}`);
    if (!response.ok) throw new Error('City not found');
    return response.json();
  },

  async fetchForecast(cityName: string): Promise<ForecastData> {
    const response = await fetch(`${CONSTANTS.WEATHER_API_BASE_URL}/forecast?q=${cityName}&units=metric&appid=${CONSTANTS.API_KEY}`);
    if (!response.ok) throw new Error('Forecast data not available');
    return response.json();
  },
};
