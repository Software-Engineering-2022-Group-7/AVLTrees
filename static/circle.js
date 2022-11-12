class Circle {
    constructor(x, y, radius, color, key) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.key = key;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.linewidth = 4;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, startAngle, endAngle, counterClockwise);
        // fill background color
        ctx.fillStyle = "white";
        ctx.fill();
        // fill text
        ctx.fillStyle = "black";
        ctx.font = "15px Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.key, this.x, this.y);
        ctx.closePath();
        ctx.stroke();
    }

    getX() {
        return this.x;
    }

    setX(current) {
        this.x = current;
    }

    getY() {
        return this.y;
    }

    setY(current) {
        this.y = current;
    }

    getkey() {
        return this.key;
    }
}