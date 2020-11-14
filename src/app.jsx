// @flow

import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'connected-react-router'

import { configureStore, history } from './__data__'

import Pages from './pages'

const store = configureStore()

const App = (): React.Node => (
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Pages />
      </Router>
    </Provider>
  </React.StrictMode>
)

export default App
