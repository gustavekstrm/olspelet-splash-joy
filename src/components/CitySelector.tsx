
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cities, City } from "@/data/cities";

interface CitySelectorProps {
  onCitySelect: (city: City) => void;
  onBack: () => void;
}

const CitySelector = ({ onCitySelect, onBack }: CitySelectorProps) => {
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
        <h1 className="text-2xl font-bold">Välj stad</h1>
        <div className="w-10"></div>
      </motion.div>

      {/* City cards */}
      <div className="space-y-4">
        {cities.map((city, index) => (
          <motion.div
            key={city.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCitySelect(city)}
            className="cursor-pointer"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-3xl shadow-xl transform transition-all hover:scale-105">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{city.emoji}</span>
                <div>
                  <h3 className="text-2xl font-bold text-white">{city.name}</h3>
                  <p className="text-white/80">{city.description}</p>
                  <p className="text-white/60 text-sm mt-1">
                    {city.questions.length} frågor tillgängliga
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Game mode selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <h2 className="text-xl font-bold mb-4">Eller välj spelläge</h2>
        <div
          onClick={() => onCitySelect({ id: 'never-have-i-ever', name: 'Jag har aldrig', emoji: '🤫', description: 'Klassiska "Never Have I Ever" frågor', questions: [] })}
          className="cursor-pointer"
        >
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 rounded-3xl shadow-xl transform transition-all hover:scale-105">
            <div className="flex items-center space-x-4">
              <span className="text-4xl">🤫</span>
              <div>
                <h3 className="text-2xl font-bold text-white">Jag har aldrig</h3>
                <p className="text-white/80">Klassiska "Never Have I Ever" frågor</p>
                <p className="text-white/60 text-sm mt-1">
                  Avslöja hemliga sanningar
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CitySelector;
