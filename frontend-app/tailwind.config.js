/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,html}'],
  theme: {
    extend: {
      colors: {
        // Deep black enterprise base
        ink: {
          DEFAULT: '#05070A',
          900: '#05070A',
          800: '#0A0E14',
          700: '#11161F',
          600: '#181F2A',
          500: '#222C3A',
        },
        // Azure Blue (primary)
        azure: {
          DEFAULT: '#2E8DFF',
          50: '#EAF3FF',
          100: '#D4E7FF',
          200: '#A9CFFF',
          300: '#7DB6FF',
          400: '#529EFF',
          500: '#2E8DFF',
          600: '#1668D6',
          700: '#0F4DA3',
          800: '#0B3878',
          900: '#072449',
        },
        // AWS Orange (accent)
        aws: {
          DEFAULT: '#FF9900',
          50: '#FFF4E5',
          100: '#FFE7C2',
          200: '#FFD08A',
          300: '#FFB84D',
          400: '#FFA826',
          500: '#FF9900',
          600: '#D67E00',
          700: '#A36100',
          800: '#704300',
          900: '#3D2400',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(46, 141, 255, 0.45)',
        'glow-aws': '0 0 40px -10px rgba(255, 153, 0, 0.45)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(46,141,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(46,141,255,0.06) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(ellipse at top, rgba(46,141,255,0.15), transparent 60%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-22px) translateX(10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-line': {
          '0%': { strokeDashoffset: '40' },
          '100%': { strokeDashoffset: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        node: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.12)', opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        marquee: 'marquee 30s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        node: 'node 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
