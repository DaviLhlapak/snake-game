export type EventType = 'colision'

export interface GameObject {
    uuid: string
    zIndex: number
    draw: (drawer: CanvasRenderingContext2D) => void
    position: { x: number; y: number }
    bounds: { x: number; y: number }[]
    onEvent: (type: EventType, target: GameObject) => void
}

export interface StaticObject extends GameObject {}

export interface DynamicObject extends GameObject {
    loop: (objects: Array<GameObjects>) => void
}

export type GameObjects = StaticObject | DynamicObject
