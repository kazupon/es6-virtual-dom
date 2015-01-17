'use strict'

import {createComponentNode} from './component'
import {createElementNode} from './element'
import {createTextNode} from './text'


// ID counter
let i = 0


export function dom (type, props, children) {
  if (arguments.length === 2 && (typeof(props) === 'string' || Array.isArray(props))) {
    children = props
    props = {}
  }

  children = children || []
  props = props || {}

  if (!Array.isArray(children)) {
    children = [children]
  }

  children = children.map(normalize)

  let key = props.key
  delete props.key

  let node;
  if (typeof(type) === 'function') {
    node = createComponentNode(type, props, key, children)
  } else {
    node = createElementNode(type, props, key, children)
  }

  node.id = (i++).toString(32)

  return node
}

function normalize (node, index) {
  if (typeof(node) === 'string' || typeof(node) === 'number') {
    node = createTextNode(String(node))
  }

  if (Array.isArray(node)) {
    throw new Error('Child node cant be an array. This can happen if you try to use props.children like a node.')
  }

  node.index = index

  return node
}
