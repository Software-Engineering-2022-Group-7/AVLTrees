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

function getInput() {
    let input = document.getElementById("numInput").value;
	input = parseInt(input, 10);
    tree.insert(input, 0);
	let current_parent = tree.findParent(tree.getRoot(), input);
	// console.log(current_parent);
	let current = null;

	if (current_parent != null) {
		let temp = [];
		if (current_parent === tree.getRoot()) {
			temp = initial_update(input, current_parent);
		} else {
			temp = pre_updateParameters(input, current_parent);
		}
		current = new Circle(temp[0], temp[1], radius, circleColor, input, current_parent);
	} else {
		current = new Circle(initial_x, initial_y, radius, circleColor, input, current_parent);
	}

	all_circles.push(current);
	current.draw(ctx);
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas_width, canvas_height);
	all_circles = [];
	tree = new AVL();
}

function pre_updateParameters(input, current_parent) {
	const find_circle = (element) => element.getkey() === current_parent.getKey();
	let index = all_circles.find(find_circle);
	let curr_x = 0;
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
	let curr_x = 0;
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

function deleteInput() {
	let input = document.getElementById("numDelete");
    tree.remove(input, 0);
}

function deleteDraw() {
	clearCanvas();
	const traversal_results = tree.traversePreOrder();
	for (let i = 0; i < traversal_results.length; i++) {
		console.log(traversal_results);
	}
	// tree = new AVL();
	// all_circles = [];
	// for (let i = 0; i < traversal_results.length; i++) {
	// 	tree.insert(traversal_results[i], 0);
	// }
}

AVL.prototype.findParent = function(currentNode, key) {
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

AVL.prototype.getRoot = function () {
	return this._root;
}