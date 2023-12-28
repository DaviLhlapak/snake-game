export type KeyboardCommand = {
    keyPressed: string
}

type KeyboardObserverFunction = (command: KeyboardCommand) => void

export function createKeyboardListener(document: Document) {
    const state: {
        observers: Array<KeyboardObserverFunction>
    } = {
        observers: []
    }

    function subscribe(observerFunction: KeyboardObserverFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command: KeyboardCommand) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', handleKeyDown)

    function handleKeyDown(event: KeyboardEvent) {
        const keyPress = event.key

        const command = {
            keyPressed: keyPress
        }

        notifyAll(command)
    }

    return {
        subscribe
    }
}
