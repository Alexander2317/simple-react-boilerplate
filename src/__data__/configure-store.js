import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware from 'redux-saga'

import { base } from './constants'
import createRootReducer from './reducer'
import rootSaga from './sagas'
import history from './history'

const composeEnhancers = composeWithDevTools({
  name: base.NAME_APPLICATION,
})

const configureStore = (preloadedState = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
    ),
  )

  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
