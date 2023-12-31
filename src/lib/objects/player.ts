import {
    DynamicObject,
    EventType,
    GameObject,
    GameObjects
} from '../types/object'
import Tail from './tail'

export default class Player implements DynamicObject {
    public size = 20
    private _zIndex: number
    private _uuid: string
    private clockMiliseconds = 150
    private x: number
    private y: number
    private directionX: number | undefined
    private directionY: number | undefined
    private timer: NodeJS.Timeout | null = null
    private tails: Tail[] = []
    private tailsSize: number = 0
    private lastX: number | undefined
    private lastY: number | undefined
    private lastDirectionX: number | undefined
    private lastDirectionY: number | undefined

    constructor(
        x: number,
        y: number,
        private screen: { width: number; height: number },
        private onDestroy: () => void
    ) {
        this.x = x
        this.y = y
        this._uuid = crypto.randomUUID()
        this._zIndex = 1
    }

    public draw(drawer: CanvasRenderingContext2D) {
        this.tails.forEach(tail => {
            drawer.fillStyle = '#F29F05'
            drawer.fillRect(
                tail.position.x,
                tail.position.y,
                this.size,
                this.size
            )
        })

        drawer.fillStyle = '#F2CB05'
        drawer.fillRect(this.x, this.y, this.size, this.size)
    }

    private startTimer = (objects: Array<GameObjects>) => {
        this.timer = setTimeout(() => {
            if (
                this.directionX !== undefined &&
                this.directionY !== undefined
            ) {
                this.lastX = this.x
                this.lastY = this.y

                this.lastDirectionX = this.directionX
                this.lastDirectionY = this.directionY

                this.move(this.directionX, this.directionY)

                if (
                    this.tailsSize > 0 &&
                    this.tails.length === this.tailsSize
                ) {
                    this.removeLastTail()
                }
                if (this.tailsSize > this.tails.length) {
                    this.generateTail(this.lastX, this.lastY)
                }

                this.verifyWalls()
                this.verifyColision(objects)
                this.stopTimer()
            }
        }, this.clockMiliseconds)
    }

    private stopTimer = () => {
        if (this.timer !== null) {
            clearTimeout(this.timer)
            this.timer = null
        }
    }

    private verifyColision(objects: Array<GameObjects>) {
        objects.forEach(object => {
            if (
                this.x === object.position.x &&
                this.y === object.position.y &&
                this._uuid !== object.uuid
            ) {
                object.onEvent('colision', this)
            }
        })

        this.tails.forEach(tail => {
            if (this.x === tail.position.x && this.y === tail.position.y) {
                this.onDestroy()
            }
        })
    }

    private verifyWalls() {
        if (this.x + this.size > this.screen.width) {
            this.x = 0
        }

        if (this.x - this.size < -this.size) {
            this.x = this.screen.width - this.size
        }

        if (this.y + this.size > this.screen.height) {
            this.y = 0
        }

        if (this.y - this.size < -this.size) {
            this.y = this.screen.height - this.size
        }
    }

    removeLastTail() {
        this.tails.shift()
    }

    generateTail(x: number, y: number) {
        this.tails.push(new Tail(x, y))
    }

    private move = (x: number, y: number) => {
        this.x += x * this.size
        this.y += y * this.size
    }

    public setDirection(x: number, y: number) {
        if (
            this.tailsSize > 0 &&
            ((this.lastDirectionY === y && this.lastDirectionX !== x) ||
                (this.lastDirectionX === x && this.lastDirectionY !== y))
        ) {
            return
        }

        this.directionX = x
        this.directionY = y
    }

    public loop(objects: Array<GameObjects>) {
        const isInMovement =
            this.directionX !== undefined && this.directionY !== undefined
        const isTimerOn = this.timer !== null

        if (isInMovement && !isTimerOn) {
            this.startTimer(objects)
        } else if (!isInMovement && isTimerOn) {
            this.stopTimer()
        }
    }

    public onEvent(type: EventType, target: GameObject) {}

    public growTail() {
        this.tailsSize++
    }

    get position() {
        return { x: this.x, y: this.y }
    }

    get bounds() {
        return [
            { x: this.x, y: this.y },
            ...this.tails.map(tail => ({
                x: tail.position.x,
                y: tail.position.y
            }))
        ]
    }

    get uuid() {
        return this._uuid
    }

    get zIndex() {
        return this._zIndex
    }
}
