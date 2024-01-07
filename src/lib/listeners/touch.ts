export type TouchCommand = {
    direction: 'SwipeLeft' | 'SwipeRight' | 'SwipeUp' | 'SwipeDown'
}

type TouchObserver = (command: TouchCommand) => void

export default class TouchListener {
    private observers: TouchObserver[] = []

    private touchStartPosition: { x: number; y: number } | null = null

    constructor() {
        document.addEventListener('touchstart', event => {
            event.preventDefault()
            this.handleTouchStart(event)
        })
        document.addEventListener('touchend', event => {
            event.preventDefault()
            this.handleTouchEnd(event)
        })
    }

    private getCurrentTouchPosition(touches: TouchList) {
        const firstTouch = touches.item(0)
        if (!firstTouch) return null

        return {
            x: firstTouch.screenX,
            y: firstTouch.screenY
        }
    }

    private handleTouchStart(event: TouchEvent) {
        const currentPosition = this.getCurrentTouchPosition(event.touches)
        if (currentPosition === null) return
        this.touchStartPosition = currentPosition
    }

    private handleTouchEnd(event: TouchEvent) {
        const currentPosition = this.getCurrentTouchPosition(
            event.changedTouches
        )
        if (currentPosition === null || this.touchStartPosition === null) return

        const horizontalDifference =
            currentPosition.x - this.touchStartPosition.x

        const verticalDifference = currentPosition.y - this.touchStartPosition.y

        if (Math.abs(horizontalDifference) > Math.abs(verticalDifference)) {
            if (horizontalDifference < 0) {
                return this.notifyAll({
                    direction: 'SwipeLeft'
                })
            }

            return this.notifyAll({
                direction: 'SwipeRight'
            })
        } else if (
            Math.abs(horizontalDifference) < Math.abs(verticalDifference)
        ) {
            if (verticalDifference < 0) {
                return this.notifyAll({
                    direction: 'SwipeUp'
                })
            }

            return this.notifyAll({
                direction: 'SwipeDown'
            })
        }
    }

    private notifyAll(command: TouchCommand) {
        for (const observerFunction of this.observers) {
            observerFunction(command)
        }
    }

    subscribe(observerFunction: TouchObserver) {
        this.observers.push(observerFunction)
    }

    clear() {
        this.observers = []
    }
}
