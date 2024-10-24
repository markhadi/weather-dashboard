import { CONSTANTS } from '@/constants/constants';
import { ApiCall } from '@/types/types';
import { useCallback, useEffect, useState } from 'react';

export const useApiRateLimit = () => {
  const [apiCalls, setApiCalls] = useState<ApiCall[]>([]);
  const [remainingCalls, setRemainingCalls] = useState<number>(CONSTANTS.MAX_CALLS_PER_MINUTE);
  const [nextResetTime, setNextResetTime] = useState<Date | null>(null);

  const canMakeApiCall = useCallback(() => {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const recentCalls = apiCalls.filter(call => call.timestamp > oneMinuteAgo);
    return recentCalls.length < CONSTANTS.MAX_CALLS_PER_MINUTE;
  }, [apiCalls]);

  const recordApiCall = useCallback(() => {
    setApiCalls(prevCalls => [...prevCalls, { timestamp: Date.now() }]);
  }, []);

  useEffect(() => {
    const updateRemainingCalls = () => {
      const now = Date.now();
      const oneMinuteAgo = now - 60000;
      const recentCalls = apiCalls.filter(call => call.timestamp > oneMinuteAgo);

      setRemainingCalls(CONSTANTS.MAX_CALLS_PER_MINUTE - recentCalls.length);

      if (recentCalls.length > 0) {
        const oldestCall = Math.min(...recentCalls.map(call => call.timestamp));
        setNextResetTime(new Date(oldestCall + 60000));
      } else {
        setNextResetTime(null);
      }
    };

    updateRemainingCalls();
    const interval = setInterval(updateRemainingCalls, 1000);
    return () => clearInterval(interval);
  }, [apiCalls]);

  return { canMakeApiCall, recordApiCall, remainingCalls, nextResetTime };
};
