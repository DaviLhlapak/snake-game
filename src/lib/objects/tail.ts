import {
    MIDDLE_TAIL_IMAGE_BY_DIRECTION,
    TAIL_IMAGE_BY_DIRECTION
} from '../constants/player'
import { EventType, GameObject, StaticObject } from '../types/object'

export default class Tail implements StaticObject {
    public size = 20
    private _uuid: string
    private _zIndex: number
    private x: number
    private y: number

    constructor(
        x: number,
        y: number,
        private target: { x: number; y: number },
        private origin?: { x: number; y: number }
    ) {
        this.x = x
        this.y = y
        this._uuid = crypto.randomUUID()
        this._zIndex = 0
    }

    public draw(drawer: CanvasRenderingContext2D) {
        if (this.origin === undefined) {
            this.drawLastTail(drawer)
        } else {
            this.drawMiddleTail(drawer)
        }
    }

    private drawLastTail(drawer: CanvasRenderingContext2D) {
        const tailImage = new Image(80, 20)
        tailImage.src = '/tail.png'

        let direction: keyof typeof TAIL_IMAGE_BY_DIRECTION | null = null

        if (this.target.x === 1) {
            direction = 'Left'
        }
        if (this.target.x === -1) {
            direction = 'Right'
        }
        if (this.target.y === 1) {
            direction = 'Up'
        }
        if (this.target.y === -1) {
            direction = 'Down'
        }

        drawer.fillStyle = '#F29F05'
        drawer.drawImage(
            tailImage,
            direction ? TAIL_IMAGE_BY_DIRECTION[direction].x : 0,
            direction ? TAIL_IMAGE_BY_DIRECTION[direction].y : 0,
            20,
            20,
            this.x,
            this.y,
            this.size,
            this.size
        )
    }

    private drawMiddleTail(drawer: CanvasRenderingContext2D) {
        if (this.origin === undefined) return

        const tailImage = new Image(120, 20)
        tailImage.src = '/middle.png'

        let direction: keyof typeof MIDDLE_TAIL_IMAGE_BY_DIRECTION | null = null

        if (this.target.x !== 0 && this.origin.x === this.target.x) {
            direction = 'Horizontal'
        }
        if (this.target.y !== 0 && this.origin.y === this.target.y) {
            direction = 'Vertical'
        }
        if (
            (this.target.y === 1 && this.origin.x === 1) ||
            (this.target.x === -1 && this.origin.y === -1)
        ) {
            direction = 'DownLeft'
        }
        if (
            (this.target.x === 1 && this.origin.y === -1) ||
            (this.target.y === 1 && this.origin.x === -1)
        ) {
            direction = 'DownRight'
        }
        if (
            (this.target.x === -1 && this.origin.y === 1) ||
            (this.target.y === -1 && this.origin.x === 1)
        ) {
            direction = 'UpLeft'
        }
        if (
            (this.target.y === -1 && this.origin.x === -1) ||
            (this.target.x === 1 && this.origin.y === 1)
        ) {
            direction = 'UpRight'
        }

        drawer.fillStyle = '#F29F05'
        if (direction === null) {
            drawer.fillRect(this.x, this.y, this.size, this.size)
        } else {
            drawer.drawImage(
                tailImage,
                direction ? MIDDLE_TAIL_IMAGE_BY_DIRECTION[direction].x : 0,
                direction ? MIDDLE_TAIL_IMAGE_BY_DIRECTION[direction].y : 0,
                20,
                20,
                this.x,
                this.y,
                this.size,
                this.size
            )
        }
    }

    public removeOrigin() {
        this.origin = undefined
    }

    public onEvent(type: EventType, target: GameObject) {}

    get position() {
        return { x: this.x, y: this.y }
    }

    get bounds() {
        return [{ x: this.x, y: this.y }]
    }

    get uuid() {
        return this._uuid
    }

    get zIndex() {
        return this._zIndex
    }

    get targetDirection() {
        return this.target
    }
}
