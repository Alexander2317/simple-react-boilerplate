import { all } from 'redux-saga/effects'

import { saga as counter } from './counter'

function* rootSaga() {
  yield all([counter()])
}

export default rootSaga
