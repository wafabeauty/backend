import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#7B2D3E',
          'blue-light': '#9B3A50',
          'blue-dark': '#521D29',
          white: '#FFFFFF',
          'off-white': '#FDF8F4',
          sand: '#F5E0D8',
          'gray-light': '#FBF4F1',
          green: '#4E7A5F',
          'green-light': '#5E9470',
          gold: '#C9A47E',
          'gold-light': '#DEC4A8',
          slate: '#5C3D3D',
        },
      },
      fontFamily: {
        arabic: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out',
        'countdown': 'countdown linear forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        slideInRight: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(30px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #7B2D3E 0%, #9B3A50 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A47E 0%, #DEC4A8 100%)',
        'glass': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
        'blush-gradient': 'linear-gradient(135deg, #FDF8F4 0%, #F5E0D8 100%)',
        'rose-gradient': 'linear-gradient(135deg, #521D29 0%, #7B2D3E 50%, #9B3A50 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(123, 45, 62, 0.06)',
        'premium': '0 20px 40px -15px rgba(123, 45, 62, 0.18)',
        'blush': '0 8px 24px -8px rgba(201, 164, 126, 0.3)',
      }
    },
  },
  plugins: [],
}

export default config
