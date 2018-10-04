import { reset } from 'redux-form'
import { call, put, takeEvery } from 'redux-saga/effects'
import { generateId } from '../../utils'
import {
  ADD_PERSON_ACCOUNT_START,
  ADD_PERSON_ACCOUNT_SUCCESS,
  DELETE_PERSON_ACCOUNT_START,
  DELETE_PERSON_ACCOUNT_SUCCESS
} from '../constants'

export function* addPersonSaga(action) {
  const id = yield call(generateId)

  yield put({
    type: ADD_PERSON_ACCOUNT_SUCCESS,
    payload: {
      person: { id, ...action.payload.person }
    }
  })

  yield put(reset('formPopup'))
}

export function* deletePersonSaga({ payload: id }) {
  yield put({
    type: DELETE_PERSON_ACCOUNT_SUCCESS,
    payload: { id }
  })
}

export function* saga() {
  yield takeEvery(ADD_PERSON_ACCOUNT_START, addPersonSaga)
  yield takeEvery(DELETE_PERSON_ACCOUNT_START, deletePersonSaga)
}
