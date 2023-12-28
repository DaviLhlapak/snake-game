import { VerifyFruitEvent } from './fruit-listener.js'
import { KeyboardCommand } from './keyboard-listener.js'
import Player from './player'

export function createGame(
    screen: HTMLCanvasElement,
    context: CanvasRenderingContext2D
) {
    const state: {
        player: Player
        frutas: { x: number; y: number }[]
        pnts: number
        jogando: boolean
        frutaImg: HTMLImageElement
    } = {
        player: new Player(
            Math.floor(screen.width / 2),
            screen.height / 2,
            20,
            context,
            screen
        ),
        frutas: [],
        pnts: 0,
        jogando: false,
        frutaImg: new Image()
    }

    function verifyPnt(command: VerifyFruitEvent) {
        const fruitPosition = { x: command.frutas.x, y: command.frutas.y }
        const playerPosition = { x: command.player.x, y: command.player.y }
        if (
            fruitPosition.x == playerPosition.x &&
            fruitPosition.y == playerPosition.y
        ) {
            state.frutas.pop()
            state.player.tamanhoCalda++
            state.pnts++
        }
    }

    function movePlayer(command: KeyboardCommand) {
        if (!state.jogando) {
            state.jogando = true
        }

        const acceptedMoves: Record<string, Function> = {
            ArrowUp(player: Player) {
                state.player.dx = 0
                state.player.dy = -player.size
            },
            ArrowDown(player: Player) {
                state.player.dx = 0
                state.player.dy = player.size
            },
            ArrowLeft(player: Player) {
                state.player.dy = 0
                state.player.dx = -player.size
            },
            ArrowRight(player: Player) {
                state.player.dy = 0
                state.player.dx = player.size
            }
        }

        const keyPressed = command.keyPressed
        const moveFunction = acceptedMoves[keyPressed]

        if (moveFunction) {
            moveFunction(state.player)
        }
    }

    function generateNumber(max: number) {
        return Math.floor(Math.random() * Math.floor(max + 1))
    }

    function createFruta() {
        if (state.frutas.length == 0) {
            let x = generateNumber(380)
            let y = generateNumber(380)

            let exist = true

            while (exist) {
                while (x % 20 !== 0) {
                    x = generateNumber(380)
                }
                while (y % 20 !== 0) {
                    y = generateNumber(380)
                }

                for (var partCalda in state.player.calda) {
                    if (
                        state.player.calda[partCalda].x == x &&
                        state.player.calda[partCalda].y == y
                    ) {
                        exist = true
                        break
                    }
                }

                exist = false
                break
            }

            state.frutas.push({
                x: x,
                y: y
            })
        }

        console.log(state)

        context.drawImage(state.frutaImg, state.frutas[0].x, state.frutas[0].y)
    }

    function resetGame() {
        state.frutas = []
        state.pnts = 0
        state.jogando = false
        state.player.reset()
    }

    return {
        movePlayer,
        verifyPnt,
        resetGame,
        createFruta,
        state
    }
}
