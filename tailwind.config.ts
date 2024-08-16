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
        global: "url('/images/bg/global.png')",
      },
    },
    fontFamily: {
      sans: '"Inter var", sans-serif',
    },
  },
  plugins: [],
}
export default config
