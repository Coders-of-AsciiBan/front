import { createContext, useContext } from 'react';

export const LeaderboardContext = createContext(null);

export const useLeaderboard = () => {
  return useContext(LeaderboardContext);
};
