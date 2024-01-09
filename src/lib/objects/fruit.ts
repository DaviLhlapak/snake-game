import { EventType, GameObject, StaticObject } from '../types/object'

export default class Fruit implements StaticObject {
    public size = 20
    private _uuid: string
    private _zIndex: number
    private x: number
    private y: number
    private sprite: HTMLImageElement

    constructor(
        x: number,
        y: number,
        private onDestroy: () => void
    ) {
        this.x = x
        this.y = y
        this._uuid = crypto.randomUUID()
        this._zIndex = 0

        const appleImage = new Image(20, 20)
        appleImage.src = '/apple.png'
        this.sprite = appleImage
    }

    public draw(drawer: CanvasRenderingContext2D) {
        drawer.fillStyle = '#F23030'
        drawer.drawImage(this.sprite, this.x, this.y, this.size, this.size)
    }

    public onEvent(type: EventType, target: GameObject) {
        if (type === 'colision') {
            this.onDestroy()
        }
    }

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
