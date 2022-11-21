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

// Start insertion
function getInput() {
    let input = document.getElementById("numInput").value;
    let regex = /(^(-?)\d+$)|(^(-?)\d+\.\d+$)/;
    // Check input validity
    if (!input.match(regex)) {
        printError(new Error("Please enter integer/float."));
        return;
    }
    try {
        tree.insert(Number(input), 0);
    } catch (error) {
        printError(error);
    }
}

// Start deletion
function deleteInput() {
    let input = document.getElementById("numDelete").value;
    let regex = /(^(-?)\d+$)|(^(-?)\d+\.\d+$)/;
    // Check input validity
    if (!input.match(regex)) {
        printError(new Error("Please enter integer/float."));
        return;
    }
    try {
        tree.remove(Number(input), 0);
    } catch (error) {
        printError(error);
        console.log(error);
    }
}

// Clear canvas for reset button
function ResetCanvas() {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    tree = new AVL();
    document.getElementById("explanationTitle").innerHTML = "Current Action: None";
    document.getElementById("explanation").innerHTML =
        "The corresponding explanation will be displayed here. Have fun!";
    document.getElementById("code_display").innerHTML =
        "The corresponding pseudocode will be displayed here.<br><br>Note due to the scale of the canvas, " +
        "any node after level 4 cannot be properly shown.";
}

// Normal clear function
function clearCanvas() {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
}

// Draw method
function drawOnCanvas() {
    if (treeQueue.length > 0) {
        let curr_tree = treeQueue.shift();
        clearCanvas();
        drawTree(curr_tree);
        displayMessage(curr_tree[2][0], curr_tree[2][1], curr_tree[2][2]);
    }
}

// Draw a tree. Disable edges connecting rotation nodes
function drawTree(current) {
    if (current[0] === undefined && current[1] === undefined) return;
    for (let i = 0; i < current[0].length; i++) {
        current[0][i].draw();
        if (current[1][i]) {
            // disable edges connecting the rotation nodes
            const find_child = (element) => element.getkey() === current[1][i].getChildCircle().getkey();
            const find_parent = (element) => element.getkey() === current[1][i].getParentCircle(current[0]).getkey();
            if (current[0].find(find_child) === undefined || current[0].find(find_parent) === undefined) continue;
            if (current[0].find(find_child).getRotationalStatus() === false &&
                current[0].find(find_parent).getRotationalStatus() === false) {
                current[1][i].drawLine(current[0]);
            }
        }
    }
}

// Store the tree before removal
function setPrevPrevTree(root) {
    return levelOrderStoreWithCopy(root);
}

// Store the tree before rotation
function setPrevTree(root) {
    return levelOrderStore(root);
}

// Add drawable trees
function addTreeToQueue(root, prev_set, method_mes, rotation_mes, removal_set) {
    treeQueue = [];
    // pre rotation animation
    prePositionAdjustment(removal_set, prev_set, method_mes);
    let current_set = levelOrderStore(root);
    // rotation animation
    positionAdjustment(prev_set, current_set, rotation_mes);
}

