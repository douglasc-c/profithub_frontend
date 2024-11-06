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
        'custom-gradient': 'linear-gradient(15deg, #430298 30%, #00A9FE 170%)',
        global: "url('/images/bg/global.png')",
        bull: "url('/images/bg/bull.png')",
        finance: "url('/images/bg/finance.webp')",
        bgComeia: "url('/images/bg/bg-comeia.webp')",
      },
      fontFamily: {
        euclid: ['EuclidCircularA', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
    fontFamily: {
      sans: '"Inter var", sans-serif',
    },
  },
  plugins: [],
}
export default config
