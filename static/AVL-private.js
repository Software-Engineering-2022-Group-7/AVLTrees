/**
 * Returns the balance of a node.
 * @param {Node} currentNode The node to determine the balance of.
 * @return {Number} The difference in the heights of the
 *                  left and right subtrees.
 */
AVL.prototype._getBalance = function (currentNode) {
    if (currentNode == null) {
        return 0;
    }
    const leftHeight = this._getHeightInSubtree(currentNode.getLeft());
    const rightHeight = this._getHeightInSubtree(currentNode.getRight());
    return leftHeight - rightHeight;
};

/**
 * Performs a right rotation on the given node.
 * @param {Node} currentNode The node to perform the rotation on.
 * @return {Node} The node replacing the location of currentNode.
 */
AVL.prototype._rightRotate = function (currentNode) {
    const leftNode = currentNode.getLeft();
    const rightNode = leftNode.getRight();
    leftNode.setRight(currentNode);
    currentNode.setLeft(rightNode);

    return leftNode;
};

/**
 * Performs a left rotation on the given node.
 * @param {Node} currentNode The node to perform the rotation on.
 * @return {Node} The node replacing the location of the given node.
 */
AVL.prototype._leftRotate = function (currentNode) {
    const rightNode = currentNode.getRight();
    const leftNode = rightNode.getLeft();
    rightNode.setLeft(currentNode);
    currentNode.setRight(leftNode);

    return rightNode;
};

/**
 * Given a node, inserts a new node with the provided key into the subtree
 * at the appropriate location. If this function does not throw an exception,
 * it adds a new node to the subtree. If given a null node, it will return a
 * new node with the given key and value.
 * @param {Node} currentNode The root of the subtree.
 * @param {Object} key The key for which we are creating a mapping.
 * @param {Object} value The value for which we are creating a mapping.
 * @return {Node} The new root of the subtree.
 * @throws {RuntimeError} If the provided key already exists in this tree.
 */
AVL.prototype._insertInSubtree = function (currentNode, key, value) {
    if (currentNode == null) {
        return new Node(key, value);
    } else if (currentNode.getKey() === key) {
        throw new Error("The key already exists.");
    } else if (key > currentNode.getKey()) {
        currentNode.setRight(this._insertInSubtree(currentNode.getRight(), key,
            value));
    } else if (key < currentNode.getKey()) {
        currentNode.setLeft(this._insertInSubtree(currentNode.getLeft(), key,
            value));
    }
    const balance = this._getBalance(currentNode);
    if (balance > 1) {
        Rotation_status = true;
        this.LevelOrderDrawBeforeRotation();
        if (key < currentNode.getLeft().getKey()) {
            //left left
            currentNode = this._rightRotate(currentNode);
        } else {
            //left right
            currentNode.setLeft(this._leftRotate(currentNode.getLeft()));
            return this._rightRotate(currentNode);
        }
    }
    if (balance < -1) {
        Rotation_status = true;
        this.LevelOrderDrawBeforeRotation();
        if (key > currentNode.getRight().getKey()) {
            //right right
            currentNode = this._leftRotate(currentNode);
        } else {
            //right left
            currentNode.setRight(this._rightRotate(currentNode.getRight()));
            return this._leftRotate(currentNode);
        }
    }
    return currentNode;
};

/**
 * Given a node, removes the node with the specified key from the subtree. If
 * this function does not throw an exception, it deletes a node from the
 * subtree, reducing the subtree's size by 1. In that case, it will return the
 * new root of this subtree.
 * @param {Node} currentNode The root of the subtree.
 * @param {Object} key The key we are removing from the subtree.
 * @return {Node} The new root of the subtree.
 * @throws {RuntimeError} If the provided key does not exist in this tree.
 */
