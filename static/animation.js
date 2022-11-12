// Collect nodes that went through rotation for later animation
function rotationNodes(current, prev_circles) {
    if (!Rotation_status) return null;
    // search if the current inserted node exists in last tree
    const find_prev_circle = (element) => element.getkey() === current.getkey();
    let find_circle = prev_circles.find(find_prev_circle);
    if (find_circle === undefined) return null;
    if (find_circle.getX() === current.getX() && find_circle.getY() === current.getY()) return null;

    return [find_circle, current.getX() - find_circle.getX(), current.getY() - find_circle.getY(),
        find_circle.getX(), find_circle.getY()];
}

// Animation Process
function rotationAnimation(time) {
    if (!Rotation_status) return;
    if (!startTime) {
        startTime = time || performance.now();
    }


    let deltaTime = (time - startTime) / duration;
    let rotation_nodes = rotationSubAnimation(rotation_content, deltaTime);

    // console.log(time);
    // console.log(deltaTime);

    if (deltaTime >= 1) {
        drawWholeTree();
        startTime = null;
        Rotation_status = false;
    } else {
        drawSpecifiedTree(prev_circles, prev_edges, rotation_nodes);
        requestAnimationFrame(rotationAnimation);
    }
}

// Position adjustment during the animation
function rotationSubAnimation(rotation_content, deltaTime) {
    let rotation_nodes = [];
    for (let j = 0; j < rotation_content.length; j++) {
        rotation_content[j][0].setX(rotation_content[j][3] + rotation_content[j][1] * deltaTime);
        rotation_content[j][0].setY(rotation_content[j][4] + rotation_content[j][2] * deltaTime);
        rotation_nodes.push(rotation_content[j][0]);
    }
    return rotation_nodes;
}

// Draw each animation
function drawSpecifiedTree(circles, edges, rotation_nodes) {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    for (let i = 0; i < circles.length; i++) {
        // console.log(circles[i]);
        circles[i].draw(ctx);
        if (edges[i]) {
            // disable edges connecting the rotation nodes
            const find_child = (element) => element.getkey() === edges[i].getChildNode().getkey();
            const find_parent = (element) => element.getkey() === edges[i].getParentNode(circles).getkey();
            if (rotation_nodes.find(find_child) === undefined && rotation_nodes.find(find_parent) === undefined) {
                edges[i].drawLine(ctx, circles);
            }
        }
    }
}