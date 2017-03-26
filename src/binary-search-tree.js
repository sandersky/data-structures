/**
 * @typedef {Object} BinarySearchTree
 * @property {Function} [comparator] - function for comparing two values
 * @property {Boolean} [preventDuplicates=false] - prevent duplicate values in tree
 * @property {BinarySearchTreeNode} [root=null] - root node
 */

/**
 * @typedef {Object} BinarySearchTreeOptions
 * @property {Function} [comparator] - function for comparing two values
 * @property {Boolean} [preventDuplicates] - prevent duplicate values in tree
 */

/**
 * @typedef {Object} BinarySearchTreeNode
 * @property {BinarySearchTreeNode} [left=null] - left node
 * @property {BinarySearchTreeNode} [right=null] - right node
 * @property {*} value - value at node
 */

/**
 * Add a value to a binary search tree
 * @param {*} value - value to add to tree
 * @param {BinarySearchTree} tree - tree to add value to
 * @returns {BinarySearchTree} new tree
 */
export function addValueToBinarySearchTree (value, tree) {
  const newNode = createBinarySearchTreeNode(value)
  const newTree = Object.assign({}, tree) // Shallow clone tree to keep function pure

  // If tree has no values then we can just set the new value as the root node
  if (!tree.root) {
    return Object.assign(newTree, {
      root: createBinarySearchTreeNode(value)
    })
  }

  let currentNode = newTree.root = Object.assign({}, newTree.root) // Shallow clone to keep pure

  while (currentNode) {
    const comparison = tree.comparator(value, currentNode.value)

    if (tree.preventDuplicates && comparison === 0) return tree

    if (comparison === -1) {
      if (!currentNode.left) {
        currentNode.left = newNode
        break
      } else {
        currentNode = currentNode.left = Object.assign({}, currentNode.left) // Shallow clone to keep pure
      }
    } else {
      if (!currentNode.right) {
        currentNode.right = newNode
        break
      } else {
        currentNode = currentNode.right = Object.assign({}, currentNode.right) // Shallow clone to keep pure
      }
    }
  }

  return newTree
}

/**
 * Create a binary search tree
 * @param {BinarySearchTreeOptions} options - options
 * @returns {BinarySearchTree} binary search tree
 */
export function createBinarySearchTree (options = {}) {
  return {
    comparator: options.comparator || defaultComparator,
    preventDuplicates: Boolean(options.preventDuplicates),
    root: null
  }
}


/**
 * Create a binary search tree node
 * @param {*} value - value at node
 * @returns {BinarySearchTreeNode} node
 */
export function createBinarySearchTreeNode (value) {
  return {
    left: null,
    right: null,
    value
  }
}

/**
 * Default value comparison method that simply uses === and < for comparison
 * @param {*} a - first value
 * @param {*} b - second value
 * @returns {Number} returns -1 if a is less than b, 0 if they are the same, and 1 if a is greater than b
 */
export function defaultComparator (a, b) {
  if (a === b) return 0
  if (a < b) return -1
  return 1
}

/**
 * Get maximum value in binary search tree
 * @param {BinarySearchTree} tree - binary search tree
 * @returns {*} maximum value in tree
 */
export function getMaxBinarySearchTreeValue (tree) {
  if (!tree.root) return null
  let currentNode = tree.root
  while (currentNode.right) currentNode = currentNode.right
  return currentNode.value
}

/**
 * Get minimum value in binary search tree
 * @param {BinarySearchTree} tree - binary search tree
 * @returns {*} minimum value in tree
 */
export function getMinBinarySearchTreeValue (tree) {
  if (!tree.root) return null
  let currentNode = tree.root
  while (currentNode.left) currentNode = currentNode.left
  return currentNode.value
}
