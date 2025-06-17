
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import QuestionCard from "./QuestionCard";
import UnlockAnimation from "./UnlockAnimation";

const categories = [
  { id: "basic", name: "Grundläggande", icon: "🍺", unlocked: true, requirement: "" },
  { id: "party", name: "Fest", icon: "🎉", unlocked: true, requirement: "" },
  { id: "spicy", name: "Kryddigt", icon: "🌶️", unlocked: false, requirement: "Spela 10 rundor" },
  { id: "extreme", name: "Extrem", icon: "💀", unlocked: false, requirement: "Spela 50 rundor" },
  { id: "couples", name: "Par", icon: "💕", unlocked: false, requirement: "Spela 25 rundor" },
  { id: "friends", name: "Vänner", icon: "👫", unlocked: true, requirement: "" }
];

interface CategorySelectorProps {
  gameId: string;
  onBack: () => void;
}

const CategorySelector = ({ gameId, onBack }: CategorySelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showUnlock, setShowUnlock] = useState<string | null>(null);

  if (selectedCategory) {
    return (
      <QuestionCard
        gameId={gameId}
        categoryId={selectedCategory}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

  const handleCategoryClick = (category: any) => {
    if (category.unlocked) {
      setSelectedCategory(category.id);
    } else {
      setShowUnlock(category.id);
      setTimeout(() => setShowUnlock(null), 2000);
    }
  };

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
        <h1 className="text-xl font-bold">Välj kategori</h1>
        <div className="w-10"></div>
      </motion.div>

      {/* Categories grid */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryClick(category)}
            className="relative cursor-pointer"
          >
            <div
              className={`p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105 ${
                category.unlocked
                  ? "bg-gradient-to-br from-purple-600 to-pink-600"
                  : "bg-gradient-to-br from-gray-700 to-gray-800"
              }`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-bold mb-1">{category.name}</h3>
              
              {!category.unlocked && (
                <div className="text-xs text-gray-300 mt-2">
                  🔒 {category.requirement}
                </div>
              )}
            </div>

            {showUnlock === category.id && (
              <UnlockAnimation onComplete={() => setShowUnlock(null)} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
