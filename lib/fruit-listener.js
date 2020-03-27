export default function createFruitListener(){
    const state = {
        observers: []
    }

    function subscribe(observerFunction){
        state.observers.push(observerFunction);
    }

    function notifyAll(command){
        for(const observerFunction of state.observers){
            observerFunction(command)
        }
    }

    function verifyFruit(event){
        notifyAll(event)
    }

    return{
        subscribe,
        verifyFruit
    }
}