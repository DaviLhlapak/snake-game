import type { Config } from 'tailwindcss'
import DefaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: '#FFFFFF',
            black: '#000000',
            green: {
                500: '#6AA69B',
                700: '#1D594E'
            },
            orange: {
                500: '#F0CB46'
            }
        },
        container: {
            padding: '1rem',
            center: true
        },
        fontFamily: {
            pitagon: ['var(--font-inter)', ...DefaultTheme.fontFamily.sans]
        }
    },
    plugins: []
}

export default config
