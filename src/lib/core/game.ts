import Player from '../objects/player'
import KeyboardListener from '../listeners/keyboard'
import { getPlayerActions } from '../constants/inputs'
import Fruit from '../objects/fruit'
import { generateRandomNumber } from '../utils/random'
import { GameObjects } from '../types/object'

export default class Game {
    private objects = new Map<string, GameObjects>()

    public state = {
        points: 0
    }

    constructor(
        private drawer: CanvasRenderingContext2D,
        private screen: { width: number; height: number }
    ) {
        const player = new Player(
            Math.floor(this.screen.width / 2 / 20) * 20,
            Math.floor(this.screen.height / 2 / 20) * 20,
            this.screen
        )

        const keyboardListener = new KeyboardListener()
        keyboardListener.subscribe(command => {
            const playerActions = getPlayerActions(player)
            const playerAction = playerActions[command.keyPressed]
            if (playerAction) playerAction()
        })

        this.objects.set('player', player)
    }

    public loop() {
        if (!this.objects.has('fruit')) this.generateFruit()

        this.objects.forEach(item => {
            if ('loop' in item) {
                item.loop(Array.from(this.objects.values()))
            }
        })

        this.draw()
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
                        this.state.points++
                        const player = this.objects.get('player') as
                            | Player
                            | undefined
                        if (player !== undefined) {
                            player.growTail()
                        }
                    })
                )
                createdFruit = true
            }
        }
    }

    private draw = () => {
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
}
