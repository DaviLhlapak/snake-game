
export default class Player {
    constructor(x, y, size, context, screen) {
        this.context = context;
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
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
            for (var partCalda in this.calda) {
                context.fillStyle = "#D97B29";
                context.fillRect(this.calda[partCalda].x, this.calda[partCalda].y, this.size, this.size);
            }
        };
        this.update = function () {
            if (this.calda.length == this.tamanhoCalda) {
                this.calda.shift();
            }
            if (this.calda.length < this.tamanhoCalda) {
                this.calda.push({ x: this.x, y: this.y });
            }
            this.y += this.dy;
            this.x += this.dx;
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
