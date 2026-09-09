import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Avatar from './Avatar';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15 } }
};

export default function VictoryScreen({ winner, players, onPlayAgain, onNewGame }) {
  useEffect(() => {
    // Launch confetti burst
    const neonColors = ['#00f0ff', '#ff2d95', '#39ff14', '#bf00ff', '#FFD700'];
    const duration = 6000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: neonColors,
        zIndex: 9999,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: neonColors,
        zIndex: 9999,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };

    // Initial big burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: neonColors,
      zIndex: 9999,
    });

    frame();
  }, []);

  // Sort final scores
  const finalScores = [...players].sort((a, b) => b.score - a.score);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-5 py-8"
    >
      {/* ─── WINNER AVATAR & TROPHY ─── */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center mb-4 relative"
      >
        <div className="absolute -top-6 text-4xl animate-bounce">👑</div>
        <Avatar
          gender={winner?.gender}
          mood="victory"
          size="xl"
          className="mb-2 mt-4"
        />
      </motion.div>

      {/* ─── WINNER NAME ─── */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <p className="text-gray-400 font-body text-xs mb-1 tracking-wider uppercase">Победитель вечеринки</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black neon-text-pink animate-glow-pink mb-2">
          {winner?.name}
        </h1>
        <p className="font-display text-xl text-neon-purple font-bold">
          {winner?.score} очков 🎯
        </p>
      </motion.div>

      {/* ─── FINAL SCOREBOARD ─── */}
      <motion.div variants={itemVariants} className="w-full max-w-xs mb-8">
        <h3 className="text-gray-500 font-display text-[10px] tracking-[0.25em] uppercase mb-3 text-center">
          Финальный счёт
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto leaderboard-scroll pr-1">
          {finalScores.map((player, index) => {
            const isWinner = index === 0;
            const mood = isWinner ? 'victory' : 'sad';
            return (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`flex items-center justify-between px-3 py-2 rounded-xl ${
                  isWinner
                    ? 'bg-neon-pink/10 border border-neon-pink/40 shadow-[0_0_15px_rgba(255,45,149,0.15)]'
                    : 'bg-dark-surface/50 border border-gray-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-xs font-bold text-gray-500 min-w-[20px]">
                    {isWinner ? '👑' : `#${index + 1}`}
                  </span>
                  <Avatar gender={player.gender} mood={mood} size="sm" />
                  <span className={`font-body text-sm font-medium ${
                    isWinner ? 'text-neon-pink font-bold' : 'text-gray-400'
                  }`}>
                    {player.name}
                  </span>
                </div>
                <span className={`font-display text-sm font-bold ${
                  isWinner ? 'text-neon-pink' : 'text-gray-500'
                }`}>
                  {player.score}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ─── BUTTONS ─── */}
      <motion.div variants={itemVariants} className="flex flex-col gap-3 w-full max-w-xs">
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(57, 255, 20, 0.4)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onPlayAgain}
          className="btn-neon-green rounded-xl py-4 font-display text-base font-bold tracking-wider"
        >
          🔄 Играть заново
          <span className="block text-[10px] text-neon-green/50 font-body mt-0.5">тот же состав</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNewGame}
          className="bg-dark-surface/80 border border-gray-700 text-gray-400 rounded-xl py-4 font-display text-base font-bold tracking-wider hover:border-gray-500 hover:text-gray-300 transition-all"
        >
          🆕 Новая игра
          <span className="block text-[10px] text-gray-600 font-body mt-0.5">полный сброс</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
