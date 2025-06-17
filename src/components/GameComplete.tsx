
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GameState } from "@/hooks/useGameState";

interface GameCompleteProps {
  onContinue: () => void;
  gameState: GameState;
}

const GameComplete = ({ onContinue, gameState }: GameCompleteProps) => {
  const newlyUnlockedAchievements = gameState.achievements.filter(
    a => a.unlocked && a.currentProgress === a.requirement
  );

  const getRandomCompleteMessage = () => {
    const messages = [
      "Fantastiskt spelat! 🎉",
      "Ni har klarat det! 🏆", 
      "Vilken show! 👏",
      "Legendariskt! ⭐",
      "Mästerligt gjort! 💪"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getRandomStats = () => {
    return [
      { label: "Rundor spelade", value: gameState.totalRounds.toString(), emoji: "🎮" },
      { label: "Städer utforskade", value: gameState.citiesPlayed.length.toString(), emoji: "🗺️" },
      { label: "Upplåsta prestationer", value: gameState.achievements.filter(a => a.unlocked).length.toString(), emoji: "🏅" }
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6 flex flex-col items-center justify-center">
      {/* Celebration animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="text-center mb-8"
      >
        <div className="text-8xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          {getRandomCompleteMessage()}
        </h1>
        <p className="text-gray-300">
          {gameState.gameMode === 'city' 
            ? `${gameState.selectedCity?.name} spelet avklarat!`
            : 'Jag har aldrig - avklarat!'}
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm space-y-3 mb-8"
      >
        {getRandomStats().map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{stat.emoji}</span>
              <span className="text-gray-300">{stat.label}</span>
            </div>
            <span className="text-xl font-bold">{stat.value}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* New achievements */}
      {newlyUnlockedAchievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-sm mb-8"
        >
          <h2 className="text-xl font-bold mb-4 text-center">🏆 Nya prestationer!</h2>
          <div className="space-y-2">
            {newlyUnlockedAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-3 rounded-2xl"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{achievement.emoji}</span>
                  <div>
                    <div className="font-bold text-yellow-300">{achievement.name}</div>
                    <div className="text-sm text-gray-300">{achievement.description}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          onClick={onContinue}
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-full px-12 py-4 text-lg font-bold transform transition-all hover:scale-105 active:scale-95"
        >
          Fortsätt spela! 🎮
        </Button>
      </motion.div>
    </div>
  );
};

export default GameComplete;
