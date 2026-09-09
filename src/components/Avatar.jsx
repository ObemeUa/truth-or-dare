import { motion } from 'framer-motion';

// Cyberpunk avatars with gender-specific styles and emotion animations
const AVATAR_PRESETS = {
  male: {
    idle: { emoji: '😎', glow: 'shadow-[0_0_15px_#00f0ff]', border: 'border-neon-blue' },
    happy: { emoji: '🤩', glow: 'shadow-[0_0_25px_#39ff14]', border: 'border-neon-green' },
    sad: { emoji: '😤', glow: 'shadow-[0_0_20px_#ff2d95]', border: 'border-neon-pink' },
    victory: { emoji: '👑', glow: 'shadow-[0_0_30px_#FFD700]', border: 'border-yellow-400' },
  },
  female: {
    idle: { emoji: '💅', glow: 'shadow-[0_0_15px_#ff2d95]', border: 'border-neon-pink' },
    happy: { emoji: '🥳', glow: 'shadow-[0_0_25px_#39ff14]', border: 'border-neon-green' },
    sad: { emoji: '😢', glow: 'shadow-[0_0_20px_#bf00ff]', border: 'border-neon-purple' },
    victory: { emoji: '👸', glow: 'shadow-[0_0_30px_#FFD700]', border: 'border-yellow-400' },
  }
};

const emotionVariants = {
  idle: {
    y: [0, -4, 0],
    scale: 1,
    rotate: 0,
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
  },
  happy: {
    y: [0, -12, 0, -8, 0],
    scale: [1, 1.25, 1, 1.15, 1],
    rotate: [0, -8, 8, -4, 0],
    transition: { duration: 0.8, repeat: 2 }
  },
  sad: {
    x: [0, -8, 8, -6, 6, -3, 3, 0],
    scale: [1, 0.9, 0.95, 1],
    rotate: [0, -5, 5, -3, 3, 0],
    transition: { duration: 0.6 }
  },
  victory: {
    y: [0, -15, 0],
    scale: [1, 1.3, 1],
    rotate: [0, 360],
    transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
  }
};

export default function Avatar({ gender = 'male', mood = 'idle', size = 'md', className = '' }) {
  const genderKey = gender === 'female' ? 'female' : 'male';
  const moodKey = AVATAR_PRESETS[genderKey][mood] ? mood : 'idle';
  const config = AVATAR_PRESETS[genderKey][moodKey];

  const sizeClasses = {
    sm: 'w-8 h-8 text-base border-2',
    md: 'w-12 h-12 text-2xl border-2',
    lg: 'w-16 h-16 text-3xl border-3',
    xl: 'w-24 h-24 text-5xl border-4'
  }[size] || 'w-12 h-12 text-2xl border-2';

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        key={`${genderKey}-${moodKey}`}
        variants={emotionVariants}
        animate={moodKey}
        className={`${sizeClasses} ${config.border} ${config.glow} rounded-full bg-dark-surface flex items-center justify-center backdrop-blur-md transition-all duration-300 relative overflow-visible`}
      >
        <span>{config.emoji}</span>

        {/* Emotion status badge / particle */}
        {moodKey === 'happy' && (
          <motion.span
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: [1, 0], scale: [1, 1.5], y: -20 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -top-2 -right-1 text-xs"
          >
            ✨
          </motion.span>
        )}
        {moodKey === 'sad' && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: [1, 0], y: 10 }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute -bottom-1 -right-1 text-xs"
          >
            💧
          </motion.span>
        )}
      </motion.div>

      {/* Gender indicator badge */}
      <span className="absolute -bottom-1 -left-1 bg-dark-bg border border-gray-700 rounded-full w-4 h-4 text-[9px] flex items-center justify-center leading-none">
        {genderKey === 'female' ? '♀️' : '♂️'}
      </span>
    </div>
  );
}
