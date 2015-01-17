'use strict'

export function createTree (node) {
  return new Tree(node)
}

class Tree {
  constructor (node) {
    this.root = node
    this.paths = {}
    this.nodes = {}
    this.components = {}
    this.parse(node)
  }
  
  getPath (node) {
    return this.paths[node.id]
  }

  getNode (path) {
    return this.nodes[path]
  }

  parse (node, path = '0') {
    this.paths[node.id] = path
    this.nodes[path] = node

    if (node.type === 'component') {
      this.components[path] = node
    }

    if (node.children) {
      node.children.forEach((node, index) => {
        let key = node.key || index
        this.parse(node, `${path}.${key}`)
      })
    }
  }
}
