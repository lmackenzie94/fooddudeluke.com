/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '38em',
      // => @media (min-width: 640px) { ... }

      md: '55em',
      // => @media (min-width: 1024px) { ... }

      // lg: '60em',
      // => @media (min-width: 1280px) { ... }
    },
    container: {
      center: true,
      padding: '1rem',
    },
    colors: {
      white: '#fbfbfb',
      black: '#393939',
      green: '#12492f',
      blue: '#3b38ab',
      orange: '#D5370B',
      yellow: '#F7A222',
      gray: {
        100: '#f3f4f6',
        200: '#e5e7eb',
        500: '#6b7280',
        700: '#374151',
      },
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            blockquote: {
              backgroundColor: theme('colors.white'),
              fontStyle: 'normal',
              fontWeight: 'normal',
              padding: '1rem',
              borderColor: theme('colors.yellow'),
              boxShadow: '0px 3px 12px 0px rgba(166,166,166,0.2)',
              strong: {
                color: theme('colors.black'),
                fontSize: '1.1rem',
                fontWeight: '700',
              },
              ul: {
                marginTop: '0.5rem',
                marginBottom: '0',
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