AVL.prototype._removeFromSubtree = function (currentNode, key) {
    if (currentNode == null) {
        throw new Error("The key does not exist.");
    } else if (key > currentNode.getKey()) {
        currentNode.setRight(this._removeFromSubtree(currentNode.getRight(), key));
    } else if (key < currentNode.getKey()) {
        currentNode.setLeft(this._removeFromSubtree(currentNode.getLeft(), key));
    } else {
        if (currentNode.getLeft() == null && currentNode.getRight() == null) {
            currentNode = null;
        } else if (currentNode.getLeft() == null && currentNode.getRight() != null) {
            currentNode = currentNode.getRight();
        } else if (currentNode.getRight() == null && currentNode.getLeft() != null) {
            currentNode = currentNode.getLeft();
        } else {
            const min = this._getMinInSubtree(currentNode.getRight());
            currentNode.setKey(min[0]);
            currentNode.setValue(min[1]);
            currentNode.setRight(this._removeFromSubtree(currentNode.getRight(),
                min[0]));
        }
    }

    if (currentNode == null) {
        return currentNode;
    }

    const balance = this._getBalance(currentNode);
    //left left
    if (balance > 1 && this._getBalance(currentNode.getLeft()) >= 0) {
        Rotation_status = true;
        this.LevelOrderDrawBeforeRotation();
        return this._rightRotate(currentNode);
    }
    //left right
    if (balance > 1 && this._getBalance(currentNode.getLeft()) < 0) {
        Rotation_status = true;
        this.LevelOrderDrawBeforeRotation();
        currentNode.setLeft(this._leftRotate(currentNode.getLeft()));
        return this._rightRotate(currentNode);
    }
    //right right
    if (balance < -1 && this._getBalance(currentNode.getRight()) <= 0) {
        Rotation_status = true;
        this.LevelOrderDrawBeforeRotation();
        return this._leftRotate(currentNode);
    }
    //right left
    if (balance < -1 && this._getBalance(currentNode.getRight()) > 0) {
        Rotation_status = true;
        this.LevelOrderDrawBeforeRotation();
        currentNode.setRight(this._rightRotate(currentNode.getRight()));
        return this._leftRotate(currentNode);
    }

    return currentNode;
};

/**
 * Given a node, returns the value associated with the given key in the subtree.
 * @param {Node} currentNode The root of the subtree to search.
 * @param {Object} key The key to find.
 * @return {Object} The value associated with that key
 * @throws {RuntimeError} If the key is not found in the subtree.
 */
AVL.prototype._findInSubtree = function (currentNode, key) {
    if (currentNode == null) {
        throw new Error("The key is not found.");
    } else if (currentNode.getKey() === key) {
        return currentNode.getValue();
    }

    if (key > currentNode.getKey()) {
        return this._findInSubtree(currentNode.getRight(), key);
    } else {
        return this._findInSubtree(currentNode.getLeft(), key);
    }
};

/**
 * Determines if a node with a given key exists in the subtree.
 * @param {Node} currentNode The root of the subtree to search.
 * @param {Object} key The key to find.
 * @return {Boolean} true if the key was found.
 */
AVL.prototype._containsInSubtree = function (currentNode, key) {
    if (currentNode == null) {
        return false;
    } else if (currentNode.getKey() === key) {
        return true;
    }

    if (key > currentNode.getKey()) {
        return this._containsInSubtree(currentNode.getRight(), key);
    } else {
        return this._containsInSubtree(currentNode.getLeft(), key);
    }
};

/**
 * Updates the value associated with a given key in the subtree.
 * @param {Node} currentNode The root of the subtree to search.
 * @param {Object} key The key to find.
 * @param {Object} value The new value to associate with the key.
 * @throws {RuntimeError} If the key is not found in the subtree.
 */
AVL.prototype._updateInSubtree = function (currentNode, key, value) {
    if (currentNode == null) {
        throw new Error("The key is not found.");
    } else if (currentNode.getKey() === key) {
        currentNode.setValue(value);
        return;
    }

    if (key > currentNode.getKey()) {
        return this._updateInSubtree(currentNode.getRight(), key, value);
    } else {
        return this._updateInSubtree(currentNode.getLeft(), key, value);
    }
};

/**
 * Given a node, determines the height of the subtree it represents.
 * @param {Node} currentNode The root of the subtree.
 * @return {Number} The height of that subtree.
 */
AVL.prototype._getHeightInSubtree = function (currentNode) {
    if (currentNode == null) {
        return -1;
    }
    const leftHeight = this._getHeightInSubtree(currentNode.getLeft()) + 1;
    const rightHeight = this._getHeightInSubtree(currentNode.getRight()) + 1;
    if (leftHeight >= rightHeight) {
        return leftHeight;
    } else {
        return rightHeight;
    }
};

/**
 * Given a node, determines the maximum key which appears in its subtree.
 * @param {Node} currentNode The root of the subtree.
 * @return {Array} The key-value array pair for the maximum key value that
 *                 appears in that subtree.
 */
AVL.prototype._getMaxInSubtree = function (currentNode) {
    if (currentNode == null) {
        throw new Error("Tree is empty");
    }
    while (currentNode.getRight() != null) {
        currentNode = currentNode.getRight();
    }
    return [currentNode.getKey(), currentNode.getValue()];
};

/**
 * Given a node, determines the minimum key which appears in its subtree.
 * @param {Node} currentNode The root of the subtree.
 * @return {Array} The key-value array pair for the minimum key value that
 *                 appears in that subtree.
 */
