import { all } from 'redux-saga/effects'
import { saga as accountPerson } from './accountPerson'

export default function*() {
  yield all([accountPerson()])
}
