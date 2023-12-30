import Game from '@/lib/core/game'
import { useEffect, useState } from 'react'

const useGameState = () => {
    let canvas: HTMLCanvasElement | null = null
    let renderContext: CanvasRenderingContext2D

    const [started, setStarted] = useState(false)
    const [game, setGame] = useState<Game | null>(null)
    const [requestAnimationFrameHandler, setRequestAnimationFrameHandler] =
        useState<number | null>(null)

    const setCanvas = (
        ref: HTMLCanvasElement,
        { width, height }: { width: number; height: number }
    ) => {
        canvas = ref
        const context = ref.getContext('2d')
        if (!context) throw Error('Cannot initiate 2D context')
        canvas.width = width
        canvas.height = height
        renderContext = context
    }

    const startGame = () => {
        if (!canvas) throw Error('Cannot initiate an game without canvas')
        if (started) return

        setStarted(true)
        setGame(
            new Game(renderContext, {
                width: canvas.width,
                height: canvas.height
            })
        )
    }

    useEffect(() => {
        if (!started || !game) return

        const loop = () => {
            game.loop()
            const handler = requestAnimationFrame(loop)
            setRequestAnimationFrameHandler(handler)
        }

        loop()

        return () => {
            if (requestAnimationFrameHandler)
                cancelAnimationFrame(requestAnimationFrameHandler)
        }
    }, [game, requestAnimationFrameHandler, started])

    return {
        canvas,
        setCanvas,
        started,
        startGame,
        state: game?.state
    }
}

export { useGameState }
