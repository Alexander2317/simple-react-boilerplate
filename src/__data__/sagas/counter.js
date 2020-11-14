import { put, all, select, takeEvery } from 'redux-saga/effects'

import { actionTypes } from '../constants'
import { counter } from '../selectors'

function* updateCounter() {
  const count = yield select(counter.getCount)
  yield put({
    type: actionTypes.COUNTER_UPDATE,
    payload: { count: count + 1 },
  })
}

export function* saga() {
  yield all([takeEvery(actionTypes.COUNTER_CLICK, updateCounter)])
}
