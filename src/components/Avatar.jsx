import { motion } from 'framer-motion';

// Cyberpunk avatars with gender-specific styles and emotion animations
const AVATAR_PRESETS = {
  male: {
    idle: { emoji: '😎', glow: 'shadow-[0_0_12px_rgba(0,240,255,0.4)]', border: 'border-neon-blue' },
    happy: { emoji: '🤩', glow: 'shadow-[0_0_18px_rgba(57,255,20,0.6)]', border: 'border-neon-green' },
    sad: { emoji: '😤', glow: 'shadow-[0_0_15px_rgba(255,45,149,0.5)]', border: 'border-neon-pink' },
    victory: { emoji: '👑', glow: 'shadow-[0_0_22px_rgba(255,215,0,0.7)]', border: 'border-yellow-400' },
  },
  female: {
    idle: { emoji: '💃', glow: 'shadow-[0_0_12px_rgba(255,45,149,0.4)]', border: 'border-neon-pink' },
    happy: { emoji: '🥳', glow: 'shadow-[0_0_18px_rgba(57,255,20,0.6)]', border: 'border-neon-green' },
    sad: { emoji: '😢', glow: 'shadow-[0_0_15px_rgba(191,0,255,0.5)]', border: 'border-neon-purple' },
    victory: { emoji: '👸', glow: 'shadow-[0_0_22px_rgba(255,215,0,0.7)]', border: 'border-yellow-400' },
  }
};

const emotionVariants = {
  idle: {
    y: [0, -3, 0],
    scale: 1,
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
  },
  happy: {
    y: [0, -10, 0, -6, 0],
    scale: [1, 1.2, 1, 1.1, 1],
    rotate: [0, -6, 6, -3, 0],
    transition: { duration: 0.8, repeat: 2 }
  },
  sad: {
    x: [0, -6, 6, -4, 4, 0],
    scale: [1, 0.92, 1],
    transition: { duration: 0.6 }
  },
  victory: {
    y: [0, -12, 0],
    scale: [1, 1.25, 1],
    transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
  }
};

export default function Avatar({ gender = 'male', mood = 'idle', size = 'md', showBadge = false, className = '' }) {
  const genderKey = gender === 'female' ? 'female' : 'male';
  const moodKey = AVATAR_PRESETS[genderKey][mood] ? mood : 'idle';
  const config = AVATAR_PRESETS[genderKey][moodKey];

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm border',
    md: 'w-11 h-11 text-xl border-2',
    lg: 'w-16 h-16 text-3xl border-2',
    xl: 'w-24 h-24 text-5xl border-3'
  }[size] || 'w-11 h-11 text-xl border-2';

  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      <motion.div
        key={`${genderKey}-${moodKey}`}
        variants={emotionVariants}
        animate={moodKey}
        className={`${sizeClasses} ${config.border} ${config.glow} rounded-full bg-[#12121a] flex items-center justify-center transition-all duration-300 relative overflow-hidden`}
      >
        <span className="leading-none select-none">{config.emoji}</span>

        {/* Emotion status particle */}
        {moodKey === 'happy' && (
          <motion.span
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: [1, 0], scale: [1, 1.4], y: -15 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute top-0 right-0 text-[10px]"
          >
            ✨
          </motion.span>
        )}
        {moodKey === 'sad' && (
          <motion.span
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: [1, 0], y: 8 }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute bottom-0 right-0 text-[10px]"
          >
            💧
          </motion.span>
        )}
      </motion.div>

      {/* Optional gender indicator badge */}
      {showBadge && (
        <span className="absolute -bottom-1 -right-1 bg-[#0a0a0f] border border-gray-700 rounded-full w-4 h-4 text-[9px] flex items-center justify-center leading-none z-10 shadow-sm">
          {genderKey === 'female' ? '♀️' : '♂️'}
        </span>
      )}
    </div>
  );
}
