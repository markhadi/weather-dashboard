export const CONSTANTS = {
  API_KEY: import.meta.env.VITE_WEATHER_API_KEY,
  HISTORY_KEY: 'weatherSearchHistory',
  THEME_KEY: 'weatherDashboardTheme',
  MAX_HISTORY_ITEMS: 5,
  MAX_CALLS_PER_MINUTE: 10,
  WEATHER_API_BASE_URL: 'https://api.openweathermap.org/data/2.5',
} as const;
