/* @flow */

type AVLTree = {
  comparator: Function, // function for comparing two values
  preventDuplicates: boolean, // prevent duplicate values in tree
  root: AVLTreeNode | null // root node
}

type AVLTreeNode = {
  height: number, // Should be >= 0
  left: AVLTreeNode | null, // left node
  right: AVLTreeNode | null, // right node
  value: any // value of node
}

type AVLTreeOptions = {
  comparator?: Function, // function for comparing two values
  preventDuplicates?: boolean // prevent duplicate values in tree
}

/**
 * Get balance factor of node
 * @param node - AVL tree node
 * @returns balance factor
 */
function balance (node: AVLTreeNode): number {
  return height(node.left) - height(node.right)
}

/**
 * Get height of AVL tree node
 * @param node - AVL tree node
 * @returns height of AVL tree node (zero if node is not present)
 */
function height (node: AVLTreeNode | null): number {
  return node ? node.height : 0
}

/**
 * Create an AVL tree node
 * @param value - value at node
 * @returns node
 */
export function createNode (value: any): AVLTreeNode {
  return {
    height: 1,
    left: null,
    right: null,
    value
  }
}

/**
 * Create an AVL tree
 * @param options - options
 * @returns AVL tree
 */
export function createTree (options: AVLTreeOptions = {}): AVLTree {
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

// deleteMax
// deleteMin

/**
 * Get maximum value in an AVL tree
 * @param tree - AVL tree
 * @returns maximum value in tree
 */
export function findMax (tree: AVLTree): any {
  if (!tree.root) return null
  let currentNode: AVLTreeNode = tree.root
  while (currentNode.right) currentNode = currentNode.right
  return currentNode.value
}

/**
 * Get minimum value in an AVL tree
 * @param tree - AVL tree
 * @returns minimum value in tree
 */
export function findMin (tree: AVLTree): any {
  if (!tree.root) return null
  let currentNode: AVLTreeNode = tree.root
  while (currentNode.left) currentNode = currentNode.left
  return currentNode.value
}

/**
 * Add a value to an AVL tree
 * @param value - value to add to tree
 * @param tree - tree to add value to
 * @returns new tree
 */
export function insert (value: any, tree: AVLTree): AVLTree {
  const newNode: AVLTreeNode = createNode(value)
  const newTree: AVLTree = Object.assign({}, tree) // Shallow clone tree to keep function pure

  // If tree has no values then we can just set the new value as the root node
  if (!tree.root) {
    return Object.assign(newTree, {
      root: createNode(value)
    })
  }

  let currentNode: AVLTreeNode = newTree.root = Object.assign({}, newTree.root) // Shallow clone to keep pure
  const parentNodes: Array<AVLTreeNode> = [currentNode]

  while (currentNode) {
    const comparison: number = tree.comparator(value, currentNode.value)

    if (tree.preventDuplicates && comparison === 0) return tree

    if (comparison === -1) {
      if (!currentNode.left) {
        currentNode.left = newNode
        break
      } else {
        currentNode = currentNode.left = Object.assign({}, currentNode.left) // Shallow clone to keep pure
        parentNodes.unshift(currentNode)
      }
    } else {
      if (!currentNode.right) {
        currentNode.right = newNode
        break
      } else {
        currentNode = currentNode.right = Object.assign({}, currentNode.right) // Shallow clone to keep pure
        parentNodes.unshift(currentNode)
      }
    }
  }

  while (parentNodes.length) {
    const parentNode: AVLTreeNode = parentNodes.shift()

    parentNode.height = 1 + Math.max(height(parentNode.left), height(parentNode.right))
    const balanceFactor: number = balance(parentNode)

    if (balanceFactor === 0) break

    let newParentNode: AVLTreeNode | null = null

    if (balanceFactor > 1) {
      const comparison: number = tree.comparator(value, parentNode.left ? parentNode.left.value : null)

      if (comparison === -1) {
        newParentNode = right(parentNode)
      } else {
        newParentNode = right(
          Object.assign(parentNode, {
            left: left(parentNode.left)
          })
        )
      }
    } else if (balanceFactor < -1) {
      const comparison: number = tree.comparator(value, parentNode.right ? parentNode.right.value : null)

      if (comparison === 1) {
        newParentNode = left(parentNode)
      } else {
        newParentNode = left(
          Object.assign(parentNode, {
            right: right(parentNode.right)
          })
        )
      }
    }

    if (newParentNode) {
      if (!parentNodes.length) {
        return Object.assign(newTree, {
          root: newParentNode
        })
      }

      if (parentNodes[0].left === parentNode) {
        parentNodes[0].left = newParentNode
      } else {
        parentNodes[0].right = newParentNode
      }
    }
  }

  return newTree
}

/**
 * Rotate sub-tree to the left:
 *     x             z
 *    / \     ->    / \
 *   y   z         x  b
 *      / \       / \
 *     a  b      y  a
 * @param parentNode - parent node of sub-tree
 * @returns left rotated sub-tree
 */
export function left (x: AVLTreeNode | null): AVLTreeNode | null {
  if (!x) return null

  const z: AVLTreeNode | null = x.right

  if (!z) return x

  const a: AVLTreeNode | null = z.left
  const b: AVLTreeNode | null = z.right
  const xCopy: AVLTreeNode = Object.assign({}, x)

  const newParentNode: AVLTreeNode = Object.assign({}, x.right)

  newParentNode.left = xCopy // assign x to left of z

  const aHeight: number = height(a)
  const bHeight: number = height(b)
  const yHeight: number = height(x.left)
  const xHeight: number = 1 + Math.max(yHeight, aHeight)
  const zHeight: number = 1 + Math.max(xHeight, bHeight)

  Object.assign(xCopy, {
    height: xHeight,
    right: a ? Object.assign({}, a) : null // assign a to right of x
  })

  return Object.assign(newParentNode, {
    height: zHeight
  })
}

/**
 * Rotate sub-tree to the right:
 *     x             y
 *    / \     ->    / \
 *   y   z         a  x
 *  / \              / \
 * a  b             b  z
 * @param parentNode - parent node of sub-tree
 * @returns right rotated sub-tree
 */
export function right (x: AVLTreeNode | null): AVLTreeNode | null {
  if (!x) return null

  const y: AVLTreeNode | null = x.left

  if (!y) return x

  const a: AVLTreeNode | null = y.left
  const b: AVLTreeNode | null = y.right
  const xCopy: AVLTreeNode = Object.assign({}, x)

  const newParentNode: AVLTreeNode = Object.assign({}, x.left)

  newParentNode.right = xCopy // assign x to right of y

  const aHeight: number = height(a)
  const bHeight: number = height(b)
  const zHeight: number = height(x.right)
  const xHeight: number = 1 + Math.max(bHeight, zHeight)
  const yHeight: number = 1 + Math.max(aHeight, xHeight)

  Object.assign(xCopy, {
    height: xHeight,
    left: b ? Object.assign({}, b) : null // assign b to right of x
  })

  return Object.assign(newParentNode, {
    height: yHeight
  })
}

/**
 * Search for value in an AVL tree
 * @param value - value to search for
 * @param tree - AVL tree to look for value in
 * @returns returns null if value not found, otherwise returns value
 */
export function search (value: any, tree: AVLTree): any {
  if (!tree.root) return null

  let currentNode: AVLTreeNode = tree.root

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
