/**
 * Creates a new AVL tree.
 */
function AVL() {
    this._size = 0;
    this._root = null;
}

/**
 * Returns the size of the AVL tree.
 * @return {Number} The number of key-value pairs in the data structure.
 */
AVL.prototype.getSize = function () {
    return this._size;
};

/**
 * Returns true if the AVL tree is empty.
 * @return {Boolean} true if there are no elements in the AVL tree.
 */
AVL.prototype.isEmpty = function () {
    return this._size === 0;
};

AVL.prototype.getRoot = function () {
    return this._root;
}

/**
 * Inserts the key-value pair into the AVL tree.
 * @param {Object} key The key for the new mapping.
 * @param {Object} value The value to associate with that key.
 * @throws {RuntimeError} If the key already exists.
 */
AVL.prototype.insert = function (key, value) {
    // after insertion, before rotation
    this._root = this._insertInSubtree(this._root, key, value);
    let prev_set = setPrevTree(this.getRoot());
    let insert_mes = createInsertMes();
    // rotation process
    let rotation_actions = [];
    this._root = this._rotationAdjustment(this._root, rotation_actions);
    let rotation_mes = createRotationMes(rotation_actions, insert_mes);
    // add to animation
    addTreeToQueue(this.getRoot(), prev_set, insert_mes, rotation_mes, []);
    this._size++;
};

/**
 * Deletes the element with given key from the AVL tree.
 * @param {Object} key The key to remove.
 * @throws {RuntimeError} If the key was not already in this AVL tree.
 */
AVL.prototype.remove = function (key) {
    // pre-removal
    let removal_prev_set = setPrevPrevTree(this.getRoot());
    // after removal, before rotation
    let removal_actions = [];
    this._root = this._removeFromSubtree(this._root, key, removal_actions);
    let prev_set = setPrevTree(this.getRoot());
    let delete_mes = createDeleteMes(removal_actions);
    // rotation process
    let rotation_actions = [];
    this._root = this._rotationAdjustment(this._root, rotation_actions);
    let rotation_mes = createRotationMes(rotation_actions, delete_mes);
    // add to animation
    addTreeToQueue(this.getRoot(), prev_set, delete_mes, rotation_mes, removal_prev_set);
    this._size--;
};

/**
 * Finds the element indexed by the given key and updates its value to the
 * provided value parameter.
 * @param {Object} key The key of the mapping to update.
 * @param {Object} value The new value to associate with that key.
 * @throws {RuntimeError} if the key is not found in the AVL tree.
 */
AVL.prototype.update = function (key, value) {
    this._updateInSubtree(this._root, key, value);
};

/**
 * Returns the value associated with the given key.
 * @param {Object} key The key of the mapping to find.
 * @return {Object} The value associated with that key.
 * @throws {RuntimeError} If the key is not found in the AVL tree.
 */
AVL.prototype.get = function (key) {
    return this._findInSubtree(this._root, key);
};

/**
 * Determines if a given key exists in a mapping in this AVL tree.
 * @param {Object} key The key to look for.
 * @return {Boolean} true if item in the AVL tree has this key.
 */
AVL.prototype.contains = function (key) {
    return this._containsInSubtree(this._root, key);
};

/**
 * Obtains an array containing all keys in this AVL tree.
 * @return {Array} An array containing the keys in this AVL Tree.
 */
AVL.prototype.getKeys = function () {
    const list = this.traversePreOrder();
    const keys = [];
    for (let i = 0; i < list.length; i++) {
        keys.push(list[i][0]);
    }
    return keys;
};

/**
 * Obtains an array containing all key-value array pairs in this AVL tree.
 * @return {Array} An array containing the key-value array pairs in the AVL
 *                 tree.
 */
AVL.prototype.getItems = function () {
    return this.traversePreOrder();
};

/**
 * Returns a height for the AVL tree (i.e., the largest depth for any leaf node).
 * @return {Number} The height of this AVL tree (or -1 if the AVL tree is
 *                  empty).
 */
AVL.prototype.getHeight = function () {
    return this._getHeightInSubtree(this._root);
};

/**
 * Returns the largest key in this AVL tree.
 * @return {Object} The maximum key in the AVL tree.
 * @throws {RuntimeError} If this AVL tree is empty.
 */
AVL.prototype.getMaxKey = function () {
    return this._getMaxInSubtree(this._root)[0];
};

/**
 * Returns the smallest key in this AVL tree.
 * @return {Object} The minimum key in the AVL.
 * @throws {RuntimeError} If this AVL tree is empty.
 */
AVL.prototype.getMinKey = function () {
    return this._getMinInSubtree(this._root)[0];
};