// draw insertion / removal process
function prePositionAdjustment(removal_set, prev_set, method_mes) {
    if (removal_set.length === 0) {
        // for insertion, display tree before rotation
        for (let i = 0; i < framePerMovement * 1.5; i++) {
            treeQueue.push([createArrayCopyCircle(prev_set[0]), createArrayCopyEdge(prev_set[1]), method_mes]);
        }
    } else {
        if (prev_set === undefined) {
            treeQueue.push([undefined, undefined, method_mes]);
            return;
        }
        let prev_circles = prev_set[0];
        let newTempCircle = [], newTempEdges = [], removed_node;
        let prev_removal_circles = createArrayCopyCircle(removal_set[0]);
        let prev_removal_edges = createArrayCopyEdge(removal_set[1]);

        for (let i = 0; i < prev_removal_circles.length; i++) {
            const find_circle = (element) => element.getkey() === prev_removal_circles[i].getkey();
            let prev_one = prev_circles.find(find_circle);
            if (prev_one !== undefined) {
                newTempCircle.push(prev_removal_circles[i]);
            } else {
                removed_node = prev_removal_circles[i];
            }
        }
        for (let i = 0; i < prev_removal_edges.length; i++) {
            if (prev_removal_edges[i].getChildCircle() !== removed_node &&
                prev_removal_edges[i].getParentCircle(prev_removal_circles) !== removed_node) {
                newTempEdges.push(prev_removal_edges[i]);
            }
        }
        prev_removal_circles = newTempCircle;
        prev_removal_edges = newTempEdges;

        // after remove, pre-replacement
        for (let i = 0; i < framePerMovement; i++) {
            treeQueue.push([createArrayCopyCircle(prev_removal_circles), createArrayCopyEdge(prev_removal_edges), method_mes]);
        }

        // if the removal only removes a leaf, no need to do removal animation
        if (removed_node.getCircleParentNode() !== null) {
            if (removed_node.getCircleParentNode().getLeft() === null) {
                if (removed_node.getCircleParentNode().getRight().getLeft() === null &&
                    removed_node.getCircleParentNode().getRight().getRight() === null) {
                    return;
                }
            } else if (removed_node.getCircleParentNode().getRight() === null) {
                if (removed_node.getCircleParentNode().getLeft().getLeft() === null &&
                    removed_node.getCircleParentNode().getLeft().getRight() === null) {
                    return;
                }
            } else {
                if (removed_node.getkey() === removed_node.getCircleParentNode().getLeft().getKey()) {
                    if (removed_node.getCircleParentNode().getLeft().getLeft() === null &&
                        removed_node.getCircleParentNode().getLeft().getRight() === null) {
                        return;
                    }
                } else if (removed_node.getkey() === removed_node.getCircleParentNode().getRight().getKey()) {
                    if (removed_node.getCircleParentNode().getRight().getLeft() === null &&
                        removed_node.getCircleParentNode().getRight().getRight() === null) {
                        return;
                    }
                }
            }
        }

        let removal_circles = createArrayCopyCircle(prev_removal_circles);
        let removal_circles_copy = createArrayCopyCircle(prev_removal_circles);
        let removal_edges = createArrayCopyEdge(prev_removal_edges);

        //removal replacement process
        for (let i = 0; i < framePerMovement; i++) {
            for (let j = 0; j < prev_circles.length; j++) {
                const find_circle = (element) => element.getkey() === prev_circles[j].getkey();
                let removal_one = removal_circles.find(find_circle);
                let removal_copy = removal_circles_copy.find(find_circle);
                let newX = removal_one.getX(), newY = removal_one.getY();
                if (newX !== prev_circles[j].getX() || newY !== prev_circles[j].getY()) {
                    removal_one.setRotationalStatus(true);
                    removal_one.setFillColor("#bed6ec");
                }
                newX = newX + (prev_circles[j].getX() - removal_copy.getX()) / framePerMovement;
                newY = newY + (prev_circles[j].getY() - removal_copy.getY()) / framePerMovement;
                removal_one.setX(newX);
                removal_one.setY(newY);
            }
            // Draw each frame
            treeQueue.push([createArrayCopyCircle(removal_circles), createArrayCopyEdge(removal_edges), method_mes]);
        }
        // Draw the tree after removal
        for (let i = 0; i < framePerMovement; i++) {
            treeQueue.push([createArrayCopyCircle(prev_set[0]), createArrayCopyEdge(prev_set[1]), method_mes]);
        }
    }
}

// Animation Process for rotation
function positionAdjustment(prev_set, current_set, rotation_mes) {
    if (prev_set === undefined) return;
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
        treeQueue.push([createArrayCopyCircle(prev_circles), createArrayCopyEdge(prev_edges), rotation_mes]);
    }
    // Draw the tree after rotation
    treeQueue.push([createArrayCopyCircle(current_set[0]), createArrayCopyEdge(current_set[1]), rotation_mes]);
}

// Position adjustment for nodes == level 1
function initial_update(input, current_parent, circle_list) {
    const find_circle = (element) => element.getkey() === current_parent.getKey();
    let index = circle_list.find(find_circle);
    let curr_x;
    let curr_y = index.getY() * 1.2 + radius * 3;
    let current_key = parseInt(current_parent.getKey(), 10);
    if (input < current_key) {
        curr_x = index.getX() - radius * 11.5 + (index.getY() + radius * 2) * 0.2;
    } else {
        curr_x = index.getX() + radius * 11.5 - (index.getY() + radius * 2) * 0.2;
    }
    return [curr_x, curr_y];
}

