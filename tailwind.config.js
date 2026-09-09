/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f0ff',
        'neon-pink': '#ff2d95',
        'neon-green': '#39ff14',
        'neon-purple': '#bf00ff',
        'dark-bg': '#0a0a0f',
        'dark-surface': '#12121a',
        'dark-card': '#1a1a2e',
      },
      fontFamily: {
        'display': ['"Orbitron"', 'sans-serif'],
        'body': ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 40px #00f0ff',
        'neon-pink': '0 0 10px #ff2d95, 0 0 20px #ff2d95, 0 0 40px #ff2d95',
        'neon-green': '0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff14',
        'neon-purple': '0 0 10px #bf00ff, 0 0 20px #bf00ff, 0 0 40px #bf00ff',
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow-blue': 'glowBlue 2s ease-in-out infinite alternate',
        'glow-pink': 'glowPink 2s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowBlue: {
          '0%': { textShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff' },
          '100%': { textShadow: '0 0 20px #00f0ff, 0 0 40px #00f0ff, 0 0 80px #00f0ff' },
        },
        glowPink: {
          '0%': { textShadow: '0 0 10px #ff2d95, 0 0 20px #ff2d95' },
          '100%': { textShadow: '0 0 20px #ff2d95, 0 0 40px #ff2d95, 0 0 80px #ff2d95' },
        },
      },
    },
  },
  plugins: [],
}
