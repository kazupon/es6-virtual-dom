'use strict'

export function createTextNode (text) {
  return new TextNode(text)
}

class TextNode {
  constructor (text) {
    this.type = 'text'
    this.data = String(text)
  }
}
