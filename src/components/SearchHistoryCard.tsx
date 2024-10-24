import { SearchHistoryItem } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Clock, X } from 'lucide-react';
import { formatHistoryDate } from '@/lib/utils';

export const SearchHistoryCard: React.FC<{
  searchHistory: SearchHistoryItem[];
  onHistoryClick: (city: string) => void;
  onRemoveHistory: (city: string) => void;
  isDarkMode: boolean;
}> = ({ searchHistory, onHistoryClick, onRemoveHistory, isDarkMode }) => (
  <Card
    className={`md:col-span-1 transition-transform duration-300 hover:shadow-lg
    ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}
  >
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Clock
          className={`transition-transform duration-300 hover:rotate-180
          ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
          size={20}
        />
        Recent Searches
      </CardTitle>
    </CardHeader>
    <CardContent>
      {searchHistory.length === 0 ? (
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No recent searches</p>
      ) : (
        <div className="space-y-2">
          {searchHistory.map((item, index) => (
            <div
              key={item.timestamp}
              className={`flex items-center justify-between p-2 rounded-lg 
                transition-all duration-300 transform hover:-translate-y-1
                ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => onHistoryClick(item.city)}
                className="flex-1 text-left text-sm"
              >
                <div className="font-medium">{item.city}</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{formatHistoryDate(item.timestamp)}</div>
              </button>
              <button
                onClick={() => onRemoveHistory(item.city)}
                className={`p-1 rounded transition-colors duration-200
                  ${isDarkMode ? 'hover:bg-gray-500' : 'hover:bg-gray-200'}`}
              >
                <X
                  size={16}
                  className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);
