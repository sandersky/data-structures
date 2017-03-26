import {
  addValueToBinarySearchTree,
  createBinarySearchTree,
  createBinarySearchTreeNode,
  defaultComparator,
  getMaxBinarySearchTreeValue,
  getMinBinarySearchTreeValue
} from '../src/binary-search-tree'

describe('binary search tree', () => {
  describe('addValueToBinarySearchTree()', () => {
    describe('when preventDuplicates is false', () => {
      describe('when tree has no root', () => {
        let result, tree

        beforeEach(() => {
          tree = {
            comparator: defaultComparator,
            preventDuplicates: false
          }

          result = addValueToBinarySearchTree(1, tree)
        })

        it('does not return the original tree', () => {
          expect(result).not.toBe(tree)
        })

        it('it returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: {
              left: null,
              right: null,
              value: 1
            }
          })
        })
      })

      describe('when tree has root node with no children', () => {
        let tree

        beforeEach(() => {
          tree = Object.freeze({ // Make sure we never mutate the original tree
            comparator: defaultComparator,
            preventDuplicates: false,
            root: Object.freeze({ // Make sure we never mutate this object in the original tree
              left: null,
              right: null,
              value: 2
            })
          })
        })

        describe("when value is less than root node's value", () => {
          let result

          beforeEach(() => {
            result = addValueToBinarySearchTree(1, tree)
          })

          it('does not return the original tree', () => {
            expect(result).not.toBe(tree)
          })

          it('it returns expected value', () => {
            expect(result).toEqual({
              comparator: defaultComparator,
              preventDuplicates: false,
              root: {
                left: {
                  left: null,
                  right: null,
                  value: 1
                },
                right: null,
                value: 2
              }
            })
          })
        })

        describe("when value is the same as the root node's value", () => {
          let result

          beforeEach(() => {
            result = addValueToBinarySearchTree(2, tree)
          })

          it('does not return the original tree', () => {
            expect(result).not.toBe(tree)
          })

          it('it returns expected value', () => {
            expect(result).toEqual({
              comparator: defaultComparator,
              preventDuplicates: false,
              root: {
                left: null,
                right: {
                  left: null,
                  right: null,
                  value: 2
                },
                value: 2
              }
            })
          })
        })

        describe("when value is greater than root node's value", () => {
          let result

          beforeEach(() => {
            result = addValueToBinarySearchTree(3, tree)
          })

          it('does not return the original tree', () => {
            expect(result).not.toBe(tree)
          })

          it('it returns expected value', () => {
            expect(result).toEqual({
              comparator: defaultComparator,
              preventDuplicates: false,
              root: {
                left: null,
                right: {
                  left: null,
                  right: null,
                  value: 3
                },
                value: 2
              }
            })
          })
        })
      })

      describe('when tree has root node with children', () => {
        let tree

        beforeEach(() => {
          tree = Object.freeze({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: Object.freeze({
              left: Object.freeze({
                left: null,
                right: null,
                value: 2
              }),
              right: Object.freeze({
                left: null,
                right: null,
                value: 6
              }),
              value: 4
            })
          })
        })

        describe("when value is less than root node's value", () => {
          describe("when the value is less than the left child node's value", () => {
            let result

            beforeEach(() => {
              result = addValueToBinarySearchTree(1, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: false,
                root: {
                  left: {
                    left: {
                      left: null,
                      right: null,
                      value: 1
                    },
                    right: null,
                    value: 2
                  },
                  right: {
                    left: null,
                    right: null,
                    value: 6
                  },
                  value: 4
                }
              })
            })
          })

          describe("when the value is the same as the left child node's value", () => {
            let result

            beforeEach(() => {
              result = addValueToBinarySearchTree(2, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: false,
                root: {
                  left: {
                    left: null,
                    right: {
                      left: null,
                      right: null,
                      value: 2
                    },
                    value: 2
                  },
                  right: {
                    left: null,
                    right: null,
                    value: 6
                  },
                  value: 4
                }
              })
            })
          })

          describe("when the value is greater than the left child node's value", () => {
            let result

            beforeEach(() => {
              result = addValueToBinarySearchTree(3, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: false,
                root: {
                  left: {
                    left: null,
                    right: {
                      left: null,
                      right: null,
                      value: 3
                    },
                    value: 2
                  },
                  right: {
                    left: null,
                    right: null,
                    value: 6
                  },
                  value: 4
                }
              })
            })
          })
        })

        describe("when value is the same as the root node's value", () => {
          let result

          beforeEach(() => {
            result = addValueToBinarySearchTree(4, tree)
          })

          it('does not return the original tree', () => {
            expect(result).not.toBe(tree)
          })

          it('it returns expected value', () => {
            expect(result).toEqual({
              comparator: defaultComparator,
              preventDuplicates: false,
              root: {
                left: {
                  left: null,
                  right: null,
                  value: 2
                },
                right: {
                  left: {
                    left: null,
                    right: null,
                    value: 4
                  },
                  right: null,
                  value: 6
                },
                value: 4
              }
            })
          })
        })

        describe("when value is greather than the root node's value", () => {
          describe("when the value is less than the right child node's value", () => {
            let result

            beforeEach(() => {
              result = addValueToBinarySearchTree(5, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: false,
                root: {
                  left: {
                    left: null,
                    right: null,
                    value: 2
                  },
                  right: {
                    left: {
                      left: null,
                      right: null,
                      value: 5
                    },
                    right: null,
                    value: 6
                  },
                  value: 4
                }
              })
            })
          })

          describe("when the value is the same as the right child node's value", () => {
            let result

            beforeEach(() => {
              result = addValueToBinarySearchTree(6, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: false,
                root: {
                  left: {
                    left: null,
                    right: null,
                    value: 2
                  },
                  right: {
                    left: null,
                    right: {
                      left: null,
                      right: null,
                      value: 6
                    },
                    value: 6
                  },
                  value: 4
                }
              })
            })
          })

          describe("when the value is greater than the right child node's value", () => {
            let result

            beforeEach(() => {
              result = addValueToBinarySearchTree(7, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: false,
                root: {
                  left: {
                    left: null,
                    right: null,
                    value: 2
                  },
                  right: {
                    left: null,
                    right: {
                      left: null,
                      right: null,
                      value: 7
                    },
                    value: 6
                  },
                  value: 4
                }
              })
            })
          })
        })
      })
    })

    describe('when preventDuplicates is true', () => {
      describe('when tree has no root', () => {
        let result, tree

        beforeEach(() => {
          tree = {
            comparator: defaultComparator,
            preventDuplicates: true
          }

          result = addValueToBinarySearchTree(1, tree)
        })

        it('does not return the original tree', () => {
          expect(result).not.toBe(tree)
        })

        it('it returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: true,
            root: {
              left: null,
              right: null,
              value: 1
            }
          })
        })
      })

      describe('when tree has root node with no children', () => {
        let tree

        beforeEach(() => {
          tree = Object.freeze({ // Make sure we never mutate the original tree
            comparator: defaultComparator,
            preventDuplicates: true,
            root: Object.freeze({ // Make sure we never mutate this object in the original tree
              left: null,
              right: null,
              value: 2
            })
          })
        })

        describe("when value is less than root node's value", () => {
          let result

          beforeEach(() => {
            result = addValueToBinarySearchTree(1, tree)
          })

          it('does not return the original tree', () => {
            expect(result).not.toBe(tree)
          })

          it('it returns expected value', () => {
            expect(result).toEqual({
              comparator: defaultComparator,
              preventDuplicates: true,
              root: {
                left: {
                  left: null,
                  right: null,
                  value: 1
                },
                right: null,
                value: 2
              }
            })
          })
        })

        describe("when value is the same as the root node's value", () => {
          let result

          beforeEach(() => {
            result = addValueToBinarySearchTree(2, tree)
          })

          it('returns the original tree', () => {
            expect(result).toBe(tree)
          })
        })

        describe("when value is greater than root node's value", () => {
          let result

          beforeEach(() => {
            result = addValueToBinarySearchTree(3, tree)
          })

          it('does not return the original tree', () => {
            expect(result).not.toBe(tree)
          })

          it('it returns expected value', () => {
            expect(result).toEqual({
              comparator: defaultComparator,
              preventDuplicates: true,
              root: {
                left: null,
                right: {
                  left: null,
                  right: null,
                  value: 3
                },
                value: 2
              }
            })
          })
        })
      })

      describe('when tree has root node with children', () => {
        let tree

        beforeEach(() => {
          tree = Object.freeze({
            comparator: defaultComparator,
            preventDuplicates: true,
            root: Object.freeze({
              left: Object.freeze({
                left: null,
                right: null,
                value: 2
              }),
              right: Object.freeze({
                left: null,
                right: null,
                value: 6
              }),
              value: 4
            })
          })
        })

        describe("when value is less than root node's value", () => {
          describe("when the value is less than the left child node's value", () => {
            let result

            beforeEach(() => {
              result = addValueToBinarySearchTree(1, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: true,
                root: {
                  left: {
                    left: {
                      left: null,
                      right: null,
                      value: 1
                    },
                    right: null,
                    value: 2
                  },
                  right: {
                    left: null,
                    right: null,
                    value: 6
                  },
                  value: 4
                }
              })
            })
          })

          describe("when the value is the same as the left child node's value", () => {
            let result

            beforeEach(() => {
              result = addValueToBinarySearchTree(2, tree)
            })

            it('returns the original tree', () => {
              expect(result).toBe(tree)
            })
          })

          describe("when the value is greater than the left child node's value", () => {
            let result

            beforeEach(() => {
              result = addValueToBinarySearchTree(3, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: true,
                root: {
                  left: {
                    left: null,
                    right: {
                      left: null,
                      right: null,
                      value: 3
                    },
                    value: 2
                  },
                  right: {
                    left: null,
                    right: null,
                    value: 6
                  },
                  value: 4
                }
              })
            })
          })
        })

        describe("when value is the same as the root node's value", () => {
          let result

          beforeEach(() => {
            result = addValueToBinarySearchTree(4, tree)
          })

          it('returns the original tree', () => {
            expect(result).toBe(tree)
          })
        })

        describe("when value is greather than the root node's value", () => {
          describe("when the value is less than the right child node's value", () => {
            let result

            beforeEach(() => {
              result = addValueToBinarySearchTree(5, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: true,
                root: {
                  left: {
                    left: null,
                    right: null,
                    value: 2
                  },
                  right: {
                    left: {
                      left: null,
                      right: null,
                      value: 5
                    },
                    right: null,
                    value: 6
                  },
                  value: 4
                }
              })
            })
          })

          describe("when the value is the same as the right child node's value", () => {
            let result

            beforeEach(() => {
              result = addValueToBinarySearchTree(6, tree)
            })

            it('returns the original tree', () => {
              expect(result).toBe(tree)
            })
          })

          describe("when the value is greater than the right child node's value", () => {
            let result

            beforeEach(() => {
              result = addValueToBinarySearchTree(7, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: true,
                root: {
                  left: {
                    left: null,
                    right: null,
                    value: 2
                  },
                  right: {
                    left: null,
                    right: {
                      left: null,
                      right: null,
                      value: 7
                    },
                    value: 6
                  },
                  value: 4
                }
              })
            })
          })
        })
      })
    })
  })

  describe('createBinarySearchTree()', () => {
    it('returns defaults when no options specified', () => {
      expect(createBinarySearchTree()).toEqual({
        comparator: defaultComparator,
        preventDuplicates: false,
        root: null
      })
    })

    it('returns expected value when custom comparator passed into options', () => {
      const options = {
        comparator () {}
      }

      expect(createBinarySearchTree(options)).toEqual({
        comparator: options.comparator,
        preventDuplicates: false,
        root: null
      })
    })

    it('returns expected value when preventDuplicates set to true in options', () => {
      const options = {
        preventDuplicates: true
      }

      expect(createBinarySearchTree(options)).toEqual({
        comparator: defaultComparator,
        preventDuplicates: true,
        root: null
      })
    })

    it('returns expected value when preventDuplicates set to false in options', () => {
      const options = {
        preventDuplicates: false
      }

      expect(createBinarySearchTree(options)).toEqual({
        comparator: defaultComparator,
        preventDuplicates: false,
        root: null
      })
    })
  })

  it('createBinarySearchTreeNode() returns expected value', () => {
    expect(createBinarySearchTreeNode(3)).toEqual({
      left: null,
      right: null,
      value: 3
    })
  })

  describe('defaultComparator()', () => {
    describe('numeric values', () => {
      it('returns -1 when a is less than b', () => {
        expect(defaultComparator(1, 2)).toBe(-1)
      })

      it('returns 0 when a is equal to b', () => {
        expect(defaultComparator(1, 1)).toBe(0)
      })

      it('returns 1 when a is greater than b', () => {
        expect(defaultComparator(2, 1)).toBe(1)
      })
    })

    describe('string values', () => {
      it('returns -1 when a is less than b', () => {
        expect(defaultComparator('a', 'b')).toBe(-1)
      })

      it('returns 0 when a is equal to b', () => {
        expect(defaultComparator('a', 'a')).toBe(0)
      })

      it('returns 1 when a is greater than b', () => {
        expect(defaultComparator('b', 'a')).toBe(1)
      })
    })
  })

  describe('getMaxBinarySearchTreeValue()', () => {
    it('returns null when no nodes', () => {
      const tree = Object.freeze({
        comparator: defaultComparator,
        preventDuplicates: false,
        root: null
      })

      expect(getMaxBinarySearchTreeValue(tree)).toBe(null)
    })

    it('returns root node when root node contains max value', () => {
      const tree = Object.freeze({
        comparator: defaultComparator,
        preventDuplicates: false,
        root: Object.freeze({
          left: Object.freeze({
            left: null,
            right: null,
            value: 1
          }),
          right: null,
          value: 2
        })
      })

      expect(getMaxBinarySearchTreeValue(tree)).toBe(2)
    })

    it('returns right most node when child nodes present', () => {
      const tree = Object.freeze({
        comparator: defaultComparator,
        preventDuplicates: false,
        root: Object.freeze({
          left: Object.freeze({
            left: null,
            right: null,
            value: 1
          }),
          right: Object.freeze({
            left: Object.freeze({
              left: null,
              right: null,
              value: 3
            }),
            right: Object.freeze({
              left: null,
              right: null,
              value: 5
            }),
            value: 4
          }),
          value: 2
        })
      })

      expect(getMaxBinarySearchTreeValue(tree)).toBe(5)
    })
  })

  describe('getMinBinarySearchTreeValue()', () => {
    it('returns null when no nodes', () => {
      const tree = Object.freeze({
        comparator: defaultComparator,
        preventDuplicates: false,
        root: null
      })

      expect(getMinBinarySearchTreeValue(tree)).toBe(null)
    })

    it('returns root node when root node contains min value', () => {
      const tree = Object.freeze({
        comparator: defaultComparator,
        preventDuplicates: false,
        root: Object.freeze({
          left: null,
          right: Object.freeze({
            left: null,
            right: null,
            value: 2
          }),
          value: 1
        })
      })

      expect(getMaxBinarySearchTreeValue(tree)).toBe(2)
    })

    it('returns left most node when child nodes present', () => {
      const tree = Object.freeze({
        comparator: defaultComparator,
        preventDuplicates: false,
        root: Object.freeze({
          left: Object.freeze({
            left: Object.freeze({
              left: null,
              right: null,
              value: 1
            }),
            right: Object.freeze({
              left: null,
              right: null,
              value: 3
            }),
            value: 2
          }),
          right: Object.freeze({
            left: null,
            right: null,
            value: 5
          }),
          value: 4
        })
      })

      expect(getMinBinarySearchTreeValue(tree)).toBe(1)
    })
  })
})
