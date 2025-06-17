
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const stats = [
  { label: "Rundor spelade", value: "42", icon: "🎮" },
  { label: "Mest spelade spel", value: "Never Have I Ever", icon: "🏆" },
  { label: "Upplåsta kategorier", value: "6/12", icon: "🔓" },
  { label: "Total speltid", value: "3h 24min", icon: "⏱️" }
];

const achievements = [
  { name: "Första steget", desc: "Spela ditt första spel", unlocked: true },
  { name: "Party animal", desc: "Spela 50 rundor", unlocked: false },
  { name: "Utforskare", desc: "Prova alla speltyper", unlocked: true },
  { name: "Mästare", desc: "Lås upp alla kategorier", unlocked: false }
];

interface StatsPageProps {
  onBack: () => void;
}

const StatsPage = ({ onBack }: StatsPageProps) => {
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
        <h1 className="text-2xl font-bold">Statistik</h1>
        <div className="w-10"></div>
      </motion.div>

      {/* Stats cards */}
      <div className="space-y-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 rounded-2xl border border-purple-500/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-gray-300">{stat.label}</span>
              </div>
              <span className="text-xl font-bold text-white">{stat.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-bold mb-4">🏅 Prestationer</h2>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`p-4 rounded-2xl border ${
                achievement.unlocked
                  ? "bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/30"
                  : "bg-gray-800/50 border-gray-700/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">{achievement.name}</h3>
                  <p className="text-sm text-gray-400">{achievement.desc}</p>
                </div>
                <div className="text-2xl">
                  {achievement.unlocked ? "✅" : "🔒"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StatsPage;
