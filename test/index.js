'use strict'

import assert from 'power-assert'
import {foo} from '../lib/index'

describe('Foo', () => {
  context('1 + 1', () => {
    it('should be 2', () => {
      assert(foo(1, 1) === 2)
    })
  })
})
