
import { useState, useCallback, useEffect } from 'react';
import { cities, neverHaveIEverQuestions, Question, City } from '@/data/cities';
import { initialAchievements, Achievement } from '@/data/achievements';

export interface GameState {
  selectedCity: City | null;
  gameMode: 'city' | 'never-have-i-ever';
  currentQuestions: Question[];
  currentQuestionIndex: number;
  totalRounds: number;
  achievements: Achievement[];
  citiesPlayed: string[];
  neverHaveIEverRounds: number;
}

const STORAGE_KEY = 'olspelet-game-state';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          selectedCity: parsed.selectedCity ? cities.find(c => c.id === parsed.selectedCity?.id) || null : null,
          currentQuestions: [],
          currentQuestionIndex: 0
        };
      } catch {
        // If parsing fails, return default state
      }
    }
    
    return {
      selectedCity: null,
      gameMode: 'city' as const,
      currentQuestions: [],
      currentQuestionIndex: 0,
      totalRounds: 0,
      achievements: initialAchievements,
      citiesPlayed: [],
      neverHaveIEverRounds: 0
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    const stateToSave = {
      ...gameState,
      currentQuestions: [], // Don't save current session
      currentQuestionIndex: 0
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [gameState]);

  const selectCity = useCallback((city: City) => {
    setGameState(prev => ({
      ...prev,
      selectedCity: city,
      gameMode: 'city'
    }));
  }, []);

  const setGameMode = useCallback((mode: 'city' | 'never-have-i-ever') => {
    setGameState(prev => ({
      ...prev,
      gameMode: mode
    }));
  }, []);

  const startGame = useCallback(() => {
    const questions = gameState.gameMode === 'city' 
      ? gameState.selectedCity?.questions || []
      : neverHaveIEverQuestions;
    
    // Randomize questions
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    
    setGameState(prev => ({
      ...prev,
      currentQuestions: shuffled,
      currentQuestionIndex: 0
    }));
  }, [gameState.gameMode, gameState.selectedCity]);

  const nextQuestion = useCallback(() => {
    setGameState(prev => {
      const nextIndex = prev.currentQuestionIndex + 1;
      
      // If we've reached the end, increment counters and update achievements
      if (nextIndex >= prev.currentQuestions.length) {
        const newTotalRounds = prev.totalRounds + 1;
        const newCitiesPlayed = prev.gameMode === 'city' && prev.selectedCity
          ? [...new Set([...prev.citiesPlayed, prev.selectedCity.id])]
          : prev.citiesPlayed;
        const newNeverHaveIEverRounds = prev.gameMode === 'never-have-i-ever'
          ? prev.neverHaveIEverRounds + 1
          : prev.neverHaveIEverRounds;

        // Update achievements
        const updatedAchievements = prev.achievements.map(achievement => {
          let newProgress = achievement.currentProgress;
          
          switch (achievement.type) {
            case 'rounds':
              newProgress = newTotalRounds;
              break;
            case 'cities':
              newProgress = newCitiesPlayed.length;
              break;
            case 'modes':
              if (achievement.id === 'never_have_i_ever_master') {
                newProgress = newNeverHaveIEverRounds;
              }
              break;
          }

          return {
            ...achievement,
            currentProgress: newProgress,
            unlocked: newProgress >= achievement.requirement
          };
        });

        return {
          ...prev,
          currentQuestionIndex: nextIndex,
          totalRounds: newTotalRounds,
          citiesPlayed: newCitiesPlayed,
          neverHaveIEverRounds: newNeverHaveIEverRounds,
          achievements: updatedAchievements
        };
      }
      
      return {
        ...prev,
        currentQuestionIndex: nextIndex
      };
    });
  }, []);

  const getCurrentQuestion = useCallback(() => {
    if (gameState.currentQuestionIndex < gameState.currentQuestions.length) {
      return gameState.currentQuestions[gameState.currentQuestionIndex];
    }
    return null;
  }, [gameState.currentQuestions, gameState.currentQuestionIndex]);

  const isGameComplete = useCallback(() => {
    return gameState.currentQuestionIndex >= gameState.currentQuestions.length;
  }, [gameState.currentQuestionIndex, gameState.currentQuestions.length]);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentQuestions: [],
      currentQuestionIndex: 0
    }));
  }, []);

  return {
    gameState,
    selectCity,
    setGameMode,
    startGame,
    nextQuestion,
    getCurrentQuestion,
    isGameComplete,
    resetGame,
    cities
  };
};
