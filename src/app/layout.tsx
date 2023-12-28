import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
    title: {
        default: 'Snake Game',
        template: '%s | Snake Game'
    },
    robots: {
        follow: false,
        index: false
    }
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-br" className={`scroll-smooth ${inter.variable}`}>
            <body className="font-inter bg-green-700 flex h-full min-h-screen w-full items-stretch justify-stretch text-white">
                <main className="relative flex h-full min-h-screen w-full flex-grow flex-col items-center">
                    {children}
                </main>
            </body>
        </html>
    )
}
