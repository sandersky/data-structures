/* @flow */

type BinarySearchTree = {
  comparator: Function, // function for comparing two values
  preventDuplicates: boolean, // prevent duplicate values in tree
  root: BinarySearchTreeNode | null // root node
}

type BinarySearchTreeNode = {
  left: BinarySearchTreeNode | null, // left node
  right: BinarySearchTreeNode | null, // right node
  value: any // value of node
}

type BinarySearchTreeOptions = {
  comparator?: Function, // function for comparing two values
  preventDuplicates?: boolean // prevent duplicate values in tree
}

/**
 * Create a binary search tree node
 * @param value - value at node
 * @returns node
 */
export function createNode (value: any): BinarySearchTreeNode {
  return {
    left: null,
    right: null,
    value
  }
}

/**
 * Create a binary search tree
 * @param options - options
 * @returns binary search tree
 */
export function createTree (options: BinarySearchTreeOptions = {}): BinarySearchTree {
  return {
    comparator: options.comparator || defaultComparator,
    preventDuplicates: Boolean(options.preventDuplicates),
    root: null
  }
}

/**
 * Default value comparison method that simply uses === and < for comparison
 * @param a - first value
 * @param b - second value
 * @returns returns -1 if a is less than b, 0 if they are the same, and 1 if a is greater than b
 */
export function defaultComparator (a: any, b: any): number {
  if (a === b) return 0
  if (a < b) return -1
  return 1
}

/**
 * Delete maximum value in binary search tree
 * @param tree - binary search tree
 * @returns new tree
 */
export function deleteMax (tree: BinarySearchTree): BinarySearchTree {
  if (!tree.root) return tree

  const newTree: BinarySearchTree = Object.assign({}, tree) // Shallow clone to keep pure

  newTree.root = Object.assign({}, newTree.root) // Shallow clone to keep pure

  if (!newTree.root.right) {
    newTree.root = newTree.root.left
    return newTree
  }

  let currentNode: BinarySearchTreeNode | null = newTree.root.right
  let parentNode: BinarySearchTreeNode = newTree.root

  while (currentNode && currentNode.right) {
    parentNode.right = Object.assign({}, currentNode) // Shallow clone to keep pure
    parentNode = parentNode.right
    currentNode = currentNode.right
  }

  if (currentNode && currentNode.left) {
    parentNode.right = currentNode.left
  } else {
    parentNode.right = null
  }

  return newTree
}

/**
 * Delete minimum value in binary search tree
 * @param tree - binary search tree
 * @returns new tree
 */
export function deleteMin (tree: BinarySearchTree): BinarySearchTree {
  if (!tree.root) return tree

  const newTree: BinarySearchTree = Object.assign({}, tree) // Shallow clone to keep pure

  newTree.root = Object.assign({}, newTree.root) // Shallow clone to keep pure

  if (!newTree.root.left) {
    newTree.root = newTree.root.right
    return newTree
  }

  let currentNode: BinarySearchTreeNode | null = newTree.root.left
  let parentNode: BinarySearchTreeNode = newTree.root

  while (currentNode && currentNode.left) {
    parentNode.left = Object.assign({}, currentNode) // Shallow clone to keep pure
    parentNode = parentNode.left
    currentNode = currentNode.left
  }

  if (currentNode && currentNode.right) {
    parentNode.left = currentNode.right
  } else {
    parentNode.left = null
  }

  return newTree
}

/**
 * Get maximum value in binary search tree
 * @param tree - binary search tree
 * @returns maximum value in tree
 */
export function findMax (tree: BinarySearchTree): any {
  if (!tree.root) return null
  let currentNode: BinarySearchTreeNode = tree.root
  while (currentNode.right) currentNode = currentNode.right
  return currentNode.value
}

/**
 * Get minimum value in binary search tree
 * @param tree - binary search tree
 * @returns minimum value in tree
 */
export function findMin (tree: BinarySearchTree): any {
  if (!tree.root) return null
  let currentNode: BinarySearchTreeNode = tree.root
  while (currentNode.left) currentNode = currentNode.left
  return currentNode.value
}

/**
 * Add a value to a binary search tree
 * @param value - value to add to tree
 * @param tree - tree to add value to
 * @returns new tree
 */
export function insert (value: any, tree: BinarySearchTree): BinarySearchTree {
  const newNode: BinarySearchTreeNode = createNode(value)
  const newTree: BinarySearchTree = Object.assign({}, tree) // Shallow clone tree to keep function pure

  // If tree has no values then we can just set the new value as the root node
  if (!tree.root) {
    return Object.assign(newTree, {
      root: createNode(value)
    })
  }

  let currentNode: BinarySearchTreeNode = newTree.root = Object.assign({}, newTree.root) // Shallow clone to keep pure

  while (currentNode) {
    const comparison: number = tree.comparator(value, currentNode.value)

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
 * Search for value in a binary search tree
 * @param value - value to search for
 * @param tree - binary search tree to look for value in
 * @returns returns null if value not found, otherwise returns value
 */
export function search (value: any, tree: BinarySearchTree): any {
  if (!tree.root) return null

  let currentNode: BinarySearchTreeNode = tree.root

  while (currentNode) {
    const comparison: number = tree.comparator(value, currentNode.value)

    if (comparison === 0) return currentNode.value
    if (comparison === -1) {
      if (!currentNode.left) return null
      currentNode = currentNode.left
    } else {
      if (!currentNode.right) return null
      currentNode = currentNode.right
    }
  }
}
