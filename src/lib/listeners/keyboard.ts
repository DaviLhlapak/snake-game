export type KeyboardCommand = {
    keyPressed: string
}

type KeyboardObserver = (command: KeyboardCommand) => void

export default class KeyboardListener {
    private observers: KeyboardObserver[] = []

    constructor() {
        document.addEventListener('keydown', event => {
            this.handleKeyDown(event)
        })
    }

    private handleKeyDown(event: KeyboardEvent) {
        const keyPress = event.key

        const command = {
            keyPressed: keyPress
        }

        this.notifyAll(command)
    }

    private notifyAll(command: KeyboardCommand) {
        for (const observerFunction of this.observers) {
            observerFunction(command)
        }
    }

    subscribe(observerFunction: KeyboardObserver) {
        this.observers.push(observerFunction)
    }
}
