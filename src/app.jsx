// @flow

import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'connected-react-router'

import { configureStore, history } from './redux'

import Pages from './pages'

const store = configureStore()

const App = (): React.Node => (
  <Provider store={store}>
    <Router history={history}>
      <Pages />
    </Router>
  </Provider>
)

export default App
