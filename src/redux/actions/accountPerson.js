import {
  ADD_PERSON_ACCOUNT_START,
  DELETE_PERSON_ACCOUNT_START
} from '../constants'

export function addAccountPerson(person) {
  return {
    type: ADD_PERSON_ACCOUNT_START,
    payload: { person }
  }
}

export function deleteAccountPerson(id) {
  console.log('action', id)
  return {
    type: DELETE_PERSON_ACCOUNT_START,
    payload: id
  }
}
