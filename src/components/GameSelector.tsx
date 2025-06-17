
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import CategorySelector from "./CategorySelector";

const games = [
  {
    id: "opus",
    name: "Opus",
    icon: "🎯",
    description: "Klassiska dryckesregler",
    color: "from-pink-500 to-red-500"
  },
  {
    id: "never-have-i-ever",
    name: "Never Have I Ever",
    icon: "🤫",
    description: "Avslöja hemlighetner",
    color: "from-purple-500 to-blue-500"
  },
  {
    id: "truth-or-dare",
    name: "Truth or Dare",
    icon: "🎪",
    description: "Sanning eller konsekvens",
    color: "from-green-500 to-teal-500"
  },
  {
    id: "orebro-spelet",
    name: "Örebro-spelet",
    icon: "🏰",
    description: "Lokala referenser",
    color: "from-orange-500 to-yellow-500"
  }
];

interface GameSelectorProps {
  onBack: () => void;
}

const GameSelector = ({ onBack }: GameSelectorProps) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  if (selectedGame) {
    return (
      <CategorySelector
        gameId={selectedGame}
        onBack={() => setSelectedGame(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6">
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
        <h1 className="text-2xl font-bold">Välj spel</h1>
        <div className="w-10"></div>
      </motion.div>

      {/* Games scroll view */}
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedGame(game.id)}
            className="flex-shrink-0 w-64 cursor-pointer"
          >
            <div className={`bg-gradient-to-br ${game.color} p-6 rounded-3xl shadow-xl transform transition-all hover:scale-105`}>
              <div className="text-4xl mb-4">{game.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{game.name}</h3>
              <p className="text-white/80 text-sm">{game.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default GameSelector;
