import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(170deg, #0646EA 5%, #A300A3 70%)',
        global: "url('/images/bg/global.png')",
        bull: "url('/images/bg/bull.png')",
      },
    },
    fontFamily: {
      sans: '"Inter var", sans-serif',
    },
  },
  plugins: [],
}
export default config
