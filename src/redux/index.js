import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import history from '../history'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history),
  logger
)

const store = createStore(reducer, enhancer)

sagaMiddleware.run(rootSaga)

//dev only
window.store = store

export default store
