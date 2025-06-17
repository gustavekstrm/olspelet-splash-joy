
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useGameState } from "@/hooks/useGameState";
import { useTimer } from "@/hooks/useTimer";
import { randomQuestions, Question } from "@/data/cities";
import GameComplete from "./GameComplete";

interface RandomGameSessionProps {
  onBack: () => void;
}

const RandomGameSession = ({ onBack }: RandomGameSessionProps) => {
  const { gameState, nextQuestion, resetGame } = useGameState();
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showComplete, setShowComplete] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [totalPlayers] = useState(4); // Default to 4 players
  
  const { timeLeft, isActive, isFinished, startTimer, resetTimer } = useTimer(7);

  // Initialize random questions on mount
  useEffect(() => {
    const shuffled = [...randomQuestions].sort(() => Math.random() - 0.5);
    setCurrentQuestions(shuffled);
  }, []);

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const progress = currentQuestions.length > 0 
    ? ((currentQuestionIndex + 1) / currentQuestions.length) * 100 
    : 0;

  const isGameComplete = currentQuestionIndex >= currentQuestions.length;

  useEffect(() => {
    if (isGameComplete && !showComplete) {
      setTimeout(() => setShowComplete(true), 500);
    }
  }, [isGameComplete, showComplete]);

  const handleNext = () => {
    setDirection(1);
    if (currentQuestion?.type === 'category') {
      resetTimer();
    }
    setCurrentQuestionIndex(prev => prev + 1);
    nextQuestion();
  };

  const handleComplete = () => {
    resetGame();
    onBack();
  };

  const handlePlayerAction = () => {
    if (currentQuestion?.type === 'category') {
      // Move to next player and restart timer
      const nextPlayer = currentPlayer >= totalPlayers ? 1 : currentPlayer + 1;
      setCurrentPlayer(nextPlayer);
      startTimer();
    } else {
      handleNext();
    }
  };

  const handleCategoryComplete = () => {
    resetTimer();
    setCurrentPlayer(1);
    handleNext();
  };

  // Auto-start timer for category questions
  useEffect(() => {
    if (currentQuestion?.type === 'category' && !isActive && !isFinished) {
      startTimer();
    }
  }, [currentQuestion, isActive, isFinished, startTimer]);

  if (showComplete) {
    return <GameComplete onContinue={handleComplete} gameState={gameState} />;
  }

  if (!currentQuestion || isGameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4">Spelet är slut!</h2>
          <Button
            onClick={handleComplete}
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-full px-8 py-3 font-bold"
          >
            Tillbaka till start
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4 pt-8"
      >
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/10 p-2 rounded-full"
        >
          ← Avsluta
        </Button>
        <div className="text-center">
          <div className="text-sm text-gray-300">
            {currentQuestionIndex + 1} / {currentQuestions.length}
          </div>
          <div className="text-xs text-gray-400">Slumpade frågor</div>
        </div>
        <div className="w-10"></div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-8"
        style={{ width: `${progress}%` }}
      />

      {/* Timer for category questions */}
      {currentQuestion.type === 'category' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-6"
        >
          <div className="text-lg text-gray-300 mb-2">Spelare {currentPlayer}s tur</div>
          <div className={`text-4xl font-bold ${timeLeft <= 3 ? 'text-red-400' : 'text-green-400'}`}>
            {timeLeft}
          </div>
          {isFinished && (
            <div className="text-red-400 text-sm mt-2">Tiden är ute!</div>
          )}
        </motion.div>
      )}

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: direction * 100, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: direction * -100, rotateY: -90 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`p-8 rounded-3xl shadow-2xl text-center ${
                currentQuestion.type === 'drink' 
                  ? 'bg-gradient-to-br from-red-500 via-pink-500 to-purple-500'
                  : 'bg-gradient-to-br from-blue-500 via-purple-500 to-green-500'
              }`}
            >
              <div className="text-4xl mb-4" style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji' }}>
                {currentQuestion.emoji}
              </div>
              <p className="text-xl font-bold leading-relaxed text-white mb-4">
                {currentQuestion.text}
              </p>
              {currentQuestion.type === 'drink' && (
                <div className="text-sm text-white/80 bg-white/20 rounded-full px-4 py-2 inline-block">
                  Drick om detta gäller dig!
                </div>
              )}
              {currentQuestion.type === 'category' && (
                <div className="text-sm text-white/80 bg-white/20 rounded-full px-4 py-2 inline-block">
                  Svara inom {timeLeft}s
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center mt-8 gap-4">
        {currentQuestion.type === 'category' ? (
          <>
            <Button
              onClick={handlePlayerAction}
              disabled={isFinished}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 rounded-full px-8 py-4 text-lg font-bold transform transition-all hover:scale-105 active:scale-95"
            >
              Svarade ✓
            </Button>
            <Button
              onClick={handleCategoryComplete}
              variant="outline"
              className="border-purple-500 text-purple-300 hover:bg-purple-500/20 rounded-full px-8 py-4 text-lg font-bold"
            >
              Nästa fråga →
            </Button>
          </>
        ) : (
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-full px-12 py-4 text-lg font-bold transform transition-all hover:scale-105 active:scale-95"
          >
            Nästa fråga →
          </Button>
        )}
      </div>
    </div>
  );
};

export default RandomGameSession;
