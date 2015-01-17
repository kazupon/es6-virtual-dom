'use strict'

import assert from 'power-assert'
import {dom} from '../../lib/virtual'


describe('VirtualNode', () => {
  it('should create divs by default', () => {
    assert(dom().tagName === 'div')
  })

  it('should create unique ids', () => {
    let one = dom()
    let two = dom()
    assert(one.id !== two.id)
  })

  it('should set the tagName', () => {
    assert(dom('span').tagName === 'span')
  })

  it('should set attribtes', () => {
    let node = dom('div', { name: 'Foo' })
    assert(node.attributes.name === 'Foo')
  })

  it('should set class from a string', () => {
    let node = dom('div', { class: ['foo', 'bar', 'baz'] })
    assert(node.attributes.class === 'foo bar baz')
  })

  it('should not render class from an empty array', () => {
    let node = dom('div', { class: [] })
    assert(node.attributes.class === undefined)
  })

  it('should set class from an object', () => {
    let names = { foo: true, bar: false, baz: true }
    let node = dom('div', { class: names })
    assert(node.attributes.class === 'foo baz')
  })
  
  it('should set the style attribute with an object', () => {
    let styles = {
      'text-align': 'left',
      'height': '10px',
      'width': '10px'
    }
    let node = dom('div', { style: styles })
    assert(node.attributes.style === 'text-align:left;height:10px;width:10px;')
  })

  it('should render styles from a string', () => {
    let node = dom('div', { style: 'text-align:left;height:10px;width:10px;' })
    assert(node.attributes.style === 'text-align:left;height:10px;width:10px;')
  })

  it('should set data attributes with a dataset object', () => {
    let data = { content: 'lorem ipsum', foo: true }
    let node = dom('div', { data: data })
    assert(node.attributes['data-content'] === 'lorem ipsum')
    assert(node.attributes['data-foo'] === true)
  })

  it('should throw a helpful error if you try to use an array as a node', (done) => {
    try {
      let node = dom('div', null, [[dom('span')]])
    } catch (e) {
      assert(e.message === 'Child node cant be an array. This can happen if you try to use props.children like a node.')
      done()
    }
  })

  it('should store events', () => {
    let node = dom('div', { onClick: click })
    function click () {}
    assert(node.events['click'] === click)
  })

  it('should allow skipping attributes and using an array of children', () => {
    let node = dom('div', ['foo'])
    assert(node.children[0].data === 'foo')
  });

  it('should allow skipping attributes and using a single child', () => {
    let node = dom('div', 'foo')
    assert(node.children[0].data === 'foo')
  });


  context('extracting class/id', () => {
    it('should set the tag using classes', () => {
      let node = dom('div.foo')
      assert(node.attributes['class'] === 'foo')
    })

    it('should add classes together', () => {
      let node = dom('div.foo', { class: 'bar' })
      assert(node.attributes['class'] === 'bar foo', node.attributes.class)
    })

    it('should set the id', () => {
      let node = dom('div#foo', { class: 'bar' })
      assert(node.attributes.id === 'foo')
      assert(node.attributes.class === 'bar')
    })

    it('should set the id and the class', () => {
      let node = dom('div#foo.baz', { class: 'bar' })
      assert(node.attributes.id === 'foo')
      assert(node.attributes.class === 'bar baz')
    })

    it('should set the id and the class without the tag', () => {
      let node = dom('#foo.baz', { class: 'bar' })
      assert(node.tagName === 'div')
      assert(node.attributes.id === 'foo')
      assert(node.attributes.class === 'bar baz')
    })

    it('should set the id and the class with the tag', () => {
      let node = dom('span#foo.baz', { class: 'bar' })
      assert(node.tagName === 'span')
      assert(node.attributes.id === 'foo')
      assert(node.attributes.class === 'bar baz')
    })

    it('should set multiple classes', () => {
      let node = dom('span.foo.baz', { class: 'bar' })
      assert(node.tagName === 'span')
      assert(node.attributes.class === 'bar foo baz')
    })
  })
})
