'use strict'

import assert from 'power-assert'
import {dom} from '../../lib/virtual'
import {createTree} from '../../lib/virtual/tree'


describe('VirtualTree', () => {
  it('parse a single node', () => {
    let node = dom()
    let tree = createTree(node)
    assert(tree.getNode('0') === node)
  })

  it('parse a node with one level of children', () => {
    let node = dom('div', null, [dom('span'), dom('hr'), 'Hello World'])
    let tree = createTree(node)
    assert(tree.getNode('0') === node)
    assert(tree.getNode('0.0') === node.children[0])
    assert(tree.getNode('0.1') === node.children[1])
    assert(tree.getNode('0.2') === node.children[2])
  })

  it('parse nodes with keys', () => {
    let node = dom('div', null, [
      dom('span', { key: 'foo' }, [
        dom()
      ])
    ])
    let tree = createTree(node)
    assert(tree.getNode('0.foo.0') === node.children[0].children[0])
  })

  it('parse a node with two levels of children', () => {
    let node = dom('div', null, [
      dom('span'),
      dom('div', null, [
        dom(),
        'Second'
      ]),
      'Hello World'
    ])
    let tree = createTree(node)
    assert(tree.getNode('0') === node)
    assert(tree.getNode('0.0') === node.children[0])
    assert(tree.getNode('0.1') === node.children[1])
    assert(tree.getNode('0.1.0') === node.children[1].children[0])
    assert(tree.getNode('0.1.1') === node.children[1].children[1])
    assert(tree.getNode('0.2') === node.children[2])
  });

  it('should get nodes using a string path', () => {
    let child = dom()
    let node = dom('div', null, [
      dom(),
      dom('div', null, [child])
    ])
    let tree = createTree(node)
    assert(tree.getNode('0.1.0') === child)
  });

  it('should store the components within the tree', () => {
    function Component() {}
    let node = dom('div', null, [
      dom('span'),
      dom(Component)
    ])
    let tree = createTree(node)
    assert('0.1' in tree.components)
    assert(tree.components['0.1'].type === 'component')
    assert(Object.keys(tree.components).length === 1)
  });
})
