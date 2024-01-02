import { EventType, GameObject, StaticObject } from '../types/object'

export default class Tail implements StaticObject {
    public size = 20
    private _uuid: string
    private _zIndex: number
    private x: number
    private y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this._uuid = crypto.randomUUID()
        this._zIndex = 0
    }

    public draw(drawer: CanvasRenderingContext2D) {
        drawer.fillStyle = 'green'
        drawer.fillRect(this.x, this.y, this.size, this.size)
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
}