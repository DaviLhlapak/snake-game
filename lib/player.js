
export default class Player {
    constructor(x, y, size, drawer, screen) {
        this.drawer = drawer;
        this.screen = screen;
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.size = size;
        this.color = "#F2AE30";
        this.tamanhoCalda = 0;
        this.calda = [];
        this.draw = function () {
            for (var partCalda in this.calda) {
                drawer.fillStyle = "#D97B29";
                drawer.fillRect(this.calda[partCalda].x, this.calda[partCalda].y, this.size, this.size);
            }
            drawer.fillStyle = this.color;
            drawer.fillRect(this.x, this.y, this.size, this.size);
        };
        this.update = function () {
            //Colisão - Calda
            for (var partCalda in this.calda) {
                if(this.calda[partCalda].x == this.x && this.calda[partCalda].y == this.y){
                    this.dx = 0;
                    this.dy = 0;
                    
                    this.draw();
                    return;
                }
            }


            //Rastro - Calda
            if (this.calda.length == this.tamanhoCalda) {
                this.calda.shift();
            }
            if (this.calda.length < this.tamanhoCalda) {
                this.calda.push({ x: this.x, y: this.y });
            }

            //Movimento
            this.y += this.dy;
            this.x += this.dx;

            //Colisão - Parede
            if (this.x + size > screen.width) {
                this.x = 0;
            }
            if (this.x - size < -size) {
                this.x = screen.width - size;
            }
            if (this.y + size > screen.height) {
                this.y = 0;
            }
            if (this.y - size < -size) {
                this.y = screen.height - size;
            }

            this.draw();
        };
    }
}
