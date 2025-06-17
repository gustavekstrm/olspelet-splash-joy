
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const sampleQuestions = [
  "🍺 Drick om du någonsin har somnat på en fest!",
  "🎉 Alla som har dansat på ett bord dricker!",
  "🤔 Drick om du har glömt var du parkerat bilen!",
  "😂 Den som skrattar sist dricker dubbelt!",
  "🎯 Peka på någon som ska dricka istället för dig!",
  "🍻 Alla dricker - Skål!"
];

interface QuestionCardProps {
  gameId: string;
  categoryId: string;
  onBack: () => void;
}

const QuestionCard = ({ gameId, categoryId, onBack }: QuestionCardProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextQuestion = () => {
    setDirection(1);
    setCurrentQuestionIndex((prev) => (prev + 1) % sampleQuestions.length);
  };

  const prevQuestion = () => {
    setDirection(-1);
    setCurrentQuestionIndex((prev) => (prev - 1 + sampleQuestions.length) % sampleQuestions.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 pt-8"
      >
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/10 p-2 rounded-full"
        >
          ← Tillbaka
        </Button>
        <div className="text-sm text-gray-300">
          {currentQuestionIndex + 1} / {sampleQuestions.length}
        </div>
      </motion.div>

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: direction * 100, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: direction * -100, rotateY: -90 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-8 rounded-3xl shadow-2xl text-center"
            >
              <p className="text-xl font-bold leading-relaxed">
                {sampleQuestions[currentQuestionIndex]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Button
          onClick={prevQuestion}
          variant="outline"
          className="border-purple-500 text-purple-300 hover:bg-purple-500/20 rounded-full px-6"
        >
          ← Förra
        </Button>
        
        <Button
          onClick={nextQuestion}
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-full px-8 py-3 font-bold"
        >
          Nästa fråga →
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
