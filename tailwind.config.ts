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
        /* ── Brand darks ─────────────────────────────────── */
        noir:    '#0A0A0A',
        void:    '#0A0A0A',
        surface: '#141414',
        panel:   '#1A1A1A',
        rim:     'rgba(255,255,255,0.07)',

        /* ── Champagne gold — primary accent ─────────────── */
        gold: {
          DEFAULT: '#D4AF37',
          light:   '#E8C572',
          deep:    '#A8842C',
          50:  '#fefbee',
          100: '#fcf5d0',
          200: '#f8e99f',
          300: '#f1d464',
          400: '#D4AF37',
          500: '#D4AF37',
          600: '#b8912b',
          700: '#8f6f1f',
          800: '#6b531a',
          900: '#3d2f0e',
        },

        /* ── Ice white — secondary accent ────────────────── */
        ice: {
          DEFAULT: '#F4F4F4',
          gray:    '#8A8A8A',
          blue:    '#BFE9FF',
          muted:   'rgba(244,244,244,0.6)',
          50:  '#fafafa',
          100: '#f4f4f4',
          200: '#e8e8e8',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#8A8A8A',
          600: '#636363',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },

        charcoal: '#333333',
      },

      fontFamily: {
        serif:   ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-syne)',     'system-ui', 'sans-serif'],
        display: ['var(--font-syne)',     'system-ui', 'sans-serif'],
        mono:    ['var(--font-space-mono)', 'Space Mono', 'monospace'],
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
        'gradient-void':  'linear-gradient(160deg, #050505 0%, #0A0A0A 50%, #050505 100%)',
        'gradient-gold':  'linear-gradient(135deg, #D4AF37 0%, #E8C572 50%, #D4AF37 100%)',
        'gradient-ice':   'linear-gradient(135deg, #BFE9FF 0%, #F4F4F4 50%, #BFE9FF 100%)',
        'shimmer-gold':   'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.10) 50%, transparent 100%)',
      },

      boxShadow: {
        'gold':       '0 0 32px rgba(212,175,55,0.25)',
        'gold-lg':    '0 0 64px rgba(212,175,55,0.35)',
        'gold-glow':  '0 0 0 1px rgba(212,175,55,0.25), 0 0 32px rgba(212,175,55,0.15)',
        'card':       '0 4px 24px rgba(0,0,0,0.5)',
        'card-hover': '0 16px 64px rgba(0,0,0,0.7)',
        'lift':       '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}

export default config
