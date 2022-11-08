class Circle {
    constructor(x, y, radius, color, key, parent) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.key = key;
        this.parent = parent;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.linewidth = 4;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeStyle = this.color;
        ctx.font = "15px Arial";
        ctx.arc(this.x, this.y, this.radius, startAngle, endAngle, counterClockwise);
        ctx.fillText(this.key, this.x, this.y);
        ctx.closePath();
        ctx.stroke();
        this.drawLine(ctx);
    }

    drawLine(ctx) {
        if (this.parent == null) {
            return;
        }
        const find_circle = (element) => element.getkey() === this.parent.getKey();
        let index = all_circles.find(find_circle);
        let parent_x = index.getX();
        let parent_y = index.getY();
        let distance = Math.sqrt((parent_x - this.x) * (parent_x - this.x) + (parent_y - this.y)
            * (parent_y - this.y));
        let adjust_y = this.radius * (parent_y - this.y) / distance;
        let adjust_x = Math.sqrt(this.radius * this.radius - adjust_y * adjust_y);

        let adjust_parent_x = this.radius * (parent_x - this.x) / distance;
        let adjust_parent_y = Math.sqrt(this.radius * this.radius - adjust_parent_x * adjust_parent_x);

        ctx.strokeStyle = this.color;
        ctx.linewidth = 1;
        ctx.beginPath();
        if (this.key < this.parent.getKey()) {
            ctx.moveTo(this.x + adjust_x, this.y + adjust_y);
            ctx.lineTo(parent_x - adjust_parent_x, parent_y + adjust_parent_y);
        } else {
            ctx.moveTo(this.x - adjust_x, this.y + adjust_y);
            ctx.lineTo(parent_x - adjust_parent_x, parent_y + adjust_parent_y);
        }
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