import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        karla: ['var(--font-karla)']
      },
      letterSpacing: {
        'tight-text': '-2.075px'
      },
      fillCustomGradient: ['custom-gradient'],
    },
  },
  plugins: [],
}
export default config
