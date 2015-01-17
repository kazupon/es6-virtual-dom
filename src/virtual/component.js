'use strict'

export function createComponentNode (component, props, key, children = []) {
  return new ComponentNode(component, props, key, children)
}

class ComponentNode {
  constructor (component, props, key, children) {
    this.key = key
    this.props = props
    this.type = 'component'
    this.component = component
    this.props.children = children
  }
}
