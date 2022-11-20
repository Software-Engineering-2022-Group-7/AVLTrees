class Circle {
    constructor(x, y, radius, color, fillColor, key, parent, rotational_status) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.fillColor = fillColor;
        this.key = key;
        this.parent = parent;
        this.rotational_status = rotational_status
    }

    draw() {
        ctx.beginPath();
        ctx.linewidth = 4;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, startAngle, endAngle, counterClockwise);
        // fill background color
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        // fill text
        ctx.fillStyle = circleFillTextColor;
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

    getY() {
        return this.y;
    }

    getkey() {
        return this.key;
    }

    getCircleParentNode() {
        return this.parent;
    }

    getRadius() {
        return this.radius;
    }

    getColor() {
        return this.color;
    }

    getFillColor() {
        return this.fillColor;
    }

    getRotationalStatus() {
        return this.rotational_status;
    }

    setX(current) {
        this.x = current;
    }

    setY(current) {
        this.y = current;
    }

    setFillColor(current) {
        this.fillColor = current;
    }

    setRotationalStatus(current) {
        this.rotational_status = current;
    }
}