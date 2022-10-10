function AVL() {
  this._size = 0;
  this._root = null;
}

AVL.prototype.getSize = function() {
  return this._size;
};

AVL.prototype.isEmpty = function() {
  return this._size == 0;
};

AVL.prototype.insert = function(key, value) {
  this._root = insertInSubtree(this._root, key, value);
  this._size++;
};

AVL.prototype.update = function(key, value) {

};

AVL.prototype.get = function(key) {

};

AVL.prototype.contains = function(key) {

};

AVL.prototype.remove = function(key) {

};

AVL.prototype.getKeys = function() {

};

AVL.prototype.getItems = function() {

};

AVL.prototype.getHeight = function() {

};

AVL.prototype.getMaxKey = function() {

};

AVL.prototype.getMinKey = function() {

};

AVL.prototype.getHeight = function() {

};

AVL.prototype.traverseInOrder = function() {

};

AVL.prototype.traverseLevelOrder = function() {

};

AVL.prototype.traversePreOrder = function() {

};

AVL.prototype.traversePostOrder = function() {

};

AVL.prototype.checkInvariants = function() {
  if(this._countNodes(this._root) != this._size) {
    throw "Problem in BST: Node count doesn't match tree size";
  }
  if(this._root != null) {
    this._verifyKeysBoundedBy(this._root, false, this._root.getKey(), false, this._root.getKey());
  }
};

AVL.prototype._getBalance = function(currentNode) {
  if(currentNode == null){
    return 0;
  }
  const leftHeight = getHeightInSubtree(currentNode.getLeft());
  const rightHeight = getHeightInSubtree(currentNode.getRight());
  return leftHeight - rightHeight;
};

AVL.prototype._rightRotate = function(currentNode) {
  const leftNode = currentNode.getLeft();
  const rightNode = currentNode.getRight();
  left.setRight(currentNode);
  currentNode.setLeft(right);

  return left;
};

AVL.prototype._leftRotate = function(currentNode) {
  const leftNode = currentNode.getLeft();
  const rightNode = currentNode.getRight();
  right.setLeft(currentNode);
  currentNode.setRight(left);

  return right;
};

AVL.prototype._insertInSubtree = function(currentNode, key, value) {
  if(currentNode == null) {
    const newNode = new Node(key, value);
    return newNode;
  } else if(currentNode.getKey() == key) {
    throw "The key already exists.";
  } else if(key > currentNode.getKey()) {
    currentNode.setRight(insertInSubtree(currentNode.getRight(), key, value));
  } else if(key < currentNode.getKey()) {
    currentNode.setLeft(insertInSubtree(currentNode.getLeft(), key, value));
  }
  const balance = this._getBalance(currentNode);
  if(balance > 1 && key < currentNode.getLeft().getKey()) {
    return this._rightRotate(currentNode);
  }
  if(balance < -1 && key > currentNode.getLeft().getKey()) {
    return this._leftRotate(currentNode);
  }
  if(balance > 1 && key > currentNode.getLeft().getKey()) {
    currentNode.setLeft(this._leftRotate(currentNode.getLeft()));
    return this._rightRotate(currentNode);
  }
  if(balance < -1 && key < currentNode.getLeft().getKey()) {
    currentNode.setRight(this._rightRotate(currentNode.getRight()));
    return this._lefttRotate(currentNode);
  }

  return current;
};

AVL.prototype._removeFromSubtree = function(currentNode, key) {

};

AVL.prototype._findInSubtree = function(currentNode, key) {

};

AVL.prototype._containsInSubtree = function(currentNode, key) {

};

AVL.prototype._updateInSubtree = function(currentNode, key, value) {

};

AVL.prototype._getHeightInSubtree = function(currentNode) {
  if(current == null) {
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

AVL.prototype._getMinInSubtree = function(currentNode) {

};

AVL.prototype._getMaxInSubtree = function(currentNode) {

};

AVL.prototype._buildInOrderTraversal = function() {

};

AVL.prototype._buildLevelOrderTraversal = function() {

};

AVL.prototype._buildPreOrderTraversal = function() {

};

AVL.prototype._buildPostOrderTraversal = function() {

};

AVL.prototype._countNodes = function(currentNode) {

};

AVL.prototype._verifyKeysBoundedBy = function(currentNode, minApplies, minBound, maxApplies, maxBound) {
  if(minApplies && currentNode.getKey() < minBound) {
    throw "a node has a right descendent with lesser key";
  }
  if(maxApplies && currentNode.getKey() > maxBound) {
    throw "a node has a left descendent with greater key";
  }
  if(currentNode.getLeft() != null) {
    verifyKeysBoundedBy(currentNode.getLeft(), minApplies, minBound, true, currentNode.getKey());
  }
  if(currentNode.getRight() != null) {
    verifyKeysBoundedBy(currentNode.getRight(), true, currentNode.getKey(), maxApplies, maxBound);
  }
};

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

Node.prototype.getKey = function() {
  return this._key;
}

Node.prototype.setKey = function(newKey) {
  this._key = newKey;
}

Node.prototype.getValue = function() {
  return this._value;
}

Node.prototype.setValue = function(newValue) {
  this._value = newValue;
}

Node.prototype.getLeft = function() {
  return this._left;
}

Node.prototype.setLeft = function(newLeft) {
  this._left = newLeft;
}

Node.prototype.getRight = function() {
  return this._right;
}

Node.prototype.setRight = function(newRight) {
  this._right = newRight;
}

// const node1 = new Node("A", 5, "node2");
// console.log(node1.getRight());
// node1.setRight("new node2");
// console.log(node1.getRight());

// const tree = new AVL();
// console.log(tree.isEmpty());
