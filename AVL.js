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
AVL.prototype.getSize = function() {
  return this._size;
};

/**
 * Returns true if the AVL tree is empty.
 * @return {Boolean} true if there are no elements in the AVL tree.
 */
AVL.prototype.isEmpty = function() {
  return this._size == 0;
};

/**
 * Inserts the key-value pair into the AVL tree.
 * @param {Object} key The key for the new mapping.
 * @param {Object} value The value to associate with that key.
 * @throws {RuntimeError} If the key already exists.
 */
AVL.prototype.insert = function(key, value) {
  this._root = this._insertInSubtree(this._root, key, value);
  this._size++;
};

/**
 * Finds the element indexed by the given key and updates its value to the
 * provided value parameter.
 * @param {Object} key The key of the mapping to update.
 * @param {Object} value The new value to associate with that key.
 * @throws {RuntimeError} if the key is not found in the AVL tree.
 */
AVL.prototype.update = function(key, value) {
  this._updateInSubtree(this._root, key, value);
};

/**
 * Returns the value associated with the given key.
 * @param {Object} key The key of the mapping to find.
 * @return {Object} The value associated with that key.
 * @throws {RuntimeError} If the key is not found in the AVL tree.
 */
AVL.prototype.get = function(key) {
  return this._findInSubtree(this._root, key)
};

/**
 * Determines if a given key exists in a mapping in this AVL tree.
 * @param {Object} key The key to look for.
 * @return {Boolean} true if item in the AVL tree has this key.
 */
AVL.prototype.contains = function(key) {
  return this._containsInSubtree(this._root, key);
};

/**
 * Deletes the element with given key from the AVL tree.
 * @param {Object} key The key to remove.
 * @throws {RuntimeError} If the key was not already in this AVL tree.
 */
AVL.prototype.remove = function(key) {
  this._root = this._removeFromSubtree(this._root, key);
  this._size--;
};

/**
 * Obtains an array containing all keys in this AVL tree.
 * @param {Number} traversal The traversal to use. 0 for pre-order, 1 for
 *                           post-order, 2 for in-order, 3 for level-order.
 *                           If no traversal is provided, the default is
 *                           in-order.
 * @return {Array} An array containing the keys in this AVL Tree.
 */
AVL.prototype.getKeys = function() {
  const list = this.traversePreOrder();
  const keys = new Array();
  for(let i = 0; i < list.length; i++){
    keys.push(list[i][0]);
  }
  return keys;
};

/**
 * Obtains an array containing all key-value array pairs in this AVL tree.
 * @param {Number} traversal The traversal to use. 0 for pre-order, 1 for
 *                  post-order, 2 for in-order, 3 for level-order.
 *                  If no traversal is provided, the default is
 *                  in-order.
 * @return {Array} An array containing the key-value array pairs in the AVL
 *                 tree.
 */
AVL.prototype.getItems = function() {
  return this.traversePreOrder();
};

/**
 * Returns a height for the AVL tree (i.e., largest depth for any leaf node).
 * @return {Number} The height of this AVL tree (or -1 if the AVL tree is
 *                  empty).
 */
AVL.prototype.getHeight = function() {
  return this._getHeightInSubtree(this._root);
};

/**
 * Returns the largest key in this AVL tree.
 * @return {Object} The maximum key in the AVL tree.
 * @throws {RuntimeError} If this AVL tree is empty.
 */
AVL.prototype.getMaxKey = function() {
  return this._getMaxInSubtree(this._root)[0];
};

/**
* Returns the smallest key in this AVL tree.
* @return {Object} The minimum key in the AVL.
* @throws {RuntimeError} If this AVL tree is empty.
*/
AVL.prototype.getMinKey = function() {
  return this._getMinInSubtree(this._root)[0];
};

/**
 * Obtains a pre-order traversal of the key-value array pairs in this AVL tree.
 * @return {Array} An array containing all key-value array pairs in this AVL
 *                 tree. This array is guaranteed to return the elements in a
 *                 pre-order traversal.
 */
