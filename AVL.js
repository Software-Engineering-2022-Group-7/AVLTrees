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

};

AVL.prototype._getBalance = function() {

};

AVL.prototype._rightRotate = function(current_node) {

};

AVL.prototype._leftRotate = function(current_node) {

};

AVL.prototype._insertInSubtree = function(current_node, key, value) {

};

AVL.prototype._removeFromSubtree = function(current_node, key) {

};

AVL.prototype._findInSubtree = function(current_node, key) {

};

AVL.prototype._containsInSubtree = function(current_node, key) {

};

AVL.prototype._updateInSubtree = function(current_node, key, value) {

};

AVL.prototype._getHeightInSubtree = function(current_node) {

};

AVL.prototype._getMinInSubtree = function(current_node) {

};

AVL.prototype._getMaxInSubtree = function(current_node) {

};

AVL.prototype._buildInOrderTraversal = function() {

};

AVL.prototype._buildLevelOrderTraversal = function() {

};

AVL.prototype._buildPreOrderTraversal = function() {

};

AVL.prototype._buildPostOrderTraversal = function() {

};

AVL.prototype_countNodes = function(current_node) {

};

AVL.prototype_verifyKeysBoundedBy = function(current_node, minApplies, minBound, maxApplies, maxBound) {

};

const tree = new AVL();
console.log(tree.isEmpty());
