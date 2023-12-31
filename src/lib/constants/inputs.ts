import Player from '../objects/player'

export function getPlayerActions(player: Player): Record<string, Function> {
    return {
        ArrowUp() {
            player.setDirection(0, -1)
        },
        ArrowDown() {
            player.setDirection(0, 1)
        },
        ArrowLeft() {
            player.setDirection(-1, 0)
        },
        ArrowRight() {
            player.setDirection(1, 0)
        },
        SwipeUp() {
            player.setDirection(0, -1)
        },
        SwipeDown() {
            player.setDirection(0, 1)
        },
        SwipeLeft() {
            player.setDirection(-1, 0)
        },
        SwipeRight() {
            player.setDirection(1, 0)
        }
    }
}
