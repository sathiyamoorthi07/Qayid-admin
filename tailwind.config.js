/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['inter', 'sans-serif'],
        body: ['inter', 'sans-serif'],
      },
      colors:{
        gradient: {
          start: "#DEF9FF",
          end: "#F3FFFC",
        },
        black:"#000000",
        white:"#FFFFFF",
        blue:{
          50:"#E8F2FE",
          100:"#B8D7FB",
          200:"#95C3F9",
          300:"#65A8F6",
          400:"#4797F4",
          500:"#197DF1",
          600:"#1772DB",
          700:"#1259AB",
          800:"#0E4585",
          900:"#0B3565",
        },
        gray:{
          50:"#ECECEC",
          100:"#C3C5C3",
          200:"#A6A9A6",
          300:"#7D817D",
          400:"#646964",
          500:"#3D433D",
          600:"#383D38",
          700:"#2B302B",
          800:"#222522",
          900:"#1A1C1A"
        },
        neutral:{
          10:"#FAFAFA",
          20:"#F6F6F6",
          30:"#ECECEC",
          40:"#E0E0E0",
          50:"#C4C4C4",
          60:"#B6B6B6",
          70:"#AAAAAA",
          80:"#9C9C9C",
          90:"#8E8E8E",
          100:"#808080",
          200:"#727272",
          300:"#646464",
          400:"#585858",
          500:"#4A4A4A",
          600:"#3E3E3E",
          700:"#2E2E2E",
          800:"#202020",
          900:"#141414",
        }
      }
    },
  },
  plugins: [],
}