AVL.prototype._getMinInSubtree = function (currentNode) {
    if (currentNode == null) {
        throw new Error("Tree is empty");
    }
    while (currentNode.getLeft() != null) {
        currentNode = currentNode.getLeft();
    }
    return [currentNode.getKey(), currentNode.getValue()];
};

/**
 * Constructs a pre-order traversal of the provided subtree, putting the
 * nodes into the provided array.
 * @param {Node} currentNode The root of the subtree to traverse.
 * @param {Array} list The list into which the nodes should be added.
 */
AVL.prototype._buildPreOrderTraversal = function (currentNode, list) {
    const node = [currentNode.getKey(), currentNode.getValue()];
    list.unshift(node);
    if (currentNode.getLeft() != null) {
        this._buildPreOrderTraversal(currentNode.getLeft(), list);
    }
    if (currentNode.getRight() != null) {
        this._buildPreOrderTraversal(currentNode.getRight(), list);
    }
};

/**
 * Constructs a post-order traversal of the provided subtree, putting the
 * nodes into the provided array.
 * @param {Node} currentNode The root of the subtree to traverse.
 * @param {Array} list The list into which the nodes should be added.
 */
AVL.prototype._buildPostOrderTraversal = function (currentNode, list) {
    if (currentNode.getLeft() != null) {
        this._buildPostOrderTraversal(currentNode.getLeft(), list);
    }
    if (currentNode.getRight() != null) {
        this._buildPostOrderTraversal(currentNode.getRight(), list);
    }
    const node = [currentNode.getKey(), currentNode.getValue()];
    list.unshift(node);
};

/**
 * Constructs an in-order traversal of the provided subtree, putting the
 * nodes into the provided array.
 * @param {Node} currentNode The root of the subtree to traverse.
 * @param {Array} list The list into which the nodes should be added.
 */
AVL.prototype._buildInOrderTraversal = function (currentNode, list) {
    if (currentNode.getLeft() != null) {
        this._buildInOrderTraversal(currentNode.getLeft(), list);
    }
    const node = [currentNode.getKey(), currentNode.getValue()];
    list.unshift(node);
    if (currentNode.getRight() != null) {
        this._buildInOrderTraversal(currentNode.getRight(), list);
    }
};

/**
 * This private helper is used by checkInvariants to ensure that the number of
 * reachable nodes in the AVL matches the data member size.
 * @param {Node} currentNode A node.
 * @return {Number} The number of nodes in the AVL tree.
 */
AVL.prototype._countNodes = function (currentNode) {
    if (currentNode == null) {
        return 0;
    } else {
        return this._countNodes(currentNode.getLeft()) +
            this._countNodes(currentNode.getRight()) + 1;
    }
};

/**
 * Given a root node, display the subtree.
 * @param {Node} currentNode The root of the subtree to display.
 * @param {Number} space The amount of space to print each node with.
 */
AVL.prototype._displayTree = function (currentNode, space) {
    if (currentNode == null) {
        return;
    }
    space += 10;
    this._displayTree(currentNode.getRight(), space);
    document.write("<br>");
    for (let i = 10; i < space; i++) {
        document.write("&nbsp;&nbsp;");
    }
    document.write(currentNode.getKey() + "\n");
    this._displayTree(currentNode.getLeft(), space);
};

/**
 * Checks that all keys in the given subtree are within a provided bound.
 * Throws a runtime error if a problem is found.
 * @param {Node} currentNode A node.
 * @param {Boolean} minApplies True if the minimum bound applies; false if it
 *                             does not.
 * @param {Object} minBound The minimum bound for all keys in this subtree.
 * @param {Boolean} maxApplies True if the maximum bound applies; false if it
 *                             does not.
 * @param {Object} maxBound The maximum bound for all keys in this subtree.
 */
AVL.prototype._verifyKeysBoundedBy = function (currentNode, minApplies, minBound,
                                               maxApplies, maxBound) {
    if (minApplies && currentNode.getKey() < minBound) {
        throw new Error("A node has a right descendent with lesser key");
    }
    if (maxApplies && currentNode.getKey() > maxBound) {
        throw new Error("A node has a left descendent with greater key");
    }
    if (currentNode.getLeft() != null) {
        this._verifyKeysBoundedBy(currentNode.getLeft(), minApplies, minBound, true,
            currentNode.getKey());
    }
    if (currentNode.getRight() != null) {
        this._verifyKeysBoundedBy(currentNode.getRight(), true,
            currentNode.getKey(), maxApplies, maxBound);
    }
};