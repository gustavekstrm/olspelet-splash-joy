
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useGameState } from "@/hooks/useGameState";
import GameComplete from "./GameComplete";

interface GameSessionProps {
  onBack: () => void;
}

const GameSession = ({ onBack }: GameSessionProps) => {
  const { gameState, nextQuestion, getCurrentQuestion, isGameComplete, resetGame } = useGameState();
  const [direction, setDirection] = useState(1);
  const [showComplete, setShowComplete] = useState(false);

  const currentQuestion = getCurrentQuestion();
  const progress = gameState.currentQuestions.length > 0 
    ? ((gameState.currentQuestionIndex + 1) / gameState.currentQuestions.length) * 100 
    : 0;

  useEffect(() => {
    if (isGameComplete() && !showComplete) {
      setTimeout(() => setShowComplete(true), 500);
    }
  }, [isGameComplete, showComplete]);

  const handleNext = () => {
    setDirection(1);
    nextQuestion();
  };

  const handleComplete = () => {
    resetGame();
    onBack();
  };

  if (showComplete) {
    return <GameComplete onContinue={handleComplete} gameState={gameState} />;
  }

  if (!currentQuestion) {
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
            {gameState.currentQuestionIndex + 1} / {gameState.currentQuestions.length}
          </div>
          <div className="text-xs text-gray-400">
            {gameState.gameMode === 'city' ? gameState.selectedCity?.name : 'Jag har aldrig'}
          </div>
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

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={gameState.currentQuestionIndex}
              initial={{ opacity: 0, x: direction * 100, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: direction * -100, rotateY: -90 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-8 rounded-3xl shadow-2xl text-center"
            >
              <div className="text-4xl mb-4">{currentQuestion.emoji}</div>
              <p className="text-xl font-bold leading-relaxed text-white">
                {currentQuestion.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={handleNext}
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-full px-12 py-4 text-lg font-bold transform transition-all hover:scale-105 active:scale-95"
        >
          {isGameComplete() ? "Avsluta spel" : "Nästa fråga"} →
        </Button>
      </div>
    </div>
  );
};

export default GameSession;
