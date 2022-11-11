// Set up canvas
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

// generate the circle list and the tree
let all_circles = [];
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
    LevelOrderDraw(tree);
}

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
    LevelOrderDraw(tree);
}

function LevelOrderDraw(tree) {
    // Set up
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    all_circles = [];

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
            all_circles.push(new Circle(temp[0], temp[1], radius, circleColor, currentNode.getLeft().getKey(),
                currentNode))
        }
        if (currentNode.getRight() != null) {
            queue.push(currentNode.getRight());
            let temp;
            if (currentNode === tree.getRoot()) {
                temp = initial_update(currentNode.getRight().getKey(), currentNode);
            } else {
                temp = pre_updateParameters(currentNode.getRight().getKey(), currentNode);
            }
            all_circles.push(new Circle(temp[0], temp[1], radius, circleColor, currentNode.getRight().getKey(),
                currentNode))
        }
    }
    drawWholeTree();
}

function drawWholeTree() {
    for (let i = 0; i < all_circles.length; i++) {
        all_circles[i].draw(ctx);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    all_circles = [];
    tree = new AVL();
}

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

AVL.prototype.getRoot = function () {
    return this._root;
}

AVL.prototype.findParent = function (currentNode, key) {
    if (currentNode == null) {
        return null;
    } else if (currentNode.getLeft() != null && currentNode.getLeft().getKey() === key) {
        return currentNode;
    } else if (currentNode.getRight() != null && currentNode.getRight().getKey() === key) {
        return currentNode;
    }

    if (key > currentNode.getKey()) {
        return this.findParent(currentNode.getRight(), key);
    } else {
        return this.findParent(currentNode.getLeft(), key);
    }
}

// Execute Input/Delete when users click Enter
document.getElementById("numInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("InputBtn").click();
  }
});

document.getElementById("numDelete").addEventListener("keypress", function(event) {
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