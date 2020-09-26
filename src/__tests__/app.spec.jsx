// @flow

import * as React from 'react'
import { shallow } from 'enzyme'

import App from '../app'

describe('<App />', () => {
  it('should be defined', () => {
    const component = shallow(<App />)

    expect(component).toBeDefined()
  })
})
