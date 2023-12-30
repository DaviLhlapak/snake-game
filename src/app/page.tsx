'use client'

import { useEffect, useRef } from 'react'

import { useGameState } from '@/lib/core/state'

export default function Page() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const { canvas, setCanvas, started, startGame, state } = useGameState()

    useEffect(() => {
        if (!canvas && canvasRef.current) {
            setCanvas(canvasRef.current, { width: 500, height: 500 })
        }
    }, [canvas, setCanvas])

    return (
        <div className="container flex h-screen flex-col items-center justify-center gap-5 py-20">
            <p
                data-started={started}
                className="select-none text-2xl font-semibold opacity-0 data-[started=true]:opacity-100"
            >
                Pontos {state?.points ?? 0}
            </p>
            <canvas
                ref={canvasRef}
                style={{ imageRendering: 'pixelated' }}
                className="h-[600px] w-[600px] rounded-md bg-green-500 shadow-inner"
            />
            {!started && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <button
                        className="select-none rounded-3xl bg-orange-500 px-4 py-2 text-3xl font-bold text-white transition-all duration-300 hover:scale-110"
                        type="button"
                        onClick={() => {
                            startGame()
                        }}
                    >
                        Iniciar
                    </button>
                </div>
            )}
        </div>
    )
}
