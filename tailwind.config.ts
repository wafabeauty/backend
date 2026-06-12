import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8fafc',  // Crisp clinical white/gray
          100: '#f1f5f9', // Soft clinical background
          500: '#3b82f6', // Medical/Trust Blue (Primary CTA)
          600: '#2563eb', // Deeper Medical Blue
          900: '#0f172a', // Deep slate for high-contrast text (Authority)
          accent: '#10b981', // Clinical Green (for success/verification)
        }
      },
    },
  },
  plugins: [],
};
export default config;