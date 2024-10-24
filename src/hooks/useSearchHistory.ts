import { CONSTANTS } from '@/constants/constants';
import { SearchHistoryItem } from '@/types/types';
import { useCallback, useEffect, useState } from 'react';

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(CONSTANTS.HISTORY_KEY);
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CONSTANTS.HISTORY_KEY, JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = useCallback((cityName: string) => {
    setSearchHistory(prev => [{ city: cityName, timestamp: Date.now() }, ...prev.filter(item => item.city.toLowerCase() !== cityName.toLowerCase())].slice(0, CONSTANTS.MAX_HISTORY_ITEMS));
  }, []);

  const removeFromHistory = useCallback((cityName: string) => {
    setSearchHistory(prev => prev.filter(item => item.city !== cityName));
  }, []);

  return { searchHistory, addToHistory, removeFromHistory };
};