/**
 * Obtains a pre-order traversal of the key-value array pairs in this AVL tree.
 * @return {Array} An array containing all key-value array pairs in this AVL
 *                 tree. This array is guaranteed to return the elements in a
 *                 pre-order traversal.
 */
AVL.prototype.traversePreOrder = function () {
    const pairList = [];
    this._buildPreOrderTraversal(this._root, pairList);
    const list = [];
    while (pairList.length !== 0) {
        list.push(pairList.pop());
    }
    return list;
};

/**
 * Obtains a post-order traversal of the key-value array pairs in this AVL tree.
 * @return {Array} An array containing all key-value array pairs in this AVL
 *                 tree. This array is guaranteed to return the elements in a
 *                 post-order traversal.
 */
AVL.prototype.traversePostOrder = function () {
    const pairList = [];
    this._buildPostOrderTraversal(this._root, pairList);
    const list = [];
    while (pairList.length !== 0) {
        list.push(pairList.pop());
    }
    return list;
};

/**
 * Obtains an in-order traversal of the key-value array pairs in this AVL tree.
 * @return {Array} An array containing all key-value array pairs in this AVL
 *                 tree. This array is guaranteed to return the elements in an
 *                 in-order traversal.
 */
AVL.prototype.traverseInOrder = function () {
    const pairList = [];
    this._buildInOrderTraversal(this._root, pairList);
    const list = [];
    while (pairList.length !== 0) {
        list.push(pairList.pop());
    }
    return list;
};

/**
 * Obtains a level-order traversal of the key-value array pairs in this AVL
 * tree.
 * @return {Array} An array containing all key-value array pairs in this AVL
 *                 tree. This array is guaranteed to return the elements in a
 *                 level-order traversal.
 */
AVL.prototype.traverseLevelOrder = function () {
    const list = [];
    const queue = [];

    queue.push(this._root);
    while (queue.length > 0) {
        let currentNode = queue.shift();
        list.push([currentNode.getKey(), currentNode.getValue()]);
        if (currentNode.getLeft() != null) {
            queue.push(currentNode.getLeft());
        }
        if (currentNode.getRight() != null) {
            queue.push(currentNode.getRight());
        }
    }
    return list;
};

/**
 * Displays this AVL tree for testing purposes.
 */
AVL.prototype.displayTree = function () {
    document.write("Tree:");
    this._displayTree(this._root, 0);
    document.write("<br><br>");
};

/**
 * This verifies that the AVL tree is the proper size and also checks that the
 * BST property holds throughout the entire tree.
 * @throws {RuntimeError} If inconsistencies are found.
 */
AVL.prototype.checkInvariants = function () {
    if (this._countNodes(this._root) !== this._size) {
        throw new Error("Problem in AVL: Node count doesn't match tree size");
    }
    if (this._root != null) {
        this._verifyKeysBoundedBy(this._root, false, this._root.getKey(), false,
            this._root.getKey());
    }
};

/**
 * Creates a new node.
 * @param {Object} key The key of the new node.
 * @param {Object} value The value of the new node.
 * @param {Node} left Optionally, the left child node.
 * @param {Node} right Optionally, the right child node.
 */
function Node(key, value, left, right) {
    this._key = key;
    this._value = value;
    if (left !== undefined) {
        this._left = left;
    } else {
        this._left = null;
    }
    if (right !== undefined) {
        this._right = right;
    } else {
        this._right = null;
    }
}

/**
 * Returns the key of this node.
 * @return {Object} The key.
 */
Node.prototype.getKey = function () {
    return this._key;
}

/**
 * Sets the key of this node.
 * @param {Object} newKey The new key.
 */
Node.prototype.setKey = function (newKey) {
    this._key = newKey;
}

/**
 * Returns the value of this node.
 * @return {Object} The value.
 */
Node.prototype.getValue = function () {
    return this._value;
}

/**
 * Sets the value of this node.
 * @param {Object} newValue The new value.
 */
Node.prototype.setValue = function (newValue) {
    this._value = newValue;
}

/**
 * Returns the left child node of this node.
 * @return {Node} The left child node.
 */
Node.prototype.getLeft = function () {
    return this._left;
}

/**
 * Sets the left child node of this node.
 * @param {Node} newLeft The new left child node.
 */
Node.prototype.setLeft = function (newLeft) {
    this._left = newLeft;
}

/**
 * Returns the right child node of this node.
 * @return {Node} The right child node.
 */
Node.prototype.getRight = function () {
    return this._right;
}

/**
 * Sets the right child node of this node.
 * @param {Node} newRight The new right child node.
 */
Node.prototype.setRight = function (newRight) {
    this._right = newRight;
}
