'use client'

import { useEffect, useRef } from 'react'

import { useGameState } from '@/lib/core/state'

export default function Page() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const {
        canvas,
        setCanvas,
        started,
        startGame,
        state,
        restartGame,
        highScore
    } = useGameState()

    useEffect(() => {
        if (!canvas && canvasRef.current) {
            setCanvas(canvasRef.current, { width: 320, height: 480 })
        }
    }, [canvas, setCanvas])

    return (
        <div className="container flex h-dvh flex-col items-center justify-center gap-5 py-20">
            <div className="flex flex-col items-center justify-center gap-y-1">
                <p
                    data-started={started}
                    className="select-none text-center text-2xl font-semibold opacity-0 data-[started=true]:opacity-100"
                >
                    {state?.points ?? 0} Pontos
                </p>
                <p
                    data-started={started}
                    className="min-h-6 select-none text-center text-base opacity-0 data-[started=true]:opacity-80"
                >
                    {highScore !== null && `Recorde: ${highScore} Pontos`}
                </p>
            </div>
            <canvas
                ref={canvasRef}
                style={{ imageRendering: 'pixelated' }}
                className="h-[28rem] w-80 rounded-md bg-green-500 shadow-inner min-[390px]:h-[31rem] min-[390px]:w-96 md:h-[720px] md:w-[600px]"
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
            {state?.lose && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/20">
                    <p className="text-xl font-semibold">
                        Que pena, você perdeu :(
                    </p>
                    <button
                        className="select-none rounded-3xl bg-orange-500 px-4 py-2 text-3xl font-bold text-white transition-all duration-300 hover:scale-110"
                        type="button"
                        onClick={() => {
                            restartGame()
                        }}
                    >
                        Reiniciar
                    </button>
                </div>
            )}
        </div>
    )
}
