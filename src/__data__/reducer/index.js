import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import counter from './counter'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    counter,
  })

export default createRootReducer
