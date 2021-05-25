// @flow

import * as React from 'react'
import { mount } from 'enzyme'

import App from '../app'

describe('<App />', () => {
  it('should be defined', () => {
    const component = mount(<App />)

    expect(component).toBeDefined()
  })
})
