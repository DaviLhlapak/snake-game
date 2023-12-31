import Player from '../objects/player'
import KeyboardListener from '../listeners/keyboard'
import { getPlayerActions } from '../constants/inputs'
import Fruit from '../objects/fruit'
import { generateRandomNumber } from '../utils/random'
import { GameObjects } from '../types/object'
import { STORAGE_KEY_HIGHSCORE } from '../constants/game'
import TouchListener from '../listeners/touch'

export default class Game {
    private objects = new Map<string, GameObjects>()
    private keyboardListener: KeyboardListener | undefined
    private touchListener: TouchListener | undefined
    private _highScore: number | null = null

    private _state = {
        points: 0,
        lose: false
    }

    constructor(
        private drawer: CanvasRenderingContext2D,
        private screen: { width: number; height: number }
    ) {
        this.createPlayer()
        this.assignKeyboardListenerToPlayer()
        this.assignTouchListenerToPlayer()

        const highScore = this.getHighScore()
        if (highScore !== null) this._highScore = highScore
    }

    private getPlayer() {
        const player = this.objects.get('player') as Player | undefined
        if (player !== undefined) {
            return player
        }
    }

    private assignTouchListenerToPlayer() {
        const player = this.getPlayer()

        if (!player)
            throw new Error('Cannot assign touch to an undefined player')

        if (this.touchListener !== undefined) {
            this.touchListener.clear()
        } else {
            this.touchListener = new TouchListener()
        }

        this.touchListener.subscribe(command => {
            const playerActions = getPlayerActions(player)
            const playerAction = playerActions[command.direction]
            if (playerAction) playerAction()
        })
    }

    private assignKeyboardListenerToPlayer() {
        const player = this.getPlayer()

        if (!player)
            throw new Error('Cannot assign keyboard to an undefined player')

        if (this.keyboardListener !== undefined) {
            this.keyboardListener.clear()
        } else {
            this.keyboardListener = new KeyboardListener()
        }

        this.keyboardListener.subscribe(command => {
            const playerActions = getPlayerActions(player)
            const playerAction = playerActions[command.keyPressed]
            if (playerAction) playerAction()
        })
    }

    private createPlayer() {
        const player = new Player(
            Math.floor(this.screen.width / 2 / 20) * 20,
            Math.floor(this.screen.height / 2 / 20) * 20,
            this.screen,
            () => {
                this.gameOver()
            }
        )

        this.objects.set('player', player)
    }

    public loop() {
        if (this._state.lose === false) {
            if (!this.objects.has('fruit')) this.generateFruit()

            this.objects.forEach(item => {
                if ('loop' in item) {
                    item.loop(Array.from(this.objects.values()))
                }
            })
        }

        this.draw()
    }

    public restart() {
        this.objects.clear()
        this._state = {
            points: 0,
            lose: false
        }
        this.createPlayer()
        this.assignKeyboardListenerToPlayer()
    }

    generateFruit() {
        let createdFruit = false

        while (createdFruit === false) {
            const newFruitPosition = {
                x:
                    Math.floor(
                        generateRandomNumber(this.screen.width - 20) / 20
                    ) * 20,
                y:
                    Math.floor(
                        generateRandomNumber(this.screen.height - 20) / 20
                    ) * 20
            }

            let isColiding = false

            this.objects.forEach(item => {
                item.bounds.forEach(bound => {
                    if (
                        bound.x === newFruitPosition.x &&
                        bound.y === newFruitPosition.y
                    ) {
                        isColiding = true
                    }
                })
            })

            if (isColiding === false) {
                this.objects.set(
                    'fruit',
                    new Fruit(newFruitPosition.x, newFruitPosition.y, () => {
                        this.objects.delete('fruit')
                        this._state.points++

                        const player = this.getPlayer()

                        if (!player)
                            throw new Error(
                                'Cannot assign keyboard to an undefined player'
                            )

                        player.growTail()
                    })
                )
                createdFruit = true
            }
        }
    }

    private draw() {
        this.drawer.clearRect(0, 0, this.screen.width, this.screen.height)

        Array.from(this.objects.values())
            .sort((itemA, itemB) => {
                if (itemA.zIndex > itemB.zIndex) return 1
                if (itemA.zIndex < itemB.zIndex) return -1
                return 0
            })
            .forEach(item => {
                item.draw(this.drawer)
            })
    }

    private gameOver() {
        this._state.lose = true
        this.saveHighScore()
    }

    private saveHighScore() {
        if (this._state.points <= 0) return

        const savedHighScore = this.getHighScore()

        if (
            savedHighScore !== null &&
            this._state.points < Number(savedHighScore)
        )
            return

        localStorage.setItem(
            STORAGE_KEY_HIGHSCORE,
            this._state.points.toString()
        )
        this._highScore = this._state.points
    }

    private getHighScore() {
        const storedValue = localStorage.getItem(STORAGE_KEY_HIGHSCORE)
        return storedValue === null ? storedValue : Number(storedValue)
    }

    get highScore() {
        return this._highScore
    }

    get state() {
        return this._state
    }
}
