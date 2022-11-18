// Set up canvas
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

// generate tree queue and tree
let treeQueue = [];
let tree = new AVL();

// canvas parameters
let canvas_height = c.height;
let canvas_width = c.width;
// circle parameters
let startAngle = 0;
let endAngle = Math.PI * 2;
let counterClockwise = false;
let radius = 20;
let circleColor = "black";
let circleFillColor = "white";
let circleFillTextColor = "black";
// initial position
let initial_x = canvas_width / 2;
let initial_y = radius * 2;
// animation parameters
let framePerSecond = 60;
let framePerMovement = 30;
let Rotation_status = false;

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
function ResetCanvas() {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    tree = new AVL();
}

// Normal clear function
function clearCanvas() {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
}

// Draw method
function drawOnCanvas() {
    if (treeQueue.length > 0) {
        let curr_tree = treeQueue.shift();
        console.log("drawOnCanvas");
        clearCanvas();
        drawTree(curr_tree);
    }
}

// Draw a tree. Disable edges connecting rotation nodes
function drawTree(current) {
    for (let i = 0; i < current[0].length; i++) {
        current[0][i].draw();
        if (current[1][i]) {
            // disable edges connecting the rotation nodes
            const find_child = (element) => element.getkey() === current[1][i].getChildNode().getkey();
            const find_parent = (element) => element.getkey() === current[1][i].getParentCircle(current[0]).getkey();
            if (current[0].find(find_child).getRotationalStatus() === false &&
                current[0].find(find_parent).getRotationalStatus() === false) {
                current[1][i].drawLine(current[0]);
            }
        }
    }
}

// Store the tree before rotation
function setPrevTree(root) {
    return levelOrderStore(root);
}

// Add drawable trees
function addTreeToQueue(root, prev_set) {
    treeQueue = [];
    for (let i = 0; i < framePerMovement; i++) {
        treeQueue.push([createArrayCopyCircle(prev_set[0]), createArrayCopyEdge(prev_set[1])]);
    }
    let current_set = levelOrderStore(root);
    positionAdjustment(prev_set, current_set);
}

// Animation Process
function positionAdjustment(prev_set, current_set) {
    let prev_circles = createArrayCopyCircle(prev_set[0]);
    let prev_circles_copy = createArrayCopyCircle(prev_set[0]);
    let prev_edges = createArrayCopyEdge(prev_set[1]);
    let current_circles = current_set[0];

    for (let i = 0; i < framePerMovement; i++) {
        for (let j = 0; j < current_circles.length; j++) {
            const find_circle = (element) => element.getkey() === current_circles[j].getkey();
            let prev_one = prev_circles.find(find_circle);
            let prev_copy = prev_circles_copy.find(find_circle);
            let newX = prev_one.getX(), newY = prev_one.getY();
            if (newX !== current_circles[j].getX() || newY !== current_circles[j].getY()) {
                prev_one.setRotationalStatus(true);
                prev_one.setFillColor("#FDF2E9");
            }
            newX = newX + (current_circles[j].getX() - prev_copy.getX()) / framePerMovement;
            newY = newY + (current_circles[j].getY() - prev_copy.getY()) / framePerMovement;
            prev_one.setX(newX);
            prev_one.setY(newY);
        }
        // Draw each frame
        treeQueue.push([createArrayCopyCircle(prev_circles), createArrayCopyEdge(prev_edges)]);
    }
    // Draw the tree after rotation
    treeQueue.push([createArrayCopyCircle(current_set[0]), createArrayCopyEdge(current_set[1])]);
}

// Position adjustment for nodes > level 1
function pre_updateParameters(input, current_parent, circle_list) {
    const find_circle = (element) => element.getkey() === current_parent.getKey();
    let index = circle_list.find(find_circle);
    let curr_x;
    let curr_y = index.getY() * 1.2 + radius * 3;
    let current_key = parseInt(current_parent.getKey(), 10);
    if (input < current_key) {
        curr_x = index.getX() - radius * 5 + (index.getY() + radius * 2) * 0.2;
        if (Math.abs(curr_x - initial_x) < radius) {
            curr_x = curr_x + radius;
        } else if (curr_x < radius * 1.5) {
            curr_x = curr_x + radius * 2;
        }
    } else {
        curr_x = index.getX() + radius * 5 - (index.getY() + radius * 2) * 0.2;
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
function initial_update(input, current_parent, circle_list) {
    const find_circle = (element) => element.getkey() === current_parent.getKey();
    let index = circle_list.find(find_circle);
    let curr_x;
    let curr_y = index.getY() * 1.2 + radius * 3;
    let current_key = parseInt(current_parent.getKey(), 10);
    if (input < current_key) {
        curr_x = index.getX() - radius * 10 + (index.getY() + radius * 2) * 0.2;
    } else {
        curr_x = index.getX() + radius * 10 - (index.getY() + radius * 2) * 0.2;
    }
    let temp = [];
    temp.push(curr_x);
    temp.push(curr_y);
    return temp;
}

// level order store tree
function levelOrderStore(root) {
    let circle_list = [];
    let edge_list = [];
    const queue = [];

    queue.push(root);
    circle_list.push(new Circle(initial_x, initial_y, radius, circleColor, circleFillColor, root.getKey(), null, false));
    while (queue.length > 0) {
        let currentNode = queue.shift();
        if (currentNode.getLeft() != null) {
            queue.push(currentNode.getLeft());
            let temp;
            if (currentNode === root) {
                temp = initial_update(currentNode.getLeft().getKey(), currentNode, circle_list);
            } else {
                temp = pre_updateParameters(currentNode.getLeft().getKey(), currentNode, circle_list);
            }
            let childNode = new Circle(temp[0], temp[1], radius, circleColor, circleFillColor,
                currentNode.getLeft().getKey(), currentNode, false);
            circle_list.push(childNode);
            edge_list.push(new Edge(childNode, currentNode));
        }
        if (currentNode.getRight() != null) {
            queue.push(currentNode.getRight());
            let temp;
            if (currentNode === root) {
                temp = initial_update(currentNode.getRight().getKey(), currentNode, circle_list);
            } else {
                temp = pre_updateParameters(currentNode.getRight().getKey(), currentNode, circle_list);
            }
            let childNode = new Circle(temp[0], temp[1], radius, circleColor, circleFillColor,
                currentNode.getRight().getKey(), currentNode, false);
            circle_list.push(childNode);
            edge_list.push(new Edge(childNode, currentNode));
        }
    }
    return [circle_list, edge_list];
}

// Create a copy of Circle array
function createArrayCopyCircle(current) {
    let newArray = [];
    for (let i = 0; i < current.length; i++) {
        newArray.push(new Circle(current[i].getX(), current[i].getY(), current[i].getRadius(),
            current[i].getColor(), current[i].getFillColor(),
            current[i].getkey(), current[i].getCircleParent(), current[i].getRotationalStatus()));
    }
    return newArray;
}

// Create a copy of Edge array
function createArrayCopyEdge(current) {
    let newArray = [];
    for (let i = 0; i < current.length; i++) {
        newArray.push(new Edge(current[i].getChildNode(), current[i].getParentNode()));
    }
    return newArray;
}

// for async function to achieve sleep functionality
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

setInterval(drawOnCanvas, Math.floor(1000 / framePerSecond));