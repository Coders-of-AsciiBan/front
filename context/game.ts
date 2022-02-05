import { createContext, useContext } from 'react';
import { GuessData } from '../types';

export const GameContext = createContext(null);

export const useGame = () => {
  return useContext(GameContext);
};
