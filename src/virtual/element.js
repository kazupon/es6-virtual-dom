'use strict'

import type from 'component-type'


let events = {
  onBlur: 'blur',
  onChange: 'change',
  onClick: 'click',
  onContextMenu: 'contextmenu',
  onCopy: 'copy',
  onCut: 'cut',
  onDoubleClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragEnter: 'dragenter',
  onDragExit: 'dragexit',
  onDragLeave: 'dragleave',
  onDragOver: 'dragover',
  onDragStart: 'dragstart',
  onDrop: 'drop',
  onFocus: 'focus',
  onInput: 'input',
  onKeyDown: 'keydown',
  onKeyUp: 'keyup',
  onMouseDown: 'mousedown',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onPaste: 'paste',
  onScroll: 'scroll',
  onSubmit: 'submit',
  onTouchCancel: 'touchcancel',
  onTouchEnd: 'touchend',
  onTouchMove: 'touchmove',
  onTouchStart: 'touchstart'
}


export function createElementNode (tagName, attributes, key, children = []) {
  return new ElementNode(tagName, attributes, key, children)
}

class ElementNode {
  constructor (tagName, attributes, key, children) {
    this.type = 'element'
    this.attributes = parseAttributes(attributes)
    this.events = parseEvents(attributes)
    this.tagName = parseTag(tagName, attributes)
    this.children = children
    this.key = key
  }
}


function parseAttributes (attributes) {
  if (attributes.style) {
    attributes.style = parseStyle(attributes.style)
  }

  if (attributes.data) {
    attributes = parseData(attributes)
  }

  if (attributes.class) {
    attributes.class = parseClass(attributes.class)
  }

  for (let name in attributes) {
    if (attributes[name] === false) {
      delete attributes[name]
    }
  }

  return attributes
}

function parseStyle (styles) {
  if (type(styles) !== 'object') {
    return styles
  }

  let str = ''
  for (let name in styles) {
    let value = styles[name]
    str += `${name}:${value};`
  }

  return str
}

function parseData (attributes) {
  if (type(attributes.data) !== 'object') {
    return attributes
  }

  for (let name in attributes.data) {
    attributes[`data-${name}`] = attributes.data[name]
  }

  delete attributes.data
  return attributes
}

function parseClass (value) {
  if (type(value) === 'object') {
    let matched = []
    for (let key in value) {
      if (value[key]) matched.push(key)
    }
    value = matched
  }

  if (type(value) === 'array') {
    if (value.length === 0) { return }
    value = value.join(' ')
  }
  
  return value
}

function parseEvents (attributes) {
  let ret = {}

  for (let name in events) {
    let type = events[name]
    let cb = attributes[name]
    if (cb) {
      ret[type] = cb
      delete attributes[name]
    }
  }

  return ret
}

function parseTag (name, attributes) {
  if (!name) { return 'div' }

  let parts = name.split(/([\.#]?[a-zA-Z0-9_:-]+)/)
  let tagName = 'div'

  parts
    .filter(Boolean)
    .forEach((part, i) => {
      let type = part.charAt(0)
      if (type === '.') {
        let first = attributes.class || ''
        let next = part.substring(1, part.length)
        attributes.class = `${first} ${next}`.trim()
      } else if (type === '#') {
        attributes.id = part.substring(1, part.length)
      } else {
        tagName = part
      }
    })

  return tagName
}
