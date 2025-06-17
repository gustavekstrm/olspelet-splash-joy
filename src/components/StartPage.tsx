
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useGameState } from "@/hooks/useGameState";
import CitySelector from "./CitySelector";
import GameSession from "./GameSession";
import RandomGameSession from "./RandomGameSession";
import StatsPage from "./StatsPage";
import { City } from "@/data/cities";

const StartPage = () => {
  const [currentView, setCurrentView] = useState("start");
  const { selectCity, setGameMode, startGame } = useGameState();

  const handleCitySelect = (city: City) => {
    if (city.id === 'never-have-i-ever') {
      setGameMode('never-have-i-ever');
    } else {
      selectCity(city);
      setGameMode('city');
    }
    startGame();
    setCurrentView("game");
  };

  const handleRandomGameSelect = () => {
    setCurrentView("random-game");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "city-selector":
        return (
          <CitySelector
            onCitySelect={handleCitySelect}
            onRandomGameSelect={handleRandomGameSelect}
            onBack={() => setCurrentView("start")}
          />
        );
      case "game":
        return (
          <GameSession
            onBack={() => setCurrentView("start")}
          />
        );
      case "random-game":
        return (
          <RandomGameSession
            onBack={() => setCurrentView("start")}
          />
        );
      case "stats":
        return <StatsPage onBack={() => setCurrentView("start")} />;
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6 relative overflow-hidden"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-pink-500 rounded-full opacity-30"
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8 text-center"
            >
              <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                <span style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji' }}>🍺</span>
              </h1>
              <h2 className="text-4xl font-bold mt-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Ölspelet
              </h2>
              <p className="text-gray-300 mt-2">Det roligaste drickspelet!</p>
            </motion.div>

            {/* Menu buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 w-full max-w-xs"
            >
              <Button
                onClick={() => setCurrentView("city-selector")}
                className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 border-0 rounded-2xl shadow-lg transform transition-all hover:scale-105 active:scale-95"
              >
                <span style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji' }}>🎮</span> Starta spel
              </Button>
              
              <Button
                onClick={() => setCurrentView("stats")}
                variant="outline"
                className="w-full py-6 text-lg font-semibold border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 rounded-2xl transform transition-all hover:scale-105 active:scale-95"
              >
                <span style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji' }}>📊</span> Statistik
              </Button>
              
              <Button
                variant="outline"
                className="w-full py-6 text-lg font-semibold border-2 border-blue-500 text-blue-300 hover:bg-blue-500/20 rounded-2xl transform transition-all hover:scale-105 active:scale-95"
              >
                <span style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji' }}>ℹ️</span> Om spelet
              </Button>
            </motion.div>
          </motion.div>
        );
    }
  };

  return renderCurrentView();
};

export default StartPage;
