class Edge {
    constructor(childNode, parentNode) {
        this.childNode = childNode;
        this.parentNode = parentNode;
    }

    drawLine(circles) {
        if (this.parentNode == null) {
            return;
        }
        const find_circle = (element) => element.getkey() === this.parentNode.getKey();
        let index = circles.find(find_circle);
        let parent_x = index.getX();
        let parent_y = index.getY();
        let distance = Math.sqrt((parent_x - this.childNode.x) * (parent_x - this.childNode.x) + (parent_y - this.childNode.y)
            * (parent_y - this.childNode.y));
        let adjust_y = this.childNode.radius * (parent_y - this.childNode.y) / distance;
        let adjust_x = Math.sqrt(this.childNode.radius * this.childNode.radius - adjust_y * adjust_y);

        let adjust_parent_x = this.childNode.radius * (parent_x - this.childNode.x) / distance;
        let adjust_parent_y = Math.sqrt(this.childNode.radius * this.childNode.radius - adjust_parent_x * adjust_parent_x);

        ctx.strokeStyle = this.childNode.color;
        ctx.linewidth = 1;
        ctx.beginPath();
        if (this.childNode.key < index.getkey()) {
            ctx.moveTo(this.childNode.x + adjust_x, this.childNode.y + adjust_y);
            ctx.lineTo(parent_x - adjust_parent_x, parent_y + adjust_parent_y);
        } else {
            ctx.moveTo(this.childNode.x - adjust_x, this.childNode.y + adjust_y);
            ctx.lineTo(parent_x - adjust_parent_x, parent_y + adjust_parent_y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    getChildCircle() {
        return this.childNode;
    }

    getParentCircle(circles) {
        if (this.parentNode == null) {
            return;
        }
        const find_circle = (element) => element.getkey() === this.parentNode.getKey();
        return circles.find(find_circle);
    }

    getParentNode() {
        return this.parentNode;
    }
}