AVL.prototype.traversePreOrder = function() {
  const pairList = new Array();
  this._buildPreOrderTraversal(this._root, pairList);
  const list = new Array();
  while(pairList.length != 0) {
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
AVL.prototype.traversePostOrder = function() {
  const pairList = new Array();
  this._buildPostOrderTraversal(this._root, pairList);
  const list = new Array();
  while(pairList.length != 0) {
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
AVL.prototype.traverseInOrder = function() {
  const pairList = new Array();
  this._buildInOrderTraversal(this._root, pairList);
  const list = new Array();
  while(pairList.length != 0) {
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
AVL.prototype.traverseLevelOrder = function() {
  const list = new Array();
  const queue = new Array();
  const nodeCount = this._countNodes(this._root);

  queue.push(this._root);
  while(queue.length > 0) {
    currentNode = queue.shift();
    list.push([currentNode.getKey(), currentNode.getValue()]);
    if(currentNode.getLeft() != null) {
      queue.push(currentNode.getLeft());
    }
    if(currentNode.getRight() != null) {
      queue.push(currentNode.getRight());
    }
  }
  return list;
};

/**
 * Displays this AVL tree for testing purposes.
 */
AVL.prototype.displayTree = function() {
  document.write("Tree:");
  this._displayTree(this._root, 0);
  document.write("<br><br>");
};

/**
* This verifies that the AVL tree is the proper size and also checks that the
* BST property holds throughout the entire tree.
* @throws {RuntimeError} If inconsistencies are found.
*/
AVL.prototype.checkInvariants = function() {
  if(this._countNodes(this._root) != this._size) {
    throw "Problem in AVL: Node count doesn't match tree size";
  }
  if(this._root != null) {
    this._verifyKeysBoundedBy(this._root, false, this._root.getKey(), false,
                              this._root.getKey());
  }
};

/**
 * Returns the balance of a node.
 * @param {Node} currentNode The node to determine the balance of.
 * @return {Number} The difference in the heights of the
 *                  left and right subtrees.
 */
AVL.prototype._getBalance = function(currentNode) {
  if(currentNode == null){
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
AVL.prototype._rightRotate = function(currentNode) {
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
AVL.prototype._leftRotate = function(currentNode) {
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
AVL.prototype._insertInSubtree = function(currentNode, key, value) {
  if(currentNode == null) {
    const newNode = new Node(key, value);
    return newNode;
  } else if(currentNode.getKey() == key) {
    throw "The key already exists.";
  } else if(key > currentNode.getKey()) {
    currentNode.setRight(this._insertInSubtree(currentNode.getRight(), key,
                                               value));
  } else if(key < currentNode.getKey()) {
    currentNode.setLeft(this._insertInSubtree(currentNode.getLeft(), key,
                                              value));
  }
  const balance = this._getBalance(currentNode);
  if(balance > 1) {
    if(key < currentNode.getLeft().getKey()) {
      //left left
      currentNode = this._rightRotate(currentNode);
    } else {
      //left right
      currentNode.setLeft(this._leftRotate(currentNode.getLeft()));
      return this._rightRotate(currentNode);
    }
  }
  if(balance < -1) {
    if(key > currentNode.getRight().getKey()) {
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
AVL.prototype._removeFromSubtree = function(currentNode, key) {
  if(currentNode == null) {
    throw "The key does not exist.";
  } else if(key > currentNode.getKey()) {
    currentNode.setRight(this._removeFromSubtree(currentNode.getRight(), key));
    // return currentNode;
  } else if (key < currentNode.getKey()) {
    currentNode.setLeft(this._removeFromSubtree(currentNode.getLeft(), key));
    // return currentNode;
  } else {
    if(currentNode.getLeft() == null && currentNode.getRight() == null) {
      currentNode = null;
      // return currentNode;
    } else if(currentNode.getLeft() == null && currentNode.getRight() != null) {
      currentNode = currentNode.getRight();
    } else if(currentNode.getRight() == null && currentNode.getLeft() != null) {
      currentNode = currentNode.getLeft();
    } else {
      const min = this._getMinInSubtree(currentNode.getRight());
      currentNode.setKey(min[0]);
      currentNode.setValue(min[1]);
      currentNode.setRight(this._removeFromSubtree(currentNode.getRight(),
                                                  min[0]));
    }
  }

  if(currentNode == null) {
    return currentNode;
  }

  const balance = this._getBalance(currentNode);
  //left left
  if(balance > 1 && this._getBalance(currentNode.getLeft()) >= 0) {
    return this._rightRotate(currentNode);
  }
  //left right
  if(balance > 1 && this._getBalance(currentNode.getLeft()) < 0) {
    currentNode.setLeft(this._leftRotate(currentNode.getLeft()));
    return this._rightRotate(currentNode);
  }
  //right right
  if(balance < -1 && this._getBalance(currentNode.getRight()) <= 0) {
    return this._leftRotate(currentNode);
  }
  //right left
  if(balance < -1 && this._getBalance(currentNode.getRight()) > 0) {
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
AVL.prototype._findInSubtree = function(currentNode, key) {
  if(currentNode == null) {
    throw "The key is not found.";
  } else if(currentNode.getKey() == key) {
    return currentNode.getValue();
  }

  if(key > currentNode.getKey()) {
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
AVL.prototype._containsInSubtree = function(currentNode, key) {
  if(currentNode == null) {
    return false;
  } else if(currentNode.getKey() == key) {
    return true;
  }

  if(key > currentNode.getKey()) {
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
AVL.prototype._updateInSubtree = function(currentNode, key, value) {
  if(currentNode == null) {
    throw "The key is not found.";
  } else if (currentNode.getKey() == key) {
    currentNode.setValue(value);
    return;
  }

  if(key > currentNode.getKey()) {
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
AVL.prototype._getHeightInSubtree = function(currentNode) {
  if(currentNode == null) {
    return -1;
  }
  const leftHeight = this._getHeightInSubtree(currentNode.getLeft()) + 1;
  const rightHeight = this._getHeightInSubtree(currentNode.getRight()) + 1;
  if(leftHeight >= rightHeight) {
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
AVL.prototype._getMaxInSubtree = function(currentNode) {
  if(currentNode == null) {
    throw "Tree is empty";
  }
  while(currentNode.getRight() != null) {
    currentNode = currentNode.getRight();
  }
  return new Array(currentNode.getKey(), currentNode.getValue());
};

/**
 * Given a node, determines the minimum key which appears in its subtree.
 * @param {Node} currentNode The root of the subtree.
 * @return {Array} The key-value array pair for the minimum key value that
 *                 appears in that subtree.
 */
AVL.prototype._getMinInSubtree = function(currentNode) {
  if(currentNode == null) {
    throw "Tree is empty";
  }
  while(currentNode.getLeft() != null) {
    currentNode = currentNode.getLeft();
  }
  return new Array(currentNode.getKey(), currentNode.getValue());
};

/**
 * Constructs a pre-order traversal of the provided subtree, putting the
 * nodes into the provided array.
 * @param {Node} currentNode The root of the subtree to traverse.
 * @param {Array} list The list into which the nodes should be added.
 */
AVL.prototype._buildPreOrderTraversal = function(currentNode, list) {
  node = [currentNode.getKey(), currentNode.getValue()];
  list.unshift(node);
  if(currentNode.getLeft() != null) {
    this._buildPreOrderTraversal(currentNode.getLeft(), list);
  }
  if(currentNode.getRight() != null) {
    this._buildPreOrderTraversal(currentNode.getRight(), list);
  }
};

/**
 * Constructs a post-order traversal of the provided subtree, putting the
 * nodes into the provided array.
 * @param {Node} currentNode The root of the subtree to traverse.
 * @param {Array} list The list into which the nodes should be added.
 */
AVL.prototype._buildPostOrderTraversal = function(currentNode, list) {
  if(currentNode.getLeft() != null) {
    this._buildPostOrderTraversal(currentNode.getLeft(), list);
  }
  if(currentNode.getRight() != null) {
    this._buildPostOrderTraversal(currentNode.getRight(), list);
  }
  node = [currentNode.getKey(), currentNode.getValue()];
  list.unshift(node);
};

/**
 * Constructs an in-order traversal of the provided subtree, putting the
 * nodes into the provided array.
 * @param {Node} currentNode The root of the subtree to traverse.
 * @param {Array} list The list into which the nodes should be added.
 */
AVL.prototype._buildInOrderTraversal = function(currentNode, list) {
  if(currentNode.getLeft() != null) {
    this._buildInOrderTraversal(currentNode.getLeft(), list);
  }
  node = [currentNode.getKey(), currentNode.getValue()];
  list.unshift(node);
  if(currentNode.getRight() != null) {
    this._buildInOrderTraversal(currentNode.getRight(), list);
  }
};

/**
 * This private helper is used by checkInvariants to ensure that the number of
 * reachable nodes in the AVL matches the data member size.
 * @param {Node} currentNode A node.
 * @return {Number} The number of nodes in the AVL tree.
 */
AVL.prototype._countNodes = function(currentNode) {
  if(currentNode == null) {
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
AVL.prototype._displayTree = function(currentNode, space) {
  if(currentNode == null) {
    return;
  }
  space += 10;
  this._displayTree(currentNode.getRight(), space);
  document.write("<br>");
  for(let i = 10; i < space; i++) {
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
AVL.prototype._verifyKeysBoundedBy = function(currentNode, minApplies, minBound,
                                              maxApplies, maxBound) {
  if(minApplies && currentNode.getKey() < minBound) {
    throw "A node has a right descendent with lesser key";
  }
  if(maxApplies && currentNode.getKey() > maxBound) {
    throw "A node has a left descendent with greater key";
  }
  if(currentNode.getLeft() != null) {
    this._verifyKeysBoundedBy(currentNode.getLeft(), minApplies, minBound, true,
                              currentNode.getKey());
  }
  if(currentNode.getRight() != null) {
    this._verifyKeysBoundedBy(currentNode.getRight(), true,
                              currentNode.getKey(), maxApplies, maxBound);
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
  if(left != undefined) {
    this._left = left;
  } else {
    this._left = null;
  }
  if(right != undefined) {
    this._right = right;
  } else {
    this._right = null;
  }
}

/**
* Returns the key of this node.
* @return {Object} The key.
*/
Node.prototype.getKey = function() {
  return this._key;
}

/**
* Sets the key of this node.
* @param {Object} newKey The new key.
*/
Node.prototype.setKey = function(newKey) {
  this._key = newKey;
}

/**
* Returns the value of this node.
* @return {Object} The value.
*/
Node.prototype.getValue = function() {
  return this._value;
}

/**
* Sets the value of this node.
* @param {Object} newValue The new value.
*/
Node.prototype.setValue = function(newValue) {
  this._value = newValue;
}

/**
* Returns the left child node of this node.
* @return {Node} The left child node.
*/
Node.prototype.getLeft = function() {
  return this._left;
}

/**
* Sets the left child node of this node.
* @param {Node} newLeft The new left child node.
*/
Node.prototype.setLeft = function(newLeft) {
  this._left = newLeft;
}

/**
* Returns the right child node of this node.
* @return {Node} The right child node.
*/
Node.prototype.getRight = function() {
  return this._right;
}

/**
* Sets the right child node of this node.
* @param {Node} newRight The new right child node.
*/
Node.prototype.setRight = function(newRight) {
  this._right = newRight;
}

/** ------------ TESTS ------------*/
/**
              6
            /  \
           2    7
          / \    \
         1   4    9
            /
          3
*/
// function makeExampleAVL() {
//   const tree = new AVL();
//   tree.insert("6", 6);
//   tree.insert("2", 2);
//   tree.insert("7", 7);
//   tree.insert("1", 1);
//   tree.insert("4", 4);
//   tree.insert("9", 9);
//   tree.insert("3", 3);
//   return tree;
// }

// function inLeftLeftAVL() {
//   const tree = new AVL();
//   tree.insert("3", 3);
//   tree.displayTree();
//   tree.insert("2", 2);
//   tree.displayTree();
//   tree.insert("1", 1);
//   tree.displayTree();
//   return tree;
// }

// function inRightRightAVL() {
//   const tree = new AVL();
//   tree.insert("1", 1);
//   tree.displayTree();
//   tree.insert("2", 2);
//   tree.displayTree();
//   tree.insert("3", 3);
//   tree.displayTree();
//   return tree;
// }

// function inLeftRightAVL() {
//   const tree = new AVL();
//   tree.insert("3", 3);
//   tree.displayTree();
//   tree.insert("1", 1);
//   tree.displayTree();
//   tree.insert("2", 2);
//   tree.displayTree();
//   return tree;
// }

// function inRightLeftAVL() {
//   const tree = new AVL();
//   tree.insert("1", 1);
//   tree.displayTree();
//   tree.insert("3", 3);
//   tree.displayTree();
//   tree.insert("2", 2);
//   tree.displayTree();
//   return tree;
// }

// function reLeftLeftAVL() {
//   const tree = new AVL();
//   tree.insert("3", 3);
//   tree.displayTree();
//   tree.insert("4", 4);
//   tree.displayTree();
//   tree.insert("2", 2);
//   tree.displayTree();
//   tree.insert("1", 1);
//   tree.displayTree();
//   tree.remove("4");
//   tree.displayTree();
//   return tree;
// }

// function reRightRightAVL() {
//   const tree = new AVL();
//   tree.insert("2", 2);
//   tree.displayTree();
//   tree.insert("1", 1);
//   tree.displayTree();
//   tree.insert("3", 3);
//   tree.displayTree();
//   tree.insert("4", 4);
//   tree.displayTree();
//   tree.remove("1");
//   tree.displayTree();
//   return tree;
// }

// function reLeftRightAVL() {
//   const tree = new AVL();
//   tree.insert("3", 3);
//   tree.displayTree();
//   tree.insert("4", 4);
//   tree.displayTree();
//   tree.insert("1", 1);
//   tree.displayTree();
//   tree.insert("2", 2);
//   tree.displayTree();
//   tree.remove("4");
//   tree.displayTree();
//   return tree;
// }

// function reRightLeftAVL() {
//   const tree = new AVL();
//   tree.insert("2", 2);
//   tree.displayTree();
//   tree.insert("1", 1);
//   tree.displayTree();
//   tree.insert("4", 4);
//   tree.displayTree();
//   tree.insert("3", 3);
//   tree.displayTree();
//   tree.remove("1");
//   tree.displayTree();
//   return tree;
// }

/** emptyAVL */
// const tree = new AVL();
// size = (tree.getSize() == 0);
// empty = (tree.isEmpty() == true);
// console.log(size && empty);
// tree.checkInvariants();

/** exampleAVL */
// const tree = makeExampleAVL();
// for (let i = 1; i <= 9; i++) {
//   if (i != 5 && i != 8) {
//     console.log(String(i) == tree.get(i));
//   }
// }
// tree.checkInvariants();

/** inLeftLeftAVL*/
// const tree = inLeftLeftAVL();
// tree.checkInvariants();

/** inRightRightAVL*/
// const tree = inRightRightAVL();
// tree.checkInvariants();

/** inLeftRightAVL*/
// const tree = inLeftRightAVL();
// tree.checkInvariants();

/** inRightLeftAVL*/
// const tree = inRightLeftAVL();
// tree.checkInvariants();

/** exampleAVLSize */
// const tree = makeExampleAVL();
// console.log(7 == tree.getSize());
// console.log(!tree.isEmpty());
// tree.checkInvariants();

/** update */
// const tree = makeExampleAVL();
// tree.update("1", 3);
// console.log(3 == tree.get("1"));
// tree.update("1", 5);
// console.log(5 == tree.get("1"));
// tree.update("2", 1);
// console.log(1 == tree.get("2"));
// tree.checkInvariants();

/** contains */
// const tree = makeExampleAVL();
// console.log(true == tree.contains("1"));
// console.log(false == tree.contains("10"));
// tree.checkInvariants();

/** remove */
// const tree = makeExampleAVL();
// tree.remove("6");
// console.log(false == tree.contains("6"));
// tree.remove("7");
// console.log(false == tree.contains("7"));
// tree.displayTree();
// tree.checkInvariants();

/** reLeftLeftAVL*/
// const tree = reLeftLeftAVL();
// tree.checkInvariants();

/** reRightRightAVL*/
// const tree = reRightRightAVL();
// tree.checkInvariants();

/** reLeftRightAVL*/
// const tree = reLeftRightAVL();
// tree.checkInvariants();

/** reRightLeftAVL*/
// const tree = reRightLeftAVL();
// tree.checkInvariants();

/** getKeys */
// const tree = makeExampleAVL();
// const realKeys = tree.getKeys();
// const expectedKeys = ["6", "2", "1", "4", "3", "7", "9"];
// console.log(expectedKeys.length == realKeys.length);
// for(let i = 0; i < expectedKeys.length; i++){
//   console.log(expectedKeys[i] == realKeys[i]);
// }
// tree.checkInvariants();

/** getItems */
// const tree = makeExampleAVL();
// const realItems = tree.getItems();
// const expectedItems = [["6", 6], ["2", 2], ["1", 1], ["4", 4], ["3", 3],
//                       ["7", 7], ["9", 9]];
// console.log(expectedItems.length == realItems.length);
// for(let i = 0; i < expectedItems.length; i++){
//   console.log(expectedItems[i][0] == realItems[i][0] && expectedItems[i][1] == realItems[i][1]);
// }
// tree.checkInvariants();

/** getHeight */
// const tree = makeExampleAVL();
// console.log(3 == tree.getHeight());
// const emptyTree = new AVL();
// console.log(-1 == emptyTree.getHeight());
// tree.checkInvariants();

/** getMax */
// const tree = makeExampleAVL();
// console.log("9" == tree.getMaxKey());
// tree.checkInvariants();

/** getMin */
// const tree = makeExampleAVL();
// console.log("1" == tree.getMinKey());
// tree.checkInvariants();

/** ExamplePreOrderTraversal */
// const tree = makeExampleAVL();
// const realTraversal = tree.traversePreOrder();
// const expectedTraversal = [["6", 6], ["2", 2], ["1", 1], ["4", 4], ["3", 3],
//                           ["7", 7], ["9", 9]];
// console.log(expectedTraversal.length == realTraversal.length);
// for(let i = 0; i < expectedTraversal.length; i++){
//   console.log(expectedTraversal[i][0] == realTraversal[i][0] &&
//               expectedTraversal[i][1] == realTraversal[i][1]);
// }
// tree.checkInvariants();

/** ExamplePostOrderTraversal */
// const tree = makeExampleAVL();
// const realTraversal = tree.traversePostOrder();
// const expectedTraversal = [["1", 1], ["3", 3], ["4", 4], ["2", 2], ["9", 9],
//                           ["7", 7], ["6", 6]];
// console.log(expectedTraversal.length == realTraversal.length);
// for(let i = 0; i < expectedTraversal.length; i++){
//   console.log(expectedTraversal[i][0] == realTraversal[i][0] &&
//               expectedTraversal[i][1] == realTraversal[i][1]);
// }
// tree.checkInvariants();

/** ExampleInOrderTraversal */
// const tree = makeExampleAVL();
// const realTraversal = tree.traverseInOrder();
// const expectedTraversal = [["1", 1], ["2", 2], ["3", 3], ["4", 4], ["6", 6],
//                           ["7", 7], ["9", 9]];
// console.log(expectedTraversal.length == realTraversal.length);
// for(let i = 0; i < expectedTraversal.length; i++){
//   console.log(expectedTraversal[i][0] == realTraversal[i][0] &&
//               expectedTraversal[i][1] == realTraversal[i][1]);
// }
// tree.checkInvariants();

/** ExampleLevelOrderTraversal */
// const tree = makeExampleAVL();
// const realTraversal = tree.traverseLevelOrder();
// const expectedTraversal = [["6", 6], ["2", 2], ["7", 7], ["1", 1], ["4", 4],
//                           ["9", 9], ["3", 3]];
// console.log(expectedTraversal.length == realTraversal.length);
// for(let i = 0; i < expectedTraversal.length; i++){
//   console.log(expectedTraversal[i][0] == realTraversal[i][0] &&
//               expectedTraversal[i][1] == realTraversal[i][1]);
// }
// tree.checkInvariants();
