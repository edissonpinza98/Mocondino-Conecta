/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f7ff',
                    100: '#e0effe',
                    200: '#bae0fd',
                    300: '#7cc7fb',
                    400: '#38aaf7',
                    500: '#0e8fe7',
                    600: '#0272c7',
                    700: '#035ba1',
                    800: '#074d85',
                    900: '#0c416e',
                    950: '#082949',
                },
                secondary: {
                    50: '#f2fdf6',
                    100: '#e1fbed',
                    200: '#c5f7dc',
                    300: '#96efc0',
                    400: '#5fdf9c',
                    500: '#34c77d',
                    600: '#25a463',
                    700: '#1f8251',
                    800: '#1d6642',
                    900: '#195438',
                    950: '#0a2f1f',
                },
                accent: {
                    gold: '#FFD700',
                    coral: '#FF7F50',
                    royal: '#4169E1'
                }
            },
            fontFamily: {
                sans: ['"Outfit"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '100%': { transform: 'translateX(100%)' },
                }
            },
            boxShadow: {
                'premium': '0 20px 50px -12px rgba(0, 0, 0, 0.08)',
                'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
            }
        },
    },
    plugins: [],
}
