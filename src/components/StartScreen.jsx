import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function StartScreen({ onStart }) {
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const [adultMode, setAdultMode] = useState(false);
  const inputRef = useRef(null);

  const addPlayer = () => {
    const name = playerName.trim();
    if (name && name.length <= 15 && !players.includes(name) && players.length < 10) {
      setPlayers([...players, name]);
      setPlayerName('');
      inputRef.current?.focus();
    }
  };

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addPlayer();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-5 py-8"
    >
      {/* ─── NEON TITLE ─── */}
      <motion.div variants={itemVariants} className="text-center mb-10">
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black neon-text-blue animate-glow-blue mb-2">
          ПРАВДА
        </h1>
        <p className="font-display text-xl sm:text-2xl text-neon-pink/70 my-2 tracking-widest">или</p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black neon-text-pink animate-glow-pink">
          ДЕЙСТВИЕ
        </h1>
        <p className="text-gray-500 font-body text-xs mt-4 tracking-[0.3em] uppercase">Neon Party Edition</p>
      </motion.div>

      {/* ─── PLAYER INPUT ─── */}
      <motion.div variants={itemVariants} className="w-full max-w-sm mb-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Имя игрока..."
            maxLength={15}
            className="flex-1 bg-dark-surface border border-neon-blue/30 rounded-xl px-4 py-3.5 text-white font-body placeholder-gray-600 focus:outline-none focus:border-neon-blue focus:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addPlayer}
            disabled={!playerName.trim() || players.length >= 10}
            className="btn-neon-blue px-5 py-3.5 rounded-xl font-display text-lg font-bold disabled:opacity-20 disabled:cursor-not-allowed"
          >
            +
          </motion.button>
        </div>
        {players.length >= 10 && (
          <p className="text-neon-pink/60 text-xs font-body mt-1 ml-1">Максимум 10 игроков</p>
        )}
      </motion.div>

      {/* ─── PLAYER LIST ─── */}
      <motion.div variants={itemVariants} className="w-full max-w-sm mb-6 space-y-2 max-h-48 overflow-y-auto leaderboard-scroll">
        {players.map((name, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex items-center justify-between bg-dark-surface/80 border border-gray-800 rounded-xl px-4 py-2.5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-neon-blue/50 font-display text-xs font-bold">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-white font-body text-sm">{name}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => removePlayer(index)}
              className="text-gray-600 hover:text-red-400 transition-colors text-lg leading-none"
            >
              ✕
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── 18+ TOGGLE ─── */}
      <motion.label variants={itemVariants} className="flex items-center gap-4 cursor-pointer mb-10 select-none">
        <div className="relative" onClick={(e) => e.preventDefault()}>
          <input
            type="checkbox"
            checked={adultMode}
            onChange={(e) => setAdultMode(e.target.checked)}
            className="sr-only peer"
          />
          <div
            onClick={() => setAdultMode(!adultMode)}
            className={`w-14 h-7 rounded-full transition-all duration-300 flex items-center px-1 cursor-pointer ${
              adultMode
                ? 'bg-neon-pink/30 border-neon-pink shadow-[0_0_10px_rgba(255,45,149,0.3)] justify-end'
                : 'bg-gray-800 border-gray-700 justify-start'
            } border`}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`w-5 h-5 rounded-full shadow-md ${
                adultMode ? 'bg-neon-pink' : 'bg-gray-500'
              }`}
            />
          </div>
        </div>
        <span className={`font-body text-sm transition-colors ${
          adultMode ? 'text-neon-pink' : 'text-gray-500'
        }`}>
          🔞 Категория 18+
        </span>
      </motion.label>

      {/* ─── START BUTTON ─── */}
      {players.length >= 2 ? (
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 45, 149, 0.5), 0 0 60px rgba(191, 0, 255, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStart(players, adultMode)}
          className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-pink bg-[length:200%_100%] animate-pulse-neon text-white font-display text-lg sm:text-xl tracking-wider px-10 py-4 rounded-2xl shadow-neon-pink"
        >
          🎉 НАЧАТЬ ВЕЧЕРИНКУ
        </motion.button>
      ) : (
        <motion.p variants={itemVariants} className="text-gray-600 font-body text-sm">
          Добавьте минимум 2 игрока для начала
        </motion.p>
      )}
    </motion.div>
  );
}
