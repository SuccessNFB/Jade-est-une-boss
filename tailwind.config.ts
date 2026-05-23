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
        /* Brand darks */
        void:    '#08090E',
        surface: '#0E0F16',
        panel:   '#141622',
        rim:     'rgba(255,255,255,0.07)',

        /* Ice — primary accent */
        ice: {
          50:  '#f0fbff',
          100: '#e0f7fe',
          200: '#baf0fd',
          300: '#7ee4fb',
          400: '#38d0f5',
          500: '#00D9FF',
          600: '#00b8d9',
          700: '#0090a8',
          800: '#006e8a',
          900: '#005b72',
        },

        /* Gold — secondary accent (richer) */
        gold: {
          50:  '#fdf8ed',
          100: '#f9edcc',
          200: '#f2d88a',
          300: '#E8C878',
          400: '#C9A84C',
          500: '#a8892d',
          600: '#876b1e',
          700: '#634f16',
          800: '#42340e',
          900: '#221b08',
        },

        charcoal: '#333333',
      },

      fontFamily: {
        serif:   ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-inter)',    'system-ui', 'sans-serif'],
        display: ['var(--font-barlow)',   'system-ui', 'sans-serif'],
      },

      fontSize: {
        '2xs': ['10px', { lineHeight: '1.4', letterSpacing: '0.05em' }],
      },

      letterSpacing: {
        superwide: '0.25em',
        ultrawide: '0.35em',
      },

      animation: {
        'shimmer':    'shimmer 3s linear infinite',
        'float':      'float 7s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
        'fade-up':    'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'scale-in':   'scaleIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'marquee':    'marquee 32s linear infinite',
        'spin-slow':  'spin 8s linear infinite',
      },

      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-10px) rotate(1deg)' },
          '66%':      { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        glowPulse: {
          '0%':   { opacity: '0.5', filter: 'blur(60px)' },
          '100%': { opacity: '1',   filter: 'blur(80px)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },

      backgroundImage: {
        'gradient-void':  'linear-gradient(160deg, #08090E 0%, #0D0E18 50%, #08090E 100%)',
        'gradient-ice':   'linear-gradient(135deg, #00D9FF 0%, #80EEFF 50%, #00D9FF 100%)',
        'gradient-gold':  'linear-gradient(135deg, #C9A84C 0%, #E8C878 50%, #C9A84C 100%)',
        'shimmer-ice':    'linear-gradient(90deg, transparent 0%, rgba(0,217,255,0.08) 50%, transparent 100%)',
        'shimmer-gold':   'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.12) 50%, transparent 100%)',
      },

      boxShadow: {
        'ice':        '0 0 32px rgba(0,217,255,0.2)',
        'ice-lg':     '0 0 64px rgba(0,217,255,0.3)',
        'ice-glow':   '0 0 0 1px rgba(0,217,255,0.2), 0 0 32px rgba(0,217,255,0.15)',
        'gold':       '0 0 32px rgba(201,168,76,0.2)',
        'gold-lg':    '0 0 64px rgba(201,168,76,0.3)',
        'card':       '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 12px 64px rgba(0,0,0,0.6)',
        'lift':       '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
      },

      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}

export default config
