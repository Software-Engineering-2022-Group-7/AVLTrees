// Set up canvas
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

// generate the circle list, edge list, and tree
let all_circles = [];
let all_edges = [];
let prev_circles = [];
let prev_edges = [];
let rotation_content = [];
let tree = new AVL();

// parameters
let canvas_height = c.height;
let canvas_width = c.width;
let radius = 20;
let circleColor = "black";
let initial_x = canvas_width / 2;
let initial_y = radius * 5;
let startAngle = 0;
let endAngle = Math.PI * 2;
let counterClockwise = false;
let Rotation_status = false;
let startTime;
let duration = 1500;

// Start insertion
function getInput() {
    let input = document.getElementById("numInput").value;
    input = parseInt(input, 10);
    // Check input validity
    if (!Number.isInteger(input)) {
        console.log(new Error("Please enter an integer."));
        return;
    }
    try {
        tree.insert(input, 0);
    } catch (error) {
        console.log(error);
    }
}

// Start deletion
function deleteInput() {
    let input = document.getElementById("numDelete").value;
    input = parseInt(input, 10);
    // Check input validity
    if (!Number.isInteger(input)) {
        console.log(new Error("Please enter an integer."));
        return;
    }
    try {
        tree.remove(input, 0);
    } catch (error) {
        console.log(error);
    }
}

// Clear canvas for reset button
function clearCanvas() {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    all_circles = [];
    tree = new AVL();
}

// Position adjustment for nodes > level 1
function pre_updateParameters(input, current_parent) {
    const find_circle = (element) => element.getkey() === current_parent.getKey();
    let index = all_circles.find(find_circle);
    let curr_x;
    let curr_y = index.getY() * 1.2 + radius * 3;
    let current_key = parseInt(current_parent.getKey(), 10);
    if (input < current_key) {
        curr_x = index.getX() - radius * 8 + (index.getY() + radius * 2) * 0.2;
        if (Math.abs(curr_x - initial_x) < radius) {
            curr_x = curr_x + radius;
        } else if (curr_x < radius * 1.5) {
            curr_x = curr_x + radius * 2;
        }
    } else {
        curr_x = index.getX() + radius * 8 - (index.getY() + radius * 2) * 0.2;
        // console.log(canvas_width);
        if (Math.abs(curr_x - initial_x) < radius) {
            curr_x = curr_x - radius;
        } else if (Math.abs(curr_x - canvas_width) < radius * 1.5) {
            curr_x = curr_x - radius * 2;
        }
    }
    let temp = [];
    temp.push(curr_x);
    temp.push(curr_y);
    return temp;
}

// Position adjustment for nodes == level 1
function initial_update(input, current_parent) {
    const find_circle = (element) => element.getkey() === current_parent.getKey();
    let index = all_circles.find(find_circle);
    let curr_x;
    let curr_y = index.getY() * 1.2 + radius * 3;
    let current_key = parseInt(current_parent.getKey(), 10);
    if (input < current_key) {
        curr_x = index.getX() - radius * 15 + (index.getY() + radius * 2) * 0.2;
    } else {
        curr_x = index.getX() + radius * 15 - (index.getY() + radius * 2) * 0.2;
    }
    let temp = [];
    temp.push(curr_x);
    temp.push(curr_y);
    return temp;
}

// Draw circles and edges on the canvas
function drawWholeTree() {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    for (let i = 0; i < all_circles.length; i++) {
        // console.log(all_circles[i]);
        all_circles[i].draw(ctx);
        if (all_edges[i]) {
            all_edges[i].drawLine(ctx, all_circles);
        }
    }
}

// Collect info and draw the tree before rotation
AVL.prototype.LevelOrderDrawBeforeRotation = function () {
    // Set up
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    all_circles = [];
    all_edges = [];

    const queue = [];
    queue.push(this._root);
    all_circles.push(new Circle(initial_x, initial_y, radius, circleColor, this._root.getKey()));
    while (queue.length > 0) {
        let currentNode = queue.shift();
        if (currentNode.getLeft() != null) {
            queue.push(currentNode.getLeft());
            let temp;
            if (currentNode === this._root) {
                temp = initial_update(currentNode.getLeft().getKey(), currentNode);
            } else {
                temp = pre_updateParameters(currentNode.getLeft().getKey(), currentNode);
            }
            let childNode = new Circle(temp[0], temp[1], radius, circleColor, currentNode.getLeft().getKey());
            all_circles.push(childNode);
            all_edges.push(new Edge(childNode, currentNode));
        }
        if (currentNode.getRight() != null) {
            queue.push(currentNode.getRight());
            let temp;
            if (currentNode === this._root) {
                temp = initial_update(currentNode.getRight().getKey(), currentNode);
            } else {
                temp = pre_updateParameters(currentNode.getRight().getKey(), currentNode);
            }
            let childNode = new Circle(temp[0], temp[1], radius, circleColor, currentNode.getRight().getKey());
            all_circles.push(childNode);
            all_edges.push(new Edge(childNode, currentNode));
        }
    }
    drawWholeTree();
}

