'use client'

import { useEffect, useRef, useState } from 'react'

import { createGame } from '@/lib/game'
import { createKeyboardListener } from '@/lib/keyboard-listener'
import { createFruitListener } from '@/lib/fruit-listener'

export default function Page() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [gameState, setGameState] = useState<null | ReturnType<
        typeof createGame
    >>(null)

    const keyboardListenerRef = useRef<null | ReturnType<
        typeof createKeyboardListener
    >>(null)

    const fruitListenerRef = useRef<null | ReturnType<
        typeof createFruitListener
    >>(null)

    useEffect(() => {
        if (canvasRef.current && gameState === null) {
            const screen = document.querySelector('canvas')
            if (screen) {
                const context = screen.getContext('2d')
                if (context) {
                    const game = createGame(screen, context)

                    const keyboardListener = createKeyboardListener(document)
                    keyboardListener.subscribe(game.movePlayer)
                    keyboardListenerRef.current = keyboardListener

                    const fruitListener = createFruitListener()
                    fruitListener.subscribe(game.verifyPnt)
                    fruitListenerRef.current = fruitListener

                    setGameState(game)

                    const renderScreen = () => {
                        context.clearRect(0, 0, screen.width, screen.height)
                        game.state.frutaImg.src = '/maca.png'

                        game.createFruta()
                        game.state.player.update()

                        if (fruitListenerRef.current) {
                            fruitListenerRef.current.verifyFruit({
                                frutas: game.state.frutas[0],
                                player: game.state.player
                            })
                        }

                        if (
                            game.state.jogando &&
                            game.state.player.dx == 0 &&
                            game.state.player.dy == 0
                        ) {
                            game.resetGame()
                        }
                    }

                    setInterval(renderScreen, 100)

                    renderScreen()
                }
            }
        }
    }, [gameState])

    return (
        <div className="container flex flex-col items-center justify-center gap-5 py-20">
            <p className="text-xl font-semibold">Pontos 0</p>
            <canvas
                ref={canvasRef}
                width="400"
                height="400"
                style={{ imageRendering: 'pixelated' }}
                className="bg-green-500 h-[600px] w-[600px] border border-black"
            />
        </div>
    )
}
