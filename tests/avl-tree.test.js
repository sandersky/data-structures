import {
  createNode,
  createTree,
  defaultComparator,
  findMax,
  findMin,
  insert,
  left,
  right,
  search
} from '../src/avl-tree'

describe('AVL tree', () => {
  it('createNode() returns expected value', () => {
    expect(createNode(3)).toEqual({
      height: 1,
      left: null,
      right: null,
      value: 3
    })
  })

  describe('createTree()', () => {
    it('returns defaults when no options specified', () => {
      expect(createTree()).toEqual({
        comparator: defaultComparator,
        preventDuplicates: false,
        root: null
      })
    })

    it('returns expected value when custom comparator passed into options', () => {
      const options = {
        comparator () {}
      }

      expect(createTree(options)).toEqual({
        comparator: options.comparator,
        preventDuplicates: false,
        root: null
      })
    })

    it('returns expected value when preventDuplicates set to true in options', () => {
      const options = {
        preventDuplicates: true
      }

      expect(createTree(options)).toEqual({
        comparator: defaultComparator,
        preventDuplicates: true,
        root: null
      })
    })

    it('returns expected value when preventDuplicates set to false in options', () => {
      const options = {
        preventDuplicates: false
      }

      expect(createTree(options)).toEqual({
        comparator: defaultComparator,
        preventDuplicates: false,
        root: null
      })
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

  describe('findMax()', () => {
    it('returns null when no nodes', () => {
      const tree = Object.freeze({
        comparator: defaultComparator,
        preventDuplicates: false,
        root: null
      })

      expect(findMax(tree)).toBe(null)
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

      expect(findMax(tree)).toBe(2)
    })

    it('returns right most node when child nodes present', () => {
      const tree = Object.freeze({
        comparator: defaultComparator,
        preventDuplicates: false,
        root: Object.freeze({
          left: Object.freeze({
            left: Object.freeze({
              left: null,
              right: null,
              value: 0
            }),
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

      expect(findMax(tree)).toBe(5)
    })
  })

  describe('findMin()', () => {
    it('returns null when no nodes', () => {
      const tree = Object.freeze({
        comparator: defaultComparator,
        preventDuplicates: false,
        root: null
      })

      expect(findMin(tree)).toBe(null)
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

      expect(findMax(tree)).toBe(2)
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
            right: Object.freeze({
              left: null,
              right: null,
              value: 6
            }),
            value: 5
          }),
          value: 4
        })
      })

      expect(findMin(tree)).toBe(1)
    })
  })

  describe('insert()', () => {
    describe('when preventDuplicates is false', () => {
      describe('when tree has no root node', () => {
        let result, tree

        beforeEach(function () {
          tree = {
            comparator: defaultComparator,
            preventDuplicates: false,
            root: null
          }

          result = insert(1, tree)
        })

        it('does not return the original value', () => {
          expect(result).not.toBe(tree)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: {
              height: 1,
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
              height: 1,
              left: null,
              right: null,
              value: 2
            })
          })
        })

        describe("when value is less than root node's value", () => {
          let result

          beforeEach(() => {
            result = insert(1, tree)
          })

          it('does not return the original tree', () => {
            expect(result).not.toBe(tree)
          })

          it('it returns expected value', () => {
            expect(result).toEqual({
              comparator: defaultComparator,
              preventDuplicates: false,
              root: {
                height: 2,
                left: {
                  height: 1,
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
            result = insert(2, tree)
          })

          it('does not return the original tree', () => {
            expect(result).not.toBe(tree)
          })

          it('it returns expected value', () => {
            expect(result).toEqual({
              comparator: defaultComparator,
              preventDuplicates: false,
              root: {
                height: 2,
                left: null,
                right: {
                  height: 1,
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
            result = insert(3, tree)
          })

          it('does not return the original tree', () => {
            expect(result).not.toBe(tree)
          })

          it('it returns expected value', () => {
            expect(result).toEqual({
              comparator: defaultComparator,
              preventDuplicates: false,
              root: {
                height: 2,
                left: null,
                right: {
                  height: 1,
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
              height: 2,
              left: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 2
              }),
              right: Object.freeze({
                height: 1,
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
              result = insert(1, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: false,
                root: {
                  height: 3,
                  left: {
                    height: 2,
                    left: {
                      height: 1,
                      left: null,
                      right: null,
                      value: 1
                    },
                    right: null,
                    value: 2
                  },
                  right: {
                    height: 1,
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
              result = insert(2, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: false,
                root: {
                  height: 3,
                  left: {
                    height: 2,
                    left: null,
                    right: {
                      height: 1,
                      left: null,
                      right: null,
                      value: 2
                    },
                    value: 2
                  },
                  right: {
                    height: 1,
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
              result = insert(3, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: false,
                root: {
                  height: 3,
                  left: {
                    height: 2,
                    left: null,
                    right: {
                      height: 1,
                      left: null,
                      right: null,
                      value: 3
                    },
                    value: 2
                  },
                  right: {
                    height: 1,
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
            result = insert(4, tree)
          })

          it('does not return the original tree', () => {
            expect(result).not.toBe(tree)
          })

          it('it returns expected value', () => {
            expect(result).toEqual({
              comparator: defaultComparator,
              preventDuplicates: false,
              root: {
                height: 3,
                left: {
                  height: 1,
                  left: null,
                  right: null,
                  value: 2
                },
                right: {
                  height: 2,
                  left: {
                    height: 1,
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
              result = insert(5, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: false,
                root: {
                  height: 3,
                  left: {
                    height: 1,
                    left: null,
                    right: null,
                    value: 2
                  },
                  right: {
                    height: 2,
                    left: {
                      height: 1,
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
              result = insert(6, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: false,
                root: {
                  height: 3,
                  left: {
                    height: 1,
                    left: null,
                    right: null,
                    value: 2
                  },
                  right: {
                    height: 2,
                    left: null,
                    right: {
                      height: 1,
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
              result = insert(7, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: false,
                root: {
                  height: 3,
                  left: {
                    height: 1,
                    left: null,
                    right: null,
                    value: 2
                  },
                  right: {
                    height: 2,
                    left: null,
                    right: {
                      height: 1,
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

      describe('when left rotation is needed to keep tree balanced', () => {
        let result, tree

        beforeEach(() => {
          tree = Object.freeze({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: Object.freeze({
              height: 3,
              left: null,
              right: Object.freeze({
                height: 2,
                left: null,
                right: Object.freeze({
                  height: 1,
                  left: null,
                  right: null,
                  value: 3
                }),
                value: 2
              }),
              value: 1
            })
          })

          result = insert(4, tree)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: {
              height: 3,
              left: {
                height: 2,
                left: null,
                right: {
                  height: 1,
                  left: null,
                  right: null,
                  value: 2
                },
                value: 1
              },
              right: {
                height: 1,
                left: null,
                right: null,
                value: 4
              },
              value: 3
            }
          })
        })
      })

      describe('when right rotation is needed to keep tree balanced', () => {
        let result, tree

        beforeEach(() => {
          tree = Object.freeze({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: Object.freeze({
              height: 3,
              left: Object.freeze({
                height: 2,
                left: Object.freeze({
                  height: 1,
                  left: null,
                  right: null,
                  value: 2
                }),
                right: null,
                value: 3
              }),
              right: null,
              value: 4
            })
          })

          result = insert(1, tree)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: {
              height: 3,
              left: {
                height: 1,
                left: null,
                right: null,
                value: 1
              },
              right: {
                height: 2,
                left: {
                  height: 1,
                  left: null,
                  right: null,
                  value: 3
                },
                right: null,
                value: 4
              },
              value: 2
            }
          })
        })
      })

      describe('when left-right rotation is needed to keep balanced', () => {
        let result, tree

        beforeEach(() => {
          tree = Object.freeze({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: Object.freeze({
              height: 2,
              left: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 1
              }),
              right: null,
              value: 3
            })
          })

          result = insert(2, tree)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: {
              height: 2,
              left: {
                height: 1,
                left: null,
                right: null,
                value: 1
              },
              right: {
                height: 1,
                left: null,
                right: null,
                value: 3
              },
              value: 2
            }
          })
        })
      })

      describe('when left-right rotation is needed to keep balanced (dplicate insertion)', () => {
        let result, tree

        beforeEach(() => {
          tree = Object.freeze({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: Object.freeze({
              height: 2,
              left: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 1
              }),
              right: null,
              value: 2
            })
          })

          result = insert(1, tree)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: {
              height: 2,
              left: {
                height: 1,
                left: null,
                right: null,
                value: 1
              },
              right: {
                height: 1,
                left: null,
                right: null,
                value: 2
              },
              value: 1
            }
          })
        })
      })

      describe('when right-left rotation is needed to keep balanced', () => {
        let result, tree

        beforeEach(() => {
          tree = Object.freeze({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: Object.freeze({
              height: 2,
              left: null,
              right: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 3
              }),
              value: 1
            })
          })

          result = insert(2, tree)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: {
              height: 2,
              left: {
                height: 1,
                left: null,
                right: null,
                value: 1
              },
              right: {
                height: 1,
                left: null,
                right: null,
                value: 3
              },
              value: 2
            }
          })
        })
      })

      describe('when right-left rotation is needed to keep balance (duplicate insertion)', () => {
        let result, tree

        beforeEach(() => {
          tree = Object.freeze({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: Object.freeze({
              height: 1,
              left: null,
              right: {
                height: 1,
                left: null,
                right: null,
                value: 2
              },
              value: 1
            })
          })

          result = insert(1, tree)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: {
              height: 2,
              left: {
                height: 1,
                left: null,
                right: null,
                value: 1
              },
              right: {
                height: 1,
                left: null,
                right: null,
                value: 2
              },
              value: 1
            }
          })
        })
      })

      describe('complex 1', () => {
        let result, tree

        beforeEach(() => {
          tree = Object.freeze({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: Object.freeze({
              height: 3,
              left: Object.freeze({
                height: 2,
                left: Object.freeze({
                  height: 1,
                  left: null,
                  right: null,
                  value: 3
                }),
                right: Object.freeze({
                  height: 1,
                  left: null,
                  right: null,
                  value: 9
                }),
                value: 4
              }),
              right: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 26
              }),
              value: 20
            })
          })

          result = insert(15, tree)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: {
              height: 3,
              left: {
                height: 2,
                left: {
                  height: 1,
                  left: null,
                  right: null,
                  value: 3
                },
                right: null,
                value: 4
              },
              right: {
                height: 2,
                left: {
                  height: 1,
                  left: null,
                  right: null,
                  value: 15
                },
                right: {
                  height: 1,
                  left: null,
                  right: null,
                  value: 26
                },
                value: 20
              },
              value: 9
            }
          })
        })
      })

      describe('complex 2', () => {
        let result, tree

        beforeEach(() => {
          tree = Object.freeze({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: Object.freeze({
              height: 3,
              left: Object.freeze({
                height: 2,
                left: Object.freeze({
                  height: 1,
                  left: null,
                  right: null,
                  value: 3
                }),
                right: Object.freeze({
                  height: 1,
                  left: null,
                  right: null,
                  value: 9
                }),
                value: 4
              }),
              right: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 26
              }),
              value: 20
            })
          })

          result = insert(8, tree)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: {
              height: 3,
              left: {
                height: 2,
                left: {
                  height: 1,
                  left: null,
                  right: null,
                  value: 3
                },
                right: {
                  height: 1,
                  left: null,
                  right: null,
                  value: 8
                },
                value: 4
              },
              right: {
                height: 2,
                left: null,
                right: {
                  height: 1,
                  left: null,
                  right: null,
                  value: 26
                },
                value: 20
              },
              value: 9
            }
          })
        })
      })

      describe('complex 3', () => {
        let result, tree

        beforeEach(() => {
          tree = Object.freeze({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: Object.freeze({
              height: 4,
              left: Object.freeze({
                height: 3,
                left: Object.freeze({
                  height: 2,
                  left: Object.freeze({
                    height: 1,
                    left: null,
                    right: null,
                    value: 2
                  }),
                  right: null,
                  value: 3
                }),
                right: Object.freeze({
                  height: 2,
                  left: Object.freeze({
                    height: 1,
                    left: null,
                    right: null,
                    value: 7
                  }),
                  right: Object.freeze({
                    height: 1,
                    left: null,
                    right: null,
                    value: 11
                  }),
                  value: 9
                }),
                value: 4
              }),
              right: Object.freeze({
                height: 2,
                left: Object.freeze({
                  height: 1,
                  left: null,
                  right: null,
                  value: 21
                }),
                right: Object.freeze({
                  height: 1,
                  left: null,
                  right: null,
                  value: 30
                }),
                value: 26
              }),
              value: 20
            })
          })

          result = insert(15, tree)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: {
              height: 4,
              left: {
                height: 3,
                left: {
                  height: 2,
                  left: {
                    height: 1,
                    left: null,
                    right: null,
                    value: 2
                  },
                  right: null,
                  value: 3
                },
                right: {
                  height: 1,
                  left: null,
                  right: null,
                  value: 7
                },
                value: 4
              },
              right: {
                height: 3,
                left: {
                  height: 2,
                  left: null,
                  right: {
                    height: 1,
                    left: null,
                    right: null,
                    value: 15
                  },
                  value: 11
                },
                right: {
                  height: 2,
                  left: {
                    height: 1,
                    left: null,
                    right: null,
                    value: 21
                  },
                  right: {
                    height: 1,
                    left: null,
                    right: null,
                    value: 30
                  },
                  value: 26
                },
                value: 20
              },
              value: 9
            }
          })
        })
      })

      describe('complex 4', () => {
        let result, tree

        beforeEach(() => {
          tree = Object.freeze({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: Object.freeze({
              height: 4,
              left: Object.freeze({
                height: 3,
                left: Object.freeze({
                  height: 2,
                  left: Object.freeze({
                    height: 1,
                    left: null,
                    right: null,
                    value: 2
                  }),
                  right: null,
                  value: 3
                }),
                right: Object.freeze({
                  height: 2,
                  left: Object.freeze({
                    height: 1,
                    left: null,
                    right: null,
                    value: 7
                  }),
                  right: Object.freeze({
                    height: 1,
                    left: null,
                    right: null,
                    value: 11
                  }),
                  value: 9
                }),
                value: 4
              }),
              right: Object.freeze({
                height: 2,
                left: Object.freeze({
                  height: 1,
                  left: null,
                  right: null,
                  value: 21
                }),
                right: Object.freeze({
                  height: 1,
                  left: null,
                  right: null,
                  value: 30
                }),
                value: 26
              }),
              value: 20
            })
          })

          result = insert(8, tree)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: false,
            root: {
              height: 4,
              left: {
                height: 3,
                left: {
                  height: 2,
                  left: {
                    height: 1,
                    left: null,
                    right: null,
                    value: 2
                  },
                  right: null,
                  value: 3
                },
                right: {
                  height: 2,
                  left: null,
                  right: {
                    height: 1,
                    left: null,
                    right: null,
                    value: 8
                  },
                  value: 7
                },
                value: 4
              },
              right: {
                height: 3,
                left: {
                  height: 1,
                  left: null,
                  right: null,
                  value: 11
                },
                right: {
                  height: 2,
                  left: {
                    height: 1,
                    left: null,
                    right: null,
                    value: 21
                  },
                  right: {
                    height: 1,
                    left: null,
                    right: null,
                    value: 30
                  },
                  value: 26
                },
                value: 20
              },
              value: 9
            }
          })
        })
      })
    })

    describe('when preventDuplicates is true', () => {
      describe('when tree has no root node', () => {
        let result, tree

        beforeEach(function () {
          tree = {
            comparator: defaultComparator,
            preventDuplicates: true,
            root: null
          }

          result = insert(1, tree)
        })

        it('does not return the original value', () => {
          expect(result).not.toBe(tree)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: true,
            root: {
              height: 1,
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
              height: 1,
              left: null,
              right: null,
              value: 2
            })
          })
        })

        describe("when value is less than root node's value", () => {
          let result

          beforeEach(() => {
            result = insert(1, tree)
          })

          it('does not return the original tree', () => {
            expect(result).not.toBe(tree)
          })

          it('it returns expected value', () => {
            expect(result).toEqual({
              comparator: defaultComparator,
              preventDuplicates: true,
              root: {
                height: 2,
                left: {
                  height: 1,
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
            result = insert(2, tree)
          })

          it('returns the original tree', () => {
            expect(result).toBe(tree)
          })
        })

        describe("when value is greater than root node's value", () => {
          let result

          beforeEach(() => {
            result = insert(3, tree)
          })

          it('does not return the original tree', () => {
            expect(result).not.toBe(tree)
          })

          it('it returns expected value', () => {
            expect(result).toEqual({
              comparator: defaultComparator,
              preventDuplicates: true,
              root: {
                height: 2,
                left: null,
                right: {
                  height: 1,
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
              height: 2,
              left: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 2
              }),
              right: Object.freeze({
                height: 1,
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
              result = insert(1, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: true,
                root: {
                  height: 3,
                  left: {
                    height: 2,
                    left: {
                      height: 1,
                      left: null,
                      right: null,
                      value: 1
                    },
                    right: null,
                    value: 2
                  },
                  right: {
                    height: 1,
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
              result = insert(2, tree)
            })

            it('returns the original tree', () => {
              expect(result).toBe(tree)
            })
          })

          describe("when the value is greater than the left child node's value", () => {
            let result

            beforeEach(() => {
              result = insert(3, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: true,
                root: {
                  height: 3,
                  left: {
                    height: 2,
                    left: null,
                    right: {
                      height: 1,
                      left: null,
                      right: null,
                      value: 3
                    },
                    value: 2
                  },
                  right: {
                    height: 1,
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
            result = insert(4, tree)
          })

          it('returns the original tree', () => {
            expect(result).toBe(tree)
          })
        })

        describe("when value is greather than the root node's value", () => {
          describe("when the value is less than the right child node's value", () => {
            let result

            beforeEach(() => {
              result = insert(5, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: true,
                root: {
                  height: 3,
                  left: {
                    height: 1,
                    left: null,
                    right: null,
                    value: 2
                  },
                  right: {
                    height: 2,
                    left: {
                      height: 1,
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
              result = insert(6, tree)
            })

            it('returns the original tree', () => {
              expect(result).toBe(tree)
            })
          })

          describe("when the value is greater than the right child node's value", () => {
            let result

            beforeEach(() => {
              result = insert(7, tree)
            })

            it('does not return the original tree', () => {
              expect(result).not.toBe(tree)
            })

            it('it returns expected value', () => {
              expect(result).toEqual({
                comparator: defaultComparator,
                preventDuplicates: true,
                root: {
                  height: 3,
                  left: {
                    height: 1,
                    left: null,
                    right: null,
                    value: 2
                  },
                  right: {
                    height: 2,
                    left: null,
                    right: {
                      height: 1,
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

      describe('when left rotation is needed to keep tree balanced', () => {
        let result, tree

        beforeEach(() => {
          tree = Object.freeze({
            comparator: defaultComparator,
            preventDuplicates: true,
            root: Object.freeze({
              height: 3,
              left: null,
              right: Object.freeze({
                height: 2,
                left: null,
                right: Object.freeze({
                  height: 1,
                  left: null,
                  right: null,
                  value: 3
                }),
                value: 2
              }),
              value: 1
            })
          })

          result = insert(4, tree)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: true,
            root: {
              height: 3,
              left: {
                height: 2,
                left: null,
                right: {
                  height: 1,
                  left: null,
                  right: null,
                  value: 2
                },
                value: 1
              },
              right: {
                height: 1,
                left: null,
                right: null,
                value: 4
              },
              value: 3
            }
          })
        })
      })

      describe('when left-right rotation is needed to keep balanced', () => {
        let result, tree

        beforeEach(() => {
          tree = Object.freeze({
            comparator: defaultComparator,
            preventDuplicates: true,
            root: Object.freeze({
              height: 2,
              left: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 1
              }),
              right: null,
              value: 3
            })
          })

          result = insert(2, tree)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: true,
            root: {
              height: 2,
              left: {
                height: 1,
                left: null,
                right: null,
                value: 1
              },
              right: {
                height: 1,
                left: null,
                right: null,
                value: 3
              },
              value: 2
            }
          })
        })
      })

      describe('when right-left rotation is needed to keep balanced', () => {
        let result, tree

        beforeEach(() => {
          tree = Object.freeze({
            comparator: defaultComparator,
            preventDuplicates: true,
            root: Object.freeze({
              height: 2,
              left: null,
              right: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 3
              }),
              value: 1
            })
          })

          result = insert(2, tree)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            comparator: defaultComparator,
            preventDuplicates: true,
            root: {
              height: 2,
              left: {
                height: 1,
                left: null,
                right: null,
                value: 1
              },
              right: {
                height: 1,
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
  })

  describe('left()', () => {
    it('returns null when null passed in', () => {
      expect(left(null)).toEqual(null)
    })

    describe('when no left child node', () => {
      describe('when no right child node', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 1,
            left: null,
            right: null,
            value: 1
          })

          result = left(parentNode)
        })

        it('returns passed in node', () => {
          expect(result).toBe(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 1,
            left: null,
            right: null,
            value: 1
          })
        })
      })

      describe('when right child node with no children', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 2,
            left: null,
            right: Object.freeze({
              height: 1,
              left: null,
              right: null,
              value: 2
            }),
            value: 1
          })

          result = left(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 2,
            left: {
              height: 1,
              left: null,
              right: null,
              value: 1
            },
            right: null,
            value: 2
          })
        })
      })

      describe('when right child node with left child', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 3,
            left: null,
            right: Object.freeze({
              height: 2,
              left: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 2
              }),
              right: null,
              value: 3
            }),
            value: 1
          })

          result = left(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 3,
            left: {
              height: 2,
              left: null,
              right: {
                height: 1,
                left: null,
                right: null,
                value: 2
              },
              value: 1
            },
            right: null,
            value: 3
          })
        })
      })

      describe('when right child node with right child', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 3,
            left: null,
            right: Object.freeze({
              height: 2,
              left: null,
              right: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 3
              }),
              value: 2
            }),
            value: 1
          })

          result = left(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 2,
            left: {
              height: 1,
              left: null,
              right: null,
              value: 1
            },
            right: {
              height: 1,
              left: null,
              right: null,
              value: 3
            },
            value: 2
          })
        })
      })

      describe('when right child node with left and right child', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 3,
            left: null,
            right: Object.freeze({
              height: 2,
              left: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 2
              }),
              right: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 4
              }),
              value: 3
            }),
            value: 1
          })

          result = left(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 3,
            left: {
              height: 2,
              left: null,
              right: {
                height: 1,
                left: null,
                right: null,
                value: 2
              },
              value: 1
            },
            right: {
              height: 1,
              left: null,
              right: null,
              value: 4
            },
            value: 3
          })
        })
      })
    })

    describe('when left child node', () => {
      describe('when no right child', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 2,
            left: Object.freeze({
              height: 1,
              left: null,
              right: null,
              value: 0
            }),
            right: null,
            value: 1
          })

          result = left(parentNode)
        })

        it('returns passed in node', () => {
          expect(result).toBe(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 2,
            left: {
              height: 1,
              left: null,
              right: null,
              value: 0
            },
            right: null,
            value: 1
          })
        })
      })

      describe('when right child node with no children', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 2,
            left: Object.freeze({
              height: 1,
              left: null,
              right: null,
              value: 0
            }),
            right: Object.freeze({
              height: 1,
              left: null,
              right: null,
              value: 2
            }),
            value: 1
          })

          result = left(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 3,
            left: {
              height: 2,
              left: {
                height: 1,
                left: null,
                right: null,
                value: 0
              },
              right: null,
              value: 1
            },
            right: null,
            value: 2
          })
        })
      })

      describe('when right child node with left child', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 3,
            left: Object.freeze({
              height: 1,
              left: null,
              right: null,
              value: 0
            }),
            right: Object.freeze({
              height: 2,
              left: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 2
              }),
              right: null,
              value: 3
            }),
            value: 1
          })

          result = left(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 3,
            left: {
              height: 2,
              left: {
                height: 1,
                left: null,
                right: null,
                value: 0
              },
              right: {
                height: 1,
                left: null,
                right: null,
                value: 2
              },
              value: 1
            },
            right: null,
            value: 3
          })
        })
      })

      describe('when right child node with right child', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 3,
            left: Object.freeze({
              height: 1,
              left: null,
              right: null,
              value: 0
            }),
            right: Object.freeze({
              height: 2,
              left: null,
              right: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 3
              }),
              value: 2
            }),
            value: 1
          })

          result = left(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 3,
            left: {
              height: 2,
              left: {
                height: 1,
                left: null,
                right: null,
                value: 0
              },
              right: null,
              value: 1
            },
            right: {
              height: 1,
              left: null,
              right: null,
              value: 3
            },
            value: 2
          })
        })
      })

      describe('when right child node with left and right child', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 3,
            left: Object.freeze({
              height: 1,
              left: null,
              right: null,
              value: 0
            }),
            right: Object.freeze({
              height: 2,
              left: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 2
              }),
              right: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 4
              }),
              value: 3
            }),
            value: 1
          })

          result = left(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 3,
            left: {
              height: 2,
              left: {
                height: 1,
                left: null,
                right: null,
                value: 0
              },
              right: {
                height: 1,
                left: null,
                right: null,
                value: 2
              },
              value: 1
            },
            right: {
              height: 1,
              left: null,
              right: null,
              value: 4
            },
            value: 3
          })
        })
      })
    })
  })

  describe('right()', () => {
    it('returns null when null passed in', () => {
      expect(right(null)).toEqual(null)
    })

    describe('when no right child node', () => {
      describe('when no left child node', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 1,
            left: null,
            right: null,
            value: 1
          })

          result = right(parentNode)
        })

        it('returns passed in node', () => {
          expect(result).toBe(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 1,
            left: null,
            right: null,
            value: 1
          })
        })
      })

      describe('when left child node with no children', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 2,
            left: Object.freeze({
              height: 1,
              left: null,
              right: null,
              value: 1
            }),
            right: null,
            value: 2
          })

          result = right(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 2,
            left: null,
            right: {
              height: 1,
              left: null,
              right: null,
              value: 2
            },
            value: 1
          })
        })
      })

      describe('when left child node with left child', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 3,
            left: Object.freeze({
              height: 2,
              left: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 0
              }),
              right: null,
              value: 1
            }),
            right: null,
            value: 2
          })

          result = right(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 2,
            left: {
              height: 1,
              left: null,
              right: null,
              value: 0
            },
            right: {
              height: 1,
              left: null,
              right: null,
              value: 2
            },
            value: 1
          })
        })
      })

      describe('when left child node with right child', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 3,
            left: Object.freeze({
              height: 2,
              left: null,
              right: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 1
              }),
              value: 0
            }),
            right: null,
            value: 2
          })

          result = right(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 3,
            left: null,
            right: {
              height: 2,
              left: {
                height: 1,
                left: null,
                right: null,
                value: 1
              },
              right: null,
              value: 2
            },
            value: 0
          })
        })
      })

      describe('when left child node with left and right child', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 3,
            left: Object.freeze({
              height: 2,
              left: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 0
              }),
              right: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 2
              }),
              value: 1
            }),
            right: null,
            value: 3
          })

          result = right(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 3,
            left: {
              height: 1,
              left: null,
              right: null,
              value: 0
            },
            right: {
              height: 2,
              left: {
                height: 1,
                left: null,
                right: null,
                value: 2
              },
              right: null,
              value: 3
            },
            value: 1
          })
        })
      })
    })

    describe('when right child node', () => {
      describe('when no left child', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 2,
            left: null,
            right: Object.freeze({
              height: 1,
              left: null,
              right: null,
              value: 3
            }),
            value: 2
          })

          result = right(parentNode)
        })

        it('returns passed in node', () => {
          expect(result).toBe(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 2,
            left: null,
            right: {
              height: 1,
              left: null,
              right: null,
              value: 3
            },
            value: 2
          })
        })
      })

      describe('when left child node with no children', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 2,
            left: Object.freeze({
              height: 1,
              left: null,
              right: null,
              value: 1
            }),
            right: Object.freeze({
              height: 1,
              left: null,
              right: null,
              value: 3
            }),
            value: 2
          })

          result = right(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 3,
            left: null,
            right: {
              height: 2,
              left: null,
              right: {
                height: 1,
                left: null,
                right: null,
                value: 3
              },
              value: 2
            },
            value: 1
          })
        })
      })

      describe('when left child node with left child', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 3,
            left: Object.freeze({
              height: 2,
              left: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 0
              }),
              right: null,
              value: 1
            }),
            right: Object.freeze({
              height: 1,
              left: null,
              right: null,
              value: 3
            }),
            value: 2
          })

          result = right(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 3,
            left: {
              height: 1,
              left: null,
              right: null,
              value: 0
            },
            right: {
              height: 2,
              left: null,
              right: {
                height: 1,
                left: null,
                right: null,
                value: 3
              },
              value: 2
            },
            value: 1
          })
        })
      })

      describe('when left child node with right child', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 3,
            left: Object.freeze({
              height: 2,
              left: null,
              right: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 1
              }),
              value: 0
            }),
            right: Object.freeze({
              height: 1,
              left: null,
              right: null,
              value: 3
            }),
            value: 2
          })

          result = right(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 3,
            left: null,
            right: {
              height: 2,
              left: {
                height: 1,
                left: null,
                right: null,
                value: 1
              },
              right: {
                height: 1,
                left: null,
                right: null,
                value: 3
              },
              value: 2
            },
            value: 0
          })
        })
      })

      describe('when left child node with left and right child', () => {
        let parentNode, result

        beforeEach(() => {
          parentNode = Object.freeze({
            height: 3,
            left: Object.freeze({
              height: 2,
              left: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 0
              }),
              right: Object.freeze({
                height: 1,
                left: null,
                right: null,
                value: 2
              }),
              value: 1
            }),
            right: Object.freeze({
              height: 1,
              left: null,
              right: null,
              value: 4
            }),
            value: 3
          })

          result = right(parentNode)
        })

        it('returns expected value', () => {
          expect(result).toEqual({
            height: 3,
            left: {
              height: 1,
              left: null,
              right: null,
              value: 0
            },
            right: {
              height: 2,
              left: {
                height: 1,
                left: null,
                right: null,
                value: 2
              },
              right: {
                height: 1,
                left: null,
                right: null,
                value: 4
              },
              value: 3
            },
            value: 1
          })
        })
      })
    })
  })

  describe('search()', () => {
    describe('when tree has no root node', () => {
      let result, tree

      beforeEach(() => {
        tree = Object.freeze({
          comparator: defaultComparator,
          preventDuplicates: false,
          root: null
        })

        result = search(1, tree)
      })

      it('returns null', () => {
        expect(result).toBe(null)
      })
    })

    describe('when tree has root node with no child nodes', () => {
      let result, tree

      beforeEach(() => {
        tree = Object.freeze({
          comparator: defaultComparator,
          preventDuplicates: false,
          root: Object.freeze({
            left: null,
            right: null,
            value: 2
          })
        })
      })

      it('returns null when value is not root node value', () => {
        expect(search(1, tree)).toBe(null)
      })

      it('returns value when value is root node value', () => {
        expect(search(2, tree)).toBe(2)
      })
    })

    describe('when tree has root node with child nodes', () => {
      let result, tree

      beforeEach(() => {
        tree = Object.freeze({
          comparator: defaultComparator,
          preventDuplicates: false,
          root: Object.freeze({
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
          })
        })
      })

      it('returns null when value is not in tree', () => {
        expect(search(4, tree)).toBe(null)
      })

      it('returns value when value is in left child node', () => {
        expect(search(1, tree)).toBe(1)
      })

      it('returns value when value is in right child node', () => {
        expect(search(3, tree)).toBe(3)
      })
    })
  })
})
