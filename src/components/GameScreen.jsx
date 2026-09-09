import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from './Avatar';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function GameScreen({ players, currentPlayer, currentPlayerIndex, targetScore = 40, onChoice, onEndGame }) {
  const [showEndModal, setShowEndModal] = useState(false);

  // Sort players by score for leaderboard
  const sortedPlayers = [...players]
    .map((p, i) => ({ ...p, originalIndex: i }))
    .sort((a, b) => b.score - a.score);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen min-h-[100dvh] flex flex-col px-5 py-6 relative"
    >
      {/* ─── TOP BAR WITH END GAME BUTTON ─── */}
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-4">
        <span className="text-neon-blue/40 font-display text-[10px] tracking-[0.2em] uppercase">
          Neon Party
        </span>
        <button
          onClick={() => setShowEndModal(true)}
          className="text-gray-500 hover:text-neon-pink text-xs font-body border border-gray-800 hover:border-neon-pink/40 px-3 py-1.5 rounded-lg transition-all backdrop-blur-sm"
        >
          🛑 Завершить игру
        </button>
      </motion.div>

      {/* ─── LEADERBOARD ─── */}
      <motion.div variants={itemVariants} className="mb-6">
        <h3 className="text-gray-500 font-display text-[10px] tracking-[0.25em] uppercase mb-3 text-center">
          Таблица лидеров
        </h3>
        <div className="flex flex-wrap justify-center gap-2.5 max-h-32 overflow-y-auto leaderboard-scroll">
          {sortedPlayers.map((player, index) => {
            const pct = Math.min(100, Math.round((player.score / targetScore) * 100));
            return (
              <div
                key={player.name}
                className={`score-badge rounded-xl px-3 py-2 flex flex-col justify-center min-w-[110px] text-sm font-body ${
                  player.originalIndex === currentPlayerIndex
                    ? 'border-neon-blue/60 ring-1 ring-neon-blue/30'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 truncate max-w-[95px]">
                    <Avatar gender={player.gender} mood={player.mood || 'idle'} size="sm" />
                    <span className={`${
                      player.originalIndex === currentPlayerIndex ? 'text-neon-blue font-semibold' : 'text-gray-300'
                    } text-xs truncate`}>
                      {player.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {index === 0 && sortedPlayers.length > 1 && player.score > 0 && (
                      <span className="text-yellow-400 text-xs">👑</span>
                    )}
                    <span className="text-neon-purple font-display text-xs font-bold">
                      {player.score}
                    </span>
                  </div>
                </div>
                {/* Mini progress bar */}
                <div className="w-full bg-gray-800/80 rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-neon-blue to-neon-pink h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ─── CURRENT PLAYER ─── */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          variants={itemVariants}
          className="text-center mb-6 w-full max-w-sm flex flex-col items-center"
        >
          <p className="text-gray-500 font-body text-sm mb-3 tracking-wider uppercase">Сейчас ходит</p>
          
          {/* Animated Large Avatar */}
          <Avatar
            gender={currentPlayer?.gender}
            mood={currentPlayer?.mood || 'idle'}
            size="xl"
            className="mb-3"
          />

          <motion.h2
            key={currentPlayer?.name}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-black neon-text-blue animate-glow-blue mb-4"
          >
            {currentPlayer?.name}
          </motion.h2>

          {/* ─── MAIN PROGRESS BAR ─── */}
          <div className="bg-dark-surface/90 border border-neon-blue/30 rounded-2xl p-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.08)] w-full">
            <div className="flex justify-between items-center text-xs font-body mb-2">
              <span className="text-gray-400">Прогресс игрока</span>
              <span className="font-display font-bold text-neon-blue">
                {currentPlayer?.score || 0} / {targetScore} <span className="text-gray-500 font-normal">очков</span>
              </span>
            </div>

            {/* Glowing neon progress track */}
            <div className="w-full bg-gray-900 rounded-full h-3 p-0.5 border border-gray-800 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.round(((currentPlayer?.score || 0) / targetScore) * 100))}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-full shadow-[0_0_12px_#00f0ff] relative"
              />
            </div>

            <p className="text-right text-[10px] text-gray-500 font-body mt-1.5">
              {targetScore - (currentPlayer?.score || 0) > 0 
                ? `Осталось ${targetScore - (currentPlayer?.score || 0)} очк. до победы` 
                : 'Победа! 🎉'}
            </p>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-gray-400 font-body text-base sm:text-lg mb-6 text-center"
        >
          Что выбираешь?
        </motion.p>

        {/* ─── CHOICE BUTTONS ─── */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(0, 240, 255, 0.4), 0 0 50px rgba(0, 240, 255, 0.2)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChoice('truth')}
            className="flex-1 btn-neon-blue rounded-2xl py-6 sm:py-8 font-display text-xl sm:text-2xl font-bold tracking-wider relative overflow-hidden group"
          >
            <span className="relative z-10">🔮 ПРАВДА</span>
            <span className="block text-[10px] text-neon-blue/50 font-body mt-1 tracking-normal relative z-10">+1 очко</span>
            <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(255, 45, 149, 0.4), 0 0 50px rgba(255, 45, 149, 0.2)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChoice('dare')}
            className="flex-1 btn-neon-pink rounded-2xl py-6 sm:py-8 font-display text-xl sm:text-2xl font-bold tracking-wider relative overflow-hidden group"
          >
            <span className="relative z-10">⚡ ДЕЙСТВИЕ</span>
            <span className="block text-[10px] text-neon-pink/50 font-body mt-1 tracking-normal relative z-10">+2 очка</span>
            <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </motion.div>
      </div>

      {/* ─── SCORE TO WIN ─── */}
      <motion.p
        variants={itemVariants}
        className="text-center text-gray-600 font-body text-xs mt-6 tracking-wider"
      >
        До победы: {targetScore} очков
      </motion.p>

      {/* ─── END GAME MODAL ─── */}
      <AnimatePresence>
        {showEndModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-5"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-dark-surface border border-neon-pink/40 rounded-2xl p-6 w-full max-w-sm text-center shadow-[0_0_30px_rgba(255,45,149,0.2)]"
            >
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Завершить игру?
              </h3>
              <p className="text-gray-400 font-body text-sm mb-6">
                Выберите, как завершить текущую партию:
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowEndModal(false);
                    onEndGame('finish');
                  }}
                  className="btn-neon-pink rounded-xl py-3 font-display text-sm font-bold tracking-wider"
                >
                  🏆 Подвести итоги (объявить лидера)
                </button>

                <button
                  onClick={() => {
                    setShowEndModal(false);
                    onEndGame('reset');
                  }}
                  className="bg-dark-bg border border-gray-700 text-gray-300 hover:border-gray-500 rounded-xl py-3 font-display text-sm font-bold tracking-wider transition-all"
                >
                  🏠 Главное меню (без итогов)
                </button>

                <button
                  onClick={() => setShowEndModal(false)}
                  className="text-gray-500 hover:text-gray-300 font-body text-xs mt-2 py-1"
                >
                  Продолжить игру
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
