import Player from './player.js';

export default function createGame(screen, context){

    const state = {
        player: new Player(Math.floor(screen.width/2),screen.height/2,20, context, screen),
        frutas: [],
        pnts: 0,
    }

    function verifyPnt(command){
        const fruitPosition = {x: command.frutas.x, y: command.frutas.y};
        const playerPosition = {x: command.player.x, y: command.player.y};
        if(fruitPosition.x == playerPosition.x && fruitPosition.y == playerPosition.y){
            state.frutas.pop();
            state.player.tamanhoCalda++;
            state.pnts++;
        }
    }

    function movePlayer(command){
        
        const acceptedMoves = {
            ArrowUp(player){
                state.player.dx = 0;
                state.player.dy = -player.size;
            },
            ArrowDown(player){
                state.player.dx = 0;
                state.player.dy = player.size;
            },
            ArrowLeft(player){
                state.player.dy = 0;
                state.player.dx = -player.size;
            },
            ArrowRight(player){
                state.player.dy = 0;
                state.player.dx = player.size;
            }
        }

        const keyPressed = command.keyPressed;
        const moveFunction = acceptedMoves[keyPressed];
       
        if(moveFunction){
            moveFunction(state.player);
        }
        
  
    }

    function generateNumber(max){
        return Math.floor(Math.random() * Math.floor(max+1));
    }


    function createFruta(){
        
        if(state.frutas.length == 0){
            
            let x = generateNumber(380);
            let y = generateNumber(380);

            do{
                while (x%20 !== 0) {
                    x = generateNumber(380);
                }
                while (y%20 !== 0) {
                    y = generateNumber(380);
                }

            }while(state.player.calda.indexOf({x: x, y: y}) > -1 && state.player.x == x && state.player.y == y);

            state.frutas.push({
                x: x,
                y: y
            })
        }

        context.fillStyle = "#D93636";
        context.fillRect(state.frutas[0].x,state.frutas[0].y,20,20);
    }

    return {
        movePlayer,
        verifyPnt,
        createFruta,
        state
    }
}