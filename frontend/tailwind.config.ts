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
          blue: '#0B192C',
          'blue-light': '#1A365D',
          'blue-dark': '#060E18',
          white: '#FFFFFF',
          'off-white': '#FAFAFA',
          sand: '#EFEBE3',
          'gray-light': '#F5F5F5',
          green: '#0E4D31',
          'green-light': '#157047',
          gold: '#D4AF37',
          'gold-light': '#E8D288',
          slate: '#334155',
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
        'premium-gradient': 'linear-gradient(135deg, #0B192C 0%, #1A365D 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #E8D288 100%)',
        'glass': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(11, 25, 44, 0.05)',
        'premium': '0 20px 40px -15px rgba(11, 25, 44, 0.15)',
      }
    },
  },
  plugins: [],
}

export default config