// Position adjustment for nodes == level 2
function SecondLevel_updateParameters(input, current_parent, circle_list) {
    const find_circle = (element) => element.getkey() === current_parent.getKey();
    let index = circle_list.find(find_circle);
    let curr_x;
    let curr_y = index.getY() * 1.2 + radius * 3;
    let current_key = parseInt(current_parent.getKey(), 10);
    if (input < current_key) {
        curr_x = index.getX() - radius * 6.5 + (index.getY() + radius * 2) * 0.2;
    } else {
        curr_x = index.getX() + radius * 6.5 - (index.getY() + radius * 2) * 0.2;
    }
    return [curr_x, curr_y];
}

// Position adjustment for nodes > level 2
function pre_updateParameters(input, current_parent, circle_list) {
    const find_circle = (element) => element.getkey() === current_parent.getKey();
    let index = circle_list.find(find_circle);
    let curr_x;
    let curr_y = index.getY() * 1.2 + radius * 3;
    let current_key = parseInt(current_parent.getKey(), 10);
    if (input < current_key) {
        curr_x = index.getX() - radius * 6 + (index.getY() + radius * 2) * 0.3;
    } else {
        curr_x = index.getX() + radius * 6 - (index.getY() + radius * 2) * 0.3;
    }
    return [curr_x, curr_y];
}

// level order store tree
function levelOrderStore(root) {
    if (root === undefined) return;
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
            } else if (root.getLeft() === currentNode || root.getRight() === currentNode) {
                temp = SecondLevel_updateParameters(currentNode.getLeft().getKey(), currentNode, circle_list);
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
            } else if (root.getLeft() === currentNode || root.getRight() === currentNode) {
                temp = SecondLevel_updateParameters(currentNode.getRight().getKey(), currentNode, circle_list);
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

// level order store, but create copies of parent nodes
function levelOrderStoreWithCopy(root) {
    if (root === null || root === undefined) return;
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
            } else if (root.getLeft() === currentNode || root.getRight() === currentNode) {
                temp = SecondLevel_updateParameters(currentNode.getLeft().getKey(), currentNode, circle_list);
            } else {
                temp = pre_updateParameters(currentNode.getLeft().getKey(), currentNode, circle_list);
            }
            let childNode = new Circle(temp[0], temp[1], radius, circleColor, circleFillColor,
                currentNode.getLeft().getKey(), createCopyNode(currentNode), false);
            circle_list.push(childNode);
            edge_list.push(new Edge(childNode, createCopyNode(currentNode)));
        }
        if (currentNode.getRight() != null) {
            queue.push(currentNode.getRight());
            let temp;
            if (currentNode === root) {
                temp = initial_update(currentNode.getRight().getKey(), currentNode, circle_list);
            } else if (root.getLeft() === currentNode || root.getRight() === currentNode) {
                temp = SecondLevel_updateParameters(currentNode.getRight().getKey(), currentNode, circle_list);
            } else {
                temp = pre_updateParameters(currentNode.getRight().getKey(), currentNode, circle_list);
            }
            let childNode = new Circle(temp[0], temp[1], radius, circleColor, circleFillColor,
                currentNode.getRight().getKey(), createCopyNode(currentNode), false);
            circle_list.push(childNode);
            edge_list.push(new Edge(childNode, createCopyNode(currentNode)));
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
            current[i].getkey(), current[i].getCircleParentNode(), current[i].getRotationalStatus()));
    }
    return newArray;
}

// Create a copy of Edge array
function createArrayCopyEdge(current) {
    let newArray = [];
    for (let i = 0; i < current.length; i++) {
        newArray.push(new Edge(current[i].getChildCircle(), current[i].getParentNode()));
    }
    return newArray;
}

// Create a copy of a node
function createCopyNode(current) {
    return new Node(current.getKey(), current.getValue(), current.getLeft(), current.getRight());
}

setInterval(drawOnCanvas, Math.floor(1000 / framePerSecond));