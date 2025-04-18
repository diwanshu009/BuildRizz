import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}', 
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('tailwind-scrollbar-hide'),
    ],
}

export default config
