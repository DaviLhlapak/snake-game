import Player from './player'

export type VerifyFruitEvent = {
    frutas: {
        x: number
        y: number
    }
    player: Player
}

type KeyboardObserverFunction = (command: VerifyFruitEvent) => void

export function createFruitListener() {
    const state: {
        observers: Array<KeyboardObserverFunction>
    } = {
        observers: []
    }

    function subscribe(observerFunction: KeyboardObserverFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command: VerifyFruitEvent) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    function verifyFruit(event: VerifyFruitEvent) {
        notifyAll(event)
    }

    return {
        subscribe,
        verifyFruit
    }
}