// Collect info and draw the animation process and final tree
AVL.prototype.LevelOrderDrawInsideTree = function () {
    // Set up
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    prev_circles = all_circles;
    prev_edges = all_edges;
    rotation_content = [];
    all_circles = [];
    all_edges = [];

    const queue = [];
    queue.push(this._root);
    all_circles.push(new Circle(initial_x, initial_y, radius, circleColor, this._root.getKey()));
    let rotation_root = rotationNodes(all_circles[all_circles.length - 1], prev_circles);
    if (rotation_root != null) {
        rotation_content.push(rotation_root);
    }
    while (queue.length > 0) {
        let currentNode = queue.shift();
        if (currentNode.getLeft() != null) {
            queue.push(currentNode.getLeft());
            let temp;
            if (currentNode === this._root) {
                temp = initial_update(currentNode.getLeft().getKey(), currentNode);
            } else {
                temp = pre_updateParameters(currentNode.getLeft().getKey(), currentNode);
            }
            let childNode = new Circle(temp[0], temp[1], radius, circleColor, currentNode.getLeft().getKey());
            let rotation_node = rotationNodes(childNode, prev_circles);
            if (rotation_node != null) {
                rotation_content.push(rotation_node);
            }
            all_circles.push(childNode);
            all_edges.push(new Edge(childNode, currentNode));
        }
        if (currentNode.getRight() != null) {
            queue.push(currentNode.getRight());
            let temp;
            if (currentNode === this._root) {
                temp = initial_update(currentNode.getRight().getKey(), currentNode);
            } else {
                temp = pre_updateParameters(currentNode.getRight().getKey(), currentNode);
            }
            let childNode = new Circle(temp[0], temp[1], radius, circleColor, currentNode.getRight().getKey());
            let rotation_node = rotationNodes(childNode, prev_circles);
            if (rotation_node != null) {
                rotation_content.push(rotation_node);
            }
            all_circles.push(childNode);
            all_edges.push(new Edge(childNode, currentNode));
        }
    }
    rotationAnimation(performance.now());
    drawWholeTree();
}

// Execute Input/Delete when users click Enter
document.getElementById("numInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("InputBtn").click();
    }
});

document.getElementById("numDelete").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("DeleteBtn").click();
    }
});

// Delete content after input
document.getElementById("InputBtn").addEventListener("click", function handleClick(event) {
    event.preventDefault();
    const numInput = document.getElementById("numInput");
    numInput.value = "";
    numInput.placeholder = "Enter Key";
});

document.getElementById("DeleteBtn").addEventListener("click", function handleClick(event) {
    event.preventDefault();
    const numDelete = document.getElementById("numDelete");
    numDelete.value = "";
    numDelete.placeholder = "Enter Key";
});

// for async function to achieve sleep functionality
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* Functions that are not currently using */
AVL.prototype.getRoot = function () {
    return this._root;
}

function LevelOrderDraw(tree) {
    // Set up
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    let prev_circles = all_circles;
    all_circles = [];
    all_edges = [];

    const queue = [];
    queue.push(tree.getRoot());
    all_circles.push(new Circle(initial_x, initial_y, radius, circleColor, tree.getRoot().getKey(), null));
    while (queue.length > 0) {
        let currentNode = queue.shift();
        if (currentNode.getLeft() != null) {
            queue.push(currentNode.getLeft());
            let temp;
            if (currentNode === tree.getRoot()) {
                temp = initial_update(currentNode.getLeft().getKey(), currentNode);
            } else {
                temp = pre_updateParameters(currentNode.getLeft().getKey(), currentNode);
            }
            let childNode = new Circle(temp[0], temp[1], radius, circleColor, currentNode.getLeft().getKey(),
                currentNode);
            all_circles.push(childNode);
            all_edges.push(new Edge(childNode, currentNode));
        }
        if (currentNode.getRight() != null) {
            queue.push(currentNode.getRight());
            let temp;
            if (currentNode === tree.getRoot()) {
                temp = initial_update(currentNode.getRight().getKey(), currentNode);
            } else {
                temp = pre_updateParameters(currentNode.getRight().getKey(), currentNode);
            }
            let childNode = new Circle(temp[0], temp[1], radius, circleColor, currentNode.getRight().getKey(),
                currentNode);
            all_circles.push(childNode);
            all_edges.push(new Edge(childNode, currentNode));
        }
    }
    drawWholeTree();
}