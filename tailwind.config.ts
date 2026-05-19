import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ice: {
          50:  '#f0fbff',
          100: '#e0f7fe',
          200: '#baf0fd',
          300: '#7ee4fb',
          400: '#38d0f5',
          500: '#00D9FF',
          600: '#00afd1',
          700: '#0087a8',
          800: '#006e8a',
          900: '#005b72',
        },
        gold: {
          50:  '#fffbeb',
          100: '#fff3c6',
          200: '#ffe480',
          300: '#FFD700',
          400: '#f5c400',
          500: '#d4a900',
          600: '#a07800',
          700: '#7a5a00',
          800: '#5c4300',
          900: '#3d2d00',
        },
        charcoal: '#333333',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shimmer':      'shimmer 2.5s linear infinite',
        'float':        'float 6s ease-in-out infinite',
        'pulse-gold':   'pulseGold 3s ease-in-out infinite',
        'glow':         'glow 2s ease-in-out infinite alternate',
        'particle':     'particle 8s linear infinite',
        'fade-up':      'fadeUp 0.6s ease-out forwards',
        'fade-in':      'fadeIn 0.4s ease-out forwards',
        'scale-in':     'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,215,0,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(255,215,0,0.7)' },
        },
        glow: {
          '0%':   { textShadow: '0 0 10px rgba(0,217,255,0.5)' },
          '100%': { textShadow: '0 0 30px rgba(0,217,255,0.9), 0 0 60px rgba(0,217,255,0.4)' },
        },
        particle: {
          '0%':   { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '1' },
          '100%': { transform: 'translateY(-100px) rotate(720deg)', opacity: '0' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-ice':       'linear-gradient(135deg, #ffffff 0%, #e0f7fe 40%, #00D9FF 100%)',
        'gradient-gold':      'linear-gradient(135deg, #FFD700 0%, #f5c400 50%, #d4a900 100%)',
        'gradient-hero':      'linear-gradient(160deg, #ffffff 0%, #f0fbff 30%, #e0f7fe 60%, #baf0fd 100%)',
        'shimmer-gold':       'linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.4) 50%, transparent 100%)',
        'shimmer-ice':        'linear-gradient(90deg, transparent 0%, rgba(0,217,255,0.4) 50%, transparent 100%)',
      },
      boxShadow: {
        'ice':       '0 0 30px rgba(0,217,255,0.25)',
        'ice-lg':    '0 0 60px rgba(0,217,255,0.35)',
        'gold':      '0 0 30px rgba(255,215,0,0.25)',
        'gold-lg':   '0 0 60px rgba(255,215,0,0.4)',
        'product':   '0 8px 32px rgba(0,0,0,0.08)',
        'product-hover': '0 20px 60px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}

export default config
