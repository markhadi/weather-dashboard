import { useState, FormEvent, ChangeEvent, useEffect, useCallback } from 'react';
import { Search, Thermometer, Droplets, Wind, Compass, Calendar, Moon, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useApiRateLimit } from './hooks/useApiRateLimit';
import { useSearchHistory } from './hooks/useSearchHistory';
import { weatherService } from './service/weatherService ';
import { ForecastData, WeatherData } from './types/types';
import { formatDate } from './lib/utils';
import { CONSTANTS } from '@/constants/constants';
import { SearchHistoryCard } from './components/SearchHistoryCard';

const WeatherDashboard: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = useCallback(() => setIsDarkMode(prev => !prev), []);
  const { canMakeApiCall, recordApiCall, remainingCalls, nextResetTime } = useApiRateLimit();
  const { searchHistory, addToHistory, removeFromHistory } = useSearchHistory();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fetchWeatherData = async (cityName: string) => {
    if (!canMakeApiCall()) {
      const waitTimeMs = nextResetTime ? nextResetTime.getTime() - Date.now() : 0;
      const waitTimeSeconds = Math.ceil(waitTimeMs / 1000);
      setError(`Rate limit reached. Please wait ${waitTimeSeconds} seconds before trying again.`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      recordApiCall();
      const weatherData = await weatherService.fetchWeather(cityName);
      setWeather(weatherData);

      recordApiCall();
      const forecastData = await weatherService.fetchForecast(cityName);
      setForecast(forecastData);

      addToHistory(cityName);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getDailyForecasts = () => {
    if (!forecast) return [];
    return forecast.list
      .reduce((acc: any[], curr) => {
        const date = curr.dt_txt.split(' ')[0];
        if (!acc.find(item => item.dt_txt.split(' ')[0] === date)) {
          acc.push(curr);
        }
        return acc;
      }, [])
      .slice(0, 5);
  };

  const handleHistoryClick = (cityName: string): void => {
    setCity(cityName);
    fetchWeatherData(cityName);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'} 
    ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}
    >
      <div className="max-w-6xl mx-auto space-y-4 p-4">
        <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} flex items-center justify-end gap-2`}>
          <span>
            API Calls Remaining: {remainingCalls}/{CONSTANTS.MAX_CALLS_PER_MINUTE}
          </span>
          {nextResetTime && <span>(Resets in: {Math.max(0, Math.ceil((nextResetTime.getTime() - Date.now()) / 1000))}s)</span>}
        </div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center transition-transform duration-300 hover:scale-105">Weather Dashboard</h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110
            ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search History Card */}
          <SearchHistoryCard
            searchHistory={searchHistory}
            onHistoryClick={handleHistoryClick}
            onRemoveHistory={removeFromHistory}
            isDarkMode={isDarkMode}
          />

          <div className="md:col-span-3 space-y-4">
            {/* Search Form */}
            <form
              onSubmit={handleSubmit}
              className="flex gap-2"
            >
              <input
                type="text"
                value={city}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className={`flex-1 p-2 rounded-lg transition-all duration-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500
                ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-300'}`}
              />
              <button
                type="submit"
                className={`p-2 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105
                ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                disabled={loading}
              >
                <Search
                  size={20}
                  className="transition-transform duration-300 hover:rotate-90"
                />
                <span className="hidden sm:inline">{loading ? 'Searching...' : 'Search'}</span>
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div
                className={`p-4 rounded-lg animate-fade-in transition-all duration-300 transform hover:scale-105
              ${isDarkMode ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-700'}`}
              >
                {error}
              </div>
            )}

            {/* Current Weather */}
            {weather && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Main Weather Card */}
                <Card
                  className={`transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1
                ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}
                >
                  <CardHeader>
                    <CardTitle>
                      {weather.name}, {weather.sys.country}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-4xl font-bold transition-all duration-300 hover:scale-110">{Math.round(weather.main.temp)}°C</div>
                      <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        className="w-20 h-20 transition-transform duration-300 hover:rotate-12"
                      />
                    </div>
                    <p className={`capitalize ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{weather.weather[0].description}</p>
                  </CardContent>
                </Card>

                {/* Weather Details Card */}
                <Card
                  className={`transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1
                ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}
                >
                  <CardHeader>
                    <CardTitle>Weather Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { icon: Thermometer, text: `Feels like: ${Math.round(weather.main.feels_like)}°C` },
                        { icon: Droplets, text: `Humidity: ${weather.main.humidity}%` },
                        { icon: Wind, text: `Wind Speed: ${weather.wind.speed} m/s` },
                        { icon: Compass, text: `Wind Direction: ${weather.wind.deg}°` },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2"
                        >
                          <item.icon
                            className={`transition-transform duration-300 hover:scale-125
                          ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
                          />
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* 5-Day Forecast */}
            {forecast && (
              <Card
                className={`mt-4 transition-all duration-300 hover:shadow-lg
              ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar
                      className={`transition-transform duration-300 hover:rotate-12
                    ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
                    />
                    5-Day Forecast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {getDailyForecasts().map((day, index) => (
                      <div
                        key={day.dt}
                        className={`p-4 rounded-lg transition-all duration-300 transform hover:shadow-md hover:-translate-y-2
                        ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="text-sm font-semibold mb-2">{formatDate(day.dt_txt)}</div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold transition-all duration-300 hover:scale-110">{Math.round(day.main.temp)}°C</span>
                          <img
                            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                            alt={day.weather[0].description}
                            className="w-12 h-12 transition-transform duration-300 hover:rotate-12"
                          />
                        </div>
                        <div className={`text-sm capitalize ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{day.weather[0].description}</div>
                        <div className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <div className="flex items-center gap-1 transition-all duration-300 hover:translate-x-2">
                            <Droplets
                              size={14}
                              className={isDarkMode ? 'text-blue-400' : 'text-blue-500'}
                            />
                            {day.main.humidity}%
                          </div>
                          <div className="flex items-center gap-1 transition-all duration-300 hover:translate-x-2">
                            <Wind
                              size={14}
                              className={isDarkMode ? 'text-blue-400' : 'text-blue-500'}
                            />
                            {day.wind.speed} m/s
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
