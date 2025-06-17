
import { motion } from "framer-motion";

interface UnlockAnimationProps {
  onComplete: () => void;
}

const UnlockAnimation = ({ onComplete }: UnlockAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      onAnimationComplete={onComplete}
      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 1.5, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="text-4xl mb-2"
        >
          🔒
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-yellow-300 font-bold"
        >
          Låst!
        </motion.div>
        
        {/* Sparkle effects */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{
              duration: 1,
              delay: 0.2 + i * 0.1,
              ease: "easeOut"
            }}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 30}%`,
              top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 30}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default UnlockAnimation;
