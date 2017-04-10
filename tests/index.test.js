import * as AVLTree from '../src/avl-tree'
import * as BinarySearchTree from '../src/binary-search-tree'
import ImmutableDataStructures from '../src'

describe('index', () => {
  it('contains AVLTree', () => {
    expect(ImmutableDataStructures.AVLTree).toBe(AVLTree)
  })

  it('contains BinarySearchTree', () => {
    expect(ImmutableDataStructures.BinarySearchTree).toBe(BinarySearchTree)
  })
})
