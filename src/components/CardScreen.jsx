import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

export default function CardScreen({ question, choice, playerName, onResult }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const isTruth = choice === 'truth';
  const accentColor = isTruth ? 'neon-blue' : 'neon-pink';
  const label = isTruth ? 'ПРАВДА' : 'ДЕЙСТВИЕ';
  const emoji = isTruth ? '🔮' : '⚡';
  const points = isTruth ? 1 : 2;

  useEffect(() => {
    const flipTimer = setTimeout(() => setIsFlipped(true), 400);
    const btnTimer = setTimeout(() => setShowButtons(true), 1200);
    return () => {
      clearTimeout(flipTimer);
      clearTimeout(btnTimer);
    };
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-5 py-8"
    >
      {/* ─── HEADER ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <p className="text-gray-500 font-body text-sm mb-1">{playerName}</p>
        <p className={`font-display text-sm tracking-[0.2em] uppercase ${
          isTruth ? 'text-neon-blue/70' : 'text-neon-pink/70'
        }`}>
          {label} — {points === 1 ? '+1 очко' : '+2 очка'}
        </p>
      </motion.div>

      {/* ─── CARD ─── */}
      <div className="perspective-1000 w-full max-w-sm" style={{ height: '320px' }}>
        <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
          {/* Front (question mark side) */}
          <div className={`card-face card-front border ${
            isTruth ? 'border-neon-blue/30' : 'border-neon-pink/30'
          } flex-col gap-4`}>
            <span className="text-6xl">{emoji}</span>
            <span className={`font-display text-2xl font-bold ${
              isTruth ? 'neon-text-blue' : 'neon-text-pink'
            }`}>?</span>
          </div>

          {/* Back (question side) */}
          <div className={`card-face card-back border ${
            isTruth ? 'border-neon-blue/30' : 'border-neon-pink/30'
          } flex-col p-6`}>
            <span className="text-3xl mb-4">{emoji}</span>
            <p className="text-white font-body text-base sm:text-lg leading-relaxed text-center">
              {question}
            </p>
            <span className={`mt-4 font-display text-[10px] tracking-[0.2em] uppercase ${
              isTruth ? 'text-neon-blue/40' : 'text-neon-pink/40'
            }`}>
              {label}
            </span>
          </div>
        </div>
      </div>

      {/* ─── ACTION BUTTONS ─── */}
      {showButtons && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="flex gap-3 mt-10 w-full max-w-sm"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onResult(true)}
            className="flex-1 btn-neon-green rounded-xl py-4 font-display text-sm sm:text-base font-bold tracking-wider"
          >
            ✅ Выполнено
            <span className="block text-[10px] text-neon-green/50 font-body mt-0.5">+{points}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onResult(false)}
            className="flex-1 bg-dark-surface/80 border border-gray-700 text-gray-400 rounded-xl py-4 font-display text-sm sm:text-base font-bold tracking-wider hover:border-gray-500 hover:text-gray-300 transition-all"
          >
            😰 Сдаюсь
            <span className="block text-[10px] text-gray-600 font-body mt-0.5">0 очков</span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
