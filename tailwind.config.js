/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        baby: {
          pink: '#FFE5E5',
          blue: '#E5F3FF',
          peach: '#FFE8D6',
          mint: '#E5FFF0',
          lavender: '#F0E5FF',
        },
      },
      fontFamily: {
        heading: ['Quicksand', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
        accent: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